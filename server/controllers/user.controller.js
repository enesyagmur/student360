const admin = require("../config/firebase-admin");
const { createUserInFirestore } = require("../services/user.service");

exports.createManager = async (req, res) => {
  try {
    console.log("Yönetici oluşturma isteği başladı");
    const { fullName, email, phone, position, tc, role } = req.body;
    const requesterId = req.user.uid;

    console.log("İstek yapan kullanıcı ID:", requesterId);

    const requester = await admin
      .firestore()
      .collection("users")
      .doc(requesterId)
      .get();

    console.log("İstek yapan kullanıcı verisi:", requester.data());

    if (!requester.exists) {
      console.log("Kullanıcı bulunamadı");
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    if (requester.data().position !== "principal") {
      console.log(
        "Yetki hatası: Kullanıcı pozisyonu:",
        requester.data().position
      );
      return res.status(403).json({ error: "Yetki Hatası" });
    }

    console.log("Yeni yönetici oluşturuluyor...");
    const newUser = await createUserInFirestore({
      fullName,
      email,
      phone,
      role,
      position,
      tc,
    });

    console.log("Yeni yönetici başarıyla oluşturuldu");
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Yönetici oluşturma hatası:", err.message);
    res.status(400).json({ error: err.message });
  }
};
