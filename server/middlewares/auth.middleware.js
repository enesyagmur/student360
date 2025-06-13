const admin = require("../config/firebase-admin");

exports.requirePrincipal = async (req, res, next) => {
  try {
    console.log("Yetkilendirme kontrolü başlıyor...");
    console.log("Kullanıcı ID:", req.user.uid);

    //istek atan kişinin pozisyonu için verisini çekiyoruz
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

    //müdür değilse hata
    if (requester.data().position !== "principal") {
      console.log(
        "Yetki hatası: Kullanıcı pozisyonu:",
        requester.data().position
      );
      throw new Error("Yetki Hatası");
    }

    console.log("Yetkilendirme başarılı");
    next();
  } catch (err) {
    console.error("Yetkilendirme hatası:", err.message);
    res.status(403).json({ error: "Erişim Engellendi" });
  }
};
