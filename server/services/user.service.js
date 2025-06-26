const admin = require("../config/firebase-admin");

// Sadece silme fonksiyonları kaldı

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
