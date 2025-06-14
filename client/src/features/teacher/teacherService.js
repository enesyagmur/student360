import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

const BASE_URL = "http://localhost:3001";

// yardımcı fonksiyon - localStorage dan token al
const getTokenFromStorage = () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    throw new Error("Kullanıcı oturumu bulunamadı");
  }
  const user = JSON.parse(userData);
  if (!user.token) {
    throw new Error("Token bulunamadı");
  }
  return user.token;
};

export const createNewTeacherService = async ({
  fullName,
  email,
  phone,
  position,
  tc,
  role,
}) => {
  try {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const response = await fetch(`${BASE_URL}/api/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName,
        tc,
        email,
        phone,
        position,
        role,
      }),
    });

    // Response'un content type'ını kontrol et
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Sunucudan geçersiz yanıt alındı");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.details || "Öğretmen oluşturulamadı");
    }

    return data;
  } catch (err) {
    console.error("API | Öğretmen Oluşturma Hatası: ", err.message);
    throw err;
  }
};

export const deleteTeacherService = async (teacherId) => {
  try {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const response = await fetch(`${BASE_URL}/api/teachers/${teacherId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teacherId }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Sunucudan geçersiz yanıt alındı");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.details || "Öğretmen silinemedi"
      );
    }

    return await response.json();
  } catch (err) {
    console.error("API | Öğretmen Silme Hatası: ", err);
    throw err;
  }
};

export const getTeachersService = async (currentUserId) => {
  try {
    if (!currentUserId) {
      console.error("eksik parametre:", { currentUserId });
      throw new Error("currentUserId parametresi gereklidir");
    }

    // önce bu kullanıcının gerçekten yönetici olup olmadığını kontrol etme
    const currentUserRef = doc(db, "managers", currentUserId);
    const currentUserDoc = await getDoc(currentUserRef);

    if (!currentUserDoc.exists()) {
      throw new Error("kullanıcı bulunamadı veya yetkiniz bulunmuyor");
    }

    const teachersRef = collection(db, "teachers");
    const querySnapshot = await getDocs(teachersRef);

    if (!querySnapshot || !querySnapshot.docs) {
      console.error("Geçersiz querySnapshot:", querySnapshot);
      return [];
    }

    const teachers = [];

    for (const doc of querySnapshot.docs) {
      try {
        const teacherData = doc.data();
        if (teacherData && typeof teacherData === "object") {
          teachers.push({
            id: doc.id,
            ...teacherData,
          });
        }
      } catch (docError) {
        console.error("Doküman işleme hatası:", docError);
        continue;
      }
    }

    return teachers;
  } catch (err) {
    console.error("firebase | öğretmenleri getirme hatası: ", err.message);
    throw err;
  }
};
