import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import generateRandomPassword from "../../utils/generateRandomPassword";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const createNewManagerService = async ({
  fullName,
  tc,
  email,
  phone,
  position,
}) => {
  try {
    const password = generateRandomPassword();
    const userCreditinal = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCreditinal.user;

    await updateProfile(user, {
      displayName: fullName,
    });

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      fullName: fullName,
      tc: tc,
      email: email,
      phone: phone,
      role: "manager",
      position: position,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (err) {
    console.error("SERVICE | Yönetici kayıt sırasında sorun ", err);
    throw err;
  }
};

export const getUsersByRoleService = async (role) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", role));
    const userSnapShot = await getDocs(q);
    const users = userSnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return users || [];
  } catch (err) {
    console.error("SERVICE | Kullanıcı çekerken sorun ", err);
    return err;
  }
};
