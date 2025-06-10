import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../lib/firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";

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

export const deleteManagerService = async (
  currentUserId,
  managerIdForDelete
) => {
  if (!currentUserId) {
    throw new Error("Bu işlemi yapmak için giriş yapmanız gerekiyor");
  }
  try {
    const userDocRef = doc(db, "users");
    const userSnapDoc = await getDoc(userDocRef);
    if (!userSnapDoc.exists()) {
      throw new Error("SERVICE | Kullanıcılar verisi bulunamadı");
    }

    const users = userSnapDoc.data();

    const currentManager = users.find(
      (manager) => manager.id === currentUserId
    );

    if (!currentManager || currentManager.position !== "principal") {
      throw new Error(
        "SERVICE | Bu işlem için yetkiniz yok ya da bilgileriniz bulunamadı."
      );
    }

    const managerForDelete = users.find(
      (manager) => manager.id === managerIdForDelete
    );

    if (!managerForDelete) {
      throw new Error("SERVICE | Silinecek yönetici bilgileri bulunamadı.");
    }

    const newUsers = users.filter(
      (manager) => manager.id !== managerIdForDelete
    );

    await updateDoc(userDocRef, {
      newUsers,
    });

    deleteUser(managerIdForDelete);

    return managerIdForDelete;
  } catch (err) {
    console.error("SERVICE | Yönetici silme işleminde sorun ", err);
  }
};
