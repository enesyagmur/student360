import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../lib/firebase";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

export const updatePhotoService = async (photo, currentUserId, userRole) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | Resim güncellenirken sorun: currentUserId eksik"
      );
    }

    if (!photo) {
      throw new Error("SERVICE | Resim güncellenirken sorun: photo eksik");
    }

    if (!userRole) {
      throw new Error("SERVICE | Resim güncellenirken sorun: role eksik");
    }

    const storageRef = ref(storage, `profilePhoto/${currentUserId}`);
    await uploadBytes(storageRef, photo);

    const photoUrl = await getDownloadURL(storageRef);

    const userDocRef = doc(db, `${userRole}s`, currentUserId);

    // Firestore'da güncelle
    await updateDoc(userDocRef, { photoUrl: photoUrl });

    // Authentication'da güncelle
    if (auth.currentUser && auth.currentUser.uid === currentUserId) {
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
    }
  } catch (err) {
    throw new Error(`SERVICE | Resim güncellenirken sorun: ${err}`);
  }
};

export const updateFullName = async (fullName, currentUserId, userRole) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | İsim güncellenirken sorun: currentUserId eksik"
      );
    }
    if (!fullName) {
      throw new Error("SERVICE | İsim güncellenirken sorun: fullName eksik");
    }
    if (!userRole) {
      throw new Error("SERVICE | İsim güncellenirken sorun: role eksik");
    }

    // Firestore'da güncelle
    const userDocRef = doc(db, `${userRole}s`, currentUserId);
    await updateDoc(userDocRef, { fullName });

    // Authentication'da güncelle

    if (auth.currentUser && auth.currentUser.uid === currentUserId) {
      await updateProfile(auth.currentUser, { displayName: fullName });
    }
  } catch (err) {
    throw new Error(`SERVICE | İsim güncellenirken sorun: ${err}`);
  }
};

export const updateEmailService = async (email, currentUserId, userRole) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | E-posta güncellenirken sorun: currentUserId eksik"
      );
    }
    if (!email) {
      throw new Error("SERVICE | E-posta güncellenirken sorun: email eksik");
    }
    if (!userRole) {
      throw new Error("SERVICE | E-posta güncellenirken sorun: role eksik");
    }

    // Firestore'da güncelle
    const userDocRef = doc(db, `${userRole}s`, currentUserId);
    await updateDoc(userDocRef, { email });

    // Authentication'da güncelle
    if (auth.currentUser && auth.currentUser.uid === currentUserId) {
      await updateEmail(auth.currentUser, email);
    }
  } catch (err) {
    throw new Error(`SERVICE | E-posta güncellenirken sorun: ${err}`);
  }
};

export const updatePasswordService = async (newPassword, currentUserId) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | Şifre güncellenirken sorun: currentUserId eksik"
      );
    }
    if (!newPassword) {
      throw new Error(
        "SERVICE | Şifre güncellenirken sorun: newPassword eksik"
      );
    }

    if (auth.currentUser && auth.currentUser.uid === currentUserId) {
      await updatePassword(auth.currentUser, newPassword);
    } else {
      throw new Error(
        "SERVICE | Şifre güncellenirken sorun: Kullanıcı doğrulanamadı"
      );
    }
  } catch (err) {
    throw new Error(`SERVICE | Şifre güncellenirken sorun: ${err}`);
  }
};
