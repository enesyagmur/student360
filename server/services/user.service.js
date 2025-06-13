const admin = require("../config/firebase-admin");

exports.createUserInFirestore = async ({
  fullName,
  email,
  phone,
  role,
  position,
  tc,
}) => {
  try {
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

    // Firebase Auth da kullanıcı oluştur
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
      emailVerified: false,
    });

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

    await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set(userData);

    return {
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu",
      user: userData,
    };
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error);
    throw new Error(error.message || "Kullanıcı oluşturulamadı");
  }
};

exports.deleteManager = async (managerId) => {
  try {
    // önce firestore dan yöneticiyi sil
    await admin.firestore().collection("users").doc(managerId).delete();

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
