import { auth } from "../../lib/firebase";
const API_URL = "http://localhost:3001/api/managers";

export const createNewManagerService = async ({
  fullName,
  email,
  phone,
  position,
  tc,
  role,
}) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Kullanıcı oturumu bulunamadı");
    }

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`http://localhost:3001/api/managers`, {
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Kullanıcı Oluşturulamadı");
    }
    console.log(auth.currentUser);

    return await response.json();
  } catch (err) {
    console.error("API | Kullanıcı Oluşturma Hatası: ", err.message);
    throw err;
  }
};

export const getUsersByRoleService = async (role) => {
  console.log(role);
};
