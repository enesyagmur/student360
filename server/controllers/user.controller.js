const admin = require("../config/firebase-admin");

exports.deleteManager = async (req, res) => {
  try {
    console.log("Yönetici silme isteği başladı");
    const { managerId } = req.params;

    if (!managerId) {
      return res.status(400).json({
        error: "Eksik bilgi",
        details: "Yönetici ID'si gereklidir",
      });
    }

    // Silinecek yöneticinin varlığını kontrol et
    const managerDoc = await admin
      .firestore()
      .collection("managers")
      .doc(managerId)
      .get();

    if (!managerDoc.exists) {
      return res.status(404).json({
        error: "Yönetici bulunamadı",
        details: "Belirtilen ID ile yönetici bulunamadı",
      });
    }

    // Önce Firestore'dan kullanıcıyı sil
    await admin.firestore().collection("managers").doc(managerId).delete();

    // Sonra Firebase Auth'dan kullanıcıyı sil
    await admin.auth().deleteUser(managerId);

    console.log("Yönetici başarıyla silindi:", managerId);
    return res.status(200).json({
      success: true,
      message: "Yönetici başarıyla silindi",
    });
  } catch (err) {
    console.error("Yönetici silme hatası:", err);
    return res.status(400).json({
      error: "İşlem başarısız",
      details: err.message || "Beklenmeyen bir hata oluştu",
    });
  }
};
