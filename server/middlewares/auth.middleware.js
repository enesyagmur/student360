const admin = require("../config/firebase-admin");

exports.requirePrincipal = async (req, res, next) => {
  try {
    //istek atan kişinin pozisyonu için verisini çekiyoruz
    const requester = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .get();

    if (!requester.exists) {
      console.log("Kullanıcı bulunamadı");
      throw new Error("Kullanıcı bulunamadı");
    }

    //müdür değilse hata
    if (requester.data().position !== "principal") {
      console.log(
        "Yetki hatası: Kullanıcı pozisyonu:",
        requester.data().position
      );
      throw new Error("Yetki Hatası");
    }

    next();
  } catch (err) {
    console.error("Yetkilendirme hatası:", err.message);
    res.status(403).json({ error: "Erişim Engellendi" });
  }
};

exports.requireRoleBasedAccess = async (req, res, next) => {
  try {
    console.log("Role bazlı yetkilendirme kontrolü başlıyor...");
    console.log("Kullanıcı ID:", req.user.uid);

    const requester = await admin
      .firestore()
      .collection("users")
      .doc(req.user.uid)
      .get();

    console.log("Kullanıcı verisi:", requester.data());

    if (!requester.exists) {
      console.log("Kullanıcı bulunamadı");
      throw new Error("Kullanıcı bulunamadı");
    }

    const requesterRole = requester.data().role;
    const requestedRole = req.params.role;

    // Erişim kontrolü
    switch (requesterRole) {
      case "manager":
        // Yöneticiler tüm rolleri görebilir
        next();
        break;

      case "teacher":
        // Öğretmenler sadece öğrencileri görebilir
        if (requestedRole !== "student") {
          console.log("Yetki hatası: Öğretmenler sadece öğrencileri görebilir");
          throw new Error("Yetki Hatası");
        }
        next();
        break;

      case "student":
        // Öğrenciler hiçbir kullanıcıyı göremez
        console.log("Yetki hatası: Öğrenciler kullanıcı listesine erişemez");
        throw new Error("Yetki Hatası");

      default:
        console.log("Yetki hatası: Geçersiz kullanıcı rolü");
        throw new Error("Yetki Hatası");
    }
  } catch (err) {
    console.error("Yetkilendirme hatası:", err.message);
    res.status(403).json({
      error: "Erişim Engellendi",
      details: err.message,
    });
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Yetkilendirme başarısız",
        details: "Token bulunamadı",
      });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Token doğrulama hatası:", err);
    return res
      .status(401)
      .json({ error: "Yetkilendirme başarısız", details: err.message });
  }
};
