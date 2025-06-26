import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

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

//YÖnetici oluşturma --------------------------------------
export const createNewManagerService = async ({
  fullName,
  email,
  phone,
  position,
  tc,
  role,
}) => {
  try {
    // 1. Rastgele parola oluştur
    const password = uuidv4();

    // 2. Firebase Auth ile kullanıcı oluştur
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    // 3. Firestore'a yönetici olarak ekle
    const managerData = {
      id: uid,
      fullName,
      email,
      phone,
      position,
      tc,
      role,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "managers", uid), managerData);

    return managerData;
  } catch (err) {
    console.error("API | Kullanıcı Oluşturma Hatası: ", err.message);
    throw err;
  }
};

//YÖnetici Silme ------------------------------------------------
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

//Kullanıcıları Getirme ------------------------------------------------
export const getManagersService = async (currentUserId) => {
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

    const managersRef = collection(db, "managers");

    const querySnapshot = await getDocs(managersRef);
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  } catch (err) {
    console.error("firebase | yöneticileri getirme hatası: ", err.message);
    throw err;
  }
};
