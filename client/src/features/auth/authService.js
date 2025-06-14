import { auth, db } from "../../lib/firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// firebase servislerini başlat
export const userLoginService = async (email, password, role) => {
  try {
    // 1. firebase Authentication ile giriş
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    let userDoc;

    // 2. firestore dan kullanıcı verilerini çek
    if (role === "manager") {
      userDoc = await getDoc(doc(db, "managers", user.uid));
    } else if (role === "teacher") {
      userDoc = await getDoc(doc(db, "teachers", user.uid));
    } else if (role === "student") {
      userDoc = await getDoc(doc(db, "students", user.uid));
    }

    const roleConvertToTurkish = () => {
      if (role === "manager") {
        return "Yönetici";
      } else if (role === "teacher") {
        return "Öğretmen";
      } else if (role === "student") {
        return "Öğrenci";
      }
    };

    if (!userDoc.exists()) {
      throw new Error(
        `Seçtiğiniz bilgilere ait ${roleConvertToTurkish()} veritabanında bulunamadı`
      );
    }

    const userData = userDoc.data();

    // 4. token al ve kullanıcıyı sakla
    const token = await user.getIdToken();
    const userToStore = {
      uid: user.uid,
      email: user.email,
      role: userData.role,
      token: token,
      ...userData,
    };

    localStorage.setItem("user", JSON.stringify(userToStore));

    return userToStore;
  } catch (err) {
    console.error("Giriş hatası:", err);
    // Çıkış yaparak temizlik
    await auth.signOut();
    localStorage.removeItem("user");
    throw err;
  }
};

export const logoutService = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    console.log("Çıkış başarılı");
  } catch (err) {
    console.error("Çıkış yaparken hata:", err);
    throw err;
  }
};

export const getCurrentUser = () => {
  try {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;

    const user = JSON.parse(userJson);
    return user;
  } catch (error) {
    console.error("Kullanıcı bilgisi alınırken hata:", error);
    return null;
  }
};
