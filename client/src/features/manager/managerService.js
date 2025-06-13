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

export const createNewManagerService = async ({
  fullName,
  email,
  phone,
  position,
  tc,
  role,
}) => {
  try {
    const token = getTokenFromStorage();

    const response = await fetch(`${BASE_URL}/api/managers`, {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.details || "Kullanıcı oluşturulamadı");
    }

    // Gelen veriyi kontrol et ve doğru formatta döndür
    if (!data || typeof data !== "object") {
      throw new Error("Geçersiz veri formatı");
    }

    return data;
  } catch (err) {
    console.error("API | Kullanıcı Oluşturma Hatası: ", err.message);
    throw err;
  }
};

export const deleteManagerService = async (managerId) => {
  try {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const response = await fetch(`${BASE_URL}/api/managers/${managerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Önce response'un content type'ını kontrol et
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Sunucudan geçersiz yanıt alındı");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.details || "Yönetici silinemedi"
      );
    }

    return await response.json();
  } catch (err) {
    console.error("API | Yönetici Silme Hatası: ", err);
    throw err;
  }
};

export const getUsersByRoleService = async (role, currentUserId) => {
  try {
    const token = getTokenFromStorage();

    if (!role || !currentUserId) {
      console.error("Eksik parametreler:", { role, currentUserId });
      throw new Error("Role ve currentUserId parametreleri gereklidir");
    }

    const url = `${BASE_URL}/api/managers/by-role/${role}?currentUserId=${currentUserId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.details || "Kullanıcılar getirilemedi"
      );
    }

    return data.users;
  } catch (err) {
    console.error("API | Kullanıcıları Getirme Hatası: ", err.message);
    throw err;
  }
};
