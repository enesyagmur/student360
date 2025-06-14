const admin = require("../config/firebase-admin");
const { sendWelcomeEmail } = require("./email.service");

exports.createUserInFirestore = async ({
  fullName,
  email,
  phone,
  role,
  position,
  tc,
}) => {
  try {
    console.log("Kullanıcı oluşturma başladı"); // Debug log

    const generatePassword = () => {
      const length = 12;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    };

    const password = generatePassword();
    console.log("Şifre oluşturuldu:", password); // Debug log

    // Firebase Auth da kullanıcı oluştur
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
      emailVerified: false,
    });

    console.log("Firebase Auth'da kullanıcı oluşturuldu"); // Debug log

    // Firestore a kullanıcı bilgilerini kaydet
    const userData = {
      id: userRecord.uid,
      fullName,
      email,
      phone,
      role,
      position,
      tc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };

    if (role === "manager") {
      await admin
        .firestore()
        .collection("managers")
        .doc(userRecord.uid)
        .set(userData);
    } else if (role === "teacher") {
      await admin
        .firestore()
        .collection("teachers")
        .doc(userRecord.uid)
        .set(userData);
    } else if (role === "student") {
      await admin
        .firestore()
        .collection("students")
        .doc(userRecord.uid)
        .set(userData);
    }

    console.log("Firestore'a kullanıcı kaydedildi"); // Debug log

    // Email gönderme işlemi
    console.log("Email gönderme işlemi başlıyor..."); // Debug log
    try {
      await sendWelcomeEmail(email, password, fullName);
      console.log("Hoş geldiniz maili gönderildi");
    } catch (emailError) {
      console.error("Hoş geldiniz maili gönderilemedi:", emailError);
    }

    return {
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu",
      user: userData,
    };
  } catch (error) {
    console.error("BACKEND | Kullanıcı oluşturma hatası:", error);
    throw new Error(error.message || "Kullanıcı oluşturulamadı");
  }
};

exports.deleteManager = async (managerId) => {
  try {
    // önce firestore dan yöneticiyi sil
    await admin.firestore().collection("managers").doc(managerId).delete();

    // sonra firebase Auth'dan kullanıcıyı sil
    await admin.auth().deleteUser(managerId);

    return {
      success: true,
      message: "Yönetici başarıyla silindi",
    };
  } catch (error) {
    console.error("Yönetici silme hatası:", error);
    throw new Error(error.message || "Yönetici silinemedi");
  }
};
