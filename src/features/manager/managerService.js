import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import generateRandomPassword from "../../utils/generateRandomPassword";
import { doc, setDoc } from "firebase/firestore";

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
