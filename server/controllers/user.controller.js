const admin = require("../config/firebase-admin");
const { createUserInFirestore } = require("../services/user.service");

exports.createManager = async (req, res) => {
  try {
    const { fullName, email, phone, position, tc, role } = req.body;

    // Gerekli alanların kontrolü
    if (!fullName || !email || !phone || !position || !tc || !role) {
      return res.status(400).json({
        error: "Eksik bilgi",
        details: "Tüm alanların doldurulması zorunludur",
      });
    }

    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Geçersiz e-posta formatı",
      });
    }

    // E-posta adresi kullanımda mı kontrolü
    try {
      await admin.auth().getUserByEmail(email);
      return res.status(400).json({
        error: "E-posta adresi kullanımda",
        details: "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut",
      });
    } catch (error) {
      // E-posta bulunamadıysa devam et
    }

    const result = await createUserInFirestore({
      fullName,
      email,
      phone,
      role,
      position,
      tc,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error("Yönetici oluşturma hatası:", err);
    return res.status(400).json({
      error: "İşlem başarısız",
      details: err.message || "Beklenmeyen bir hata oluştu",
    });
  }
};

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

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    // firestore'dan kullanıcıları getir
    const usersSnapshot = await admin
      .firestore()
      .collection(role + "s")
      .get();

    console.log("Bulunan kullanıcı sayısı:", usersSnapshot.size);

    if (usersSnapshot.empty) {
      console.log("Bu role sahip kullanıcı bulunamadı:", role);
      return res.status(200).json({
        message: "Bu role sahip kullanıcı bulunamadı",
        users: [],
      });
    }

    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("Dönen kullanıcı sayısı:", users.length);

    return res.status(200).json({
      message: "Kullanıcılar başarıyla getirildi",
      users,
    });
  } catch (err) {
    console.error("Kullanıcıları getirme hatası:", err);
    return res.status(500).json({
      error: "İşlem başarısız",
      details: err.message || "Beklenmeyen bir hata oluştu",
    });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    console.log("Öğretmen oluşturma isteği başladı");
    const { fullName, email, phone, position, tc, role } = req.body;

    // Gerekli alanların kontrolü
    if (!fullName || !email || !phone || !position || !tc || !role) {
      return res.status(400).json({
        error: "Eksik bilgi",
        details: "Tüm alanların doldurulması zorunludur",
      });
    }

    // E-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Geçersiz e-posta formatı",
      });
    }

    // E-posta adresi kullanımda mı kontrolü
    try {
      await admin.auth().getUserByEmail(email);
      return res.status(400).json({
        error: "E-posta adresi kullanımda",
        details: "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut",
      });
    } catch (error) {
      // E-posta bulunamadıysa devam et
    }

    console.log("Yeni öğretmen oluşturuluyor...");
    const result = await createUserInFirestore({
      fullName,
      email,
      phone,
      role,
      position,
      tc,
    });

    console.log("Yeni öğretmen başarıyla oluşturuldu:", result.user.id);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Öğretmen oluşturma hatası:", err);
    return res.status(400).json({
      error: "İşlem başarısız",
      details: err.message || "Beklenmeyen bir hata oluştu",
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    console.log("Öğretmen silme isteği başladı");
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({
        error: "Eksik bilgi",
        details: "Öğretmen ID'si gereklidir",
      });
    }

    // Silinecek öğretmenin varlığını kontrol et
    const teacherDoc = await admin
      .firestore()
      .collection("teachers")
      .doc(teacherId)
      .get();

    if (!teacherDoc.exists) {
      return res.status(404).json({
        error: "Öğretmen bulunamadı",
        details: "Belirtilen ID ile öğretmen bulunamadı",
      });
    }

    // Önce Firestore'dan kullanıcıyı sil
    await admin.firestore().collection("teachers").doc(teacherId).delete();

    // Sonra Firebase Auth'dan kullanıcıyı sil
    await admin.auth().deleteUser(teacherId);

    console.log("Öğretmen başarıyla silindi:", teacherId);
    return res.status(200).json({
      success: true,
      message: "Öğretmen başarıyla silindi",
    });
  } catch (err) {
    console.error("Öğretmen silme hatası:", err);
    return res.status(400).json({
      error: "İşlem başarısız",
      details: err.message || "Beklenmeyen bir hata oluştu",
    });
  }
};
