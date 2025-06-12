import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../lib/firebase";

import { doc, getDoc } from "firebase/firestore";

export const userLoginService = async (email, password, role) => {
  try {
    const userCredantial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredantial.user;
    const userDocRef = doc(db, "users", user.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
      throw new Error("SERVICE | Kullanıcı Bulunamadı");
    }

    const userData = userSnapShot.data();

    if (userData.role !== role) {
      throw new Error(
        `SERVICE | Hatalı Rol Seçimi, Sizin Rolünüz: ${userData.role}, Seçtiğiniz Rol: ${role}`
      );
    }

    return userData;
  } catch (err) {
    console.error("SERVICE | giriş yaparken sorun ", err);
    return err;
  }
};
