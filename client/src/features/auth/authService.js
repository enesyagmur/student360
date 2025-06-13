import { auth, db } from "../../lib/firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// firebase servislerini başlat
export const userLoginService = async (email, password, role) => {
  try {
    console.log("Firebase ile giriş başlatılıyor...");

    // 1. firebase Authentication ile giriş
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Firebase giriş başarılı, UID:", user.uid);

    // 2. firestore dan kullanıcı verilerini çek
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      throw new Error("Kullanıcı veritabanında bulunamadı");
    }

    const userData = userDoc.data();
    console.log("Firestore'dan alınan kullanıcı verisi:", userData);

    // 3. rol kontrolü
    if (userData.role !== role) {
      throw new Error(
        `Yetkisiz erişim! Sizin rolünüz: ${userData.role}, Erişmeye çalıştığınız rol: ${role}`
      );
    }

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
    console.log("Kullanıcı localStorage'a kaydedildi");

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
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};
