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

export const getTeachersByRoleService = async (role, currentUserId) => {
  try {
    const token = getTokenFromStorage();

    if (!role || !currentUserId) {
      console.error("Eksik parametreler:", { role, currentUserId });
      throw new Error("Role ve currentUserId parametreleri gereklidir");
    }

    const url = `${BASE_URL}/api/teachers/by-role/${role}?currentUserId=${currentUserId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.details || "Öğretmenler getirilemedi");
    }

    return data.users;
  } catch (err) {
    console.error("API | Öğretmenleri Getirme Hatası: ", err.message);
    throw err;
  }
};
