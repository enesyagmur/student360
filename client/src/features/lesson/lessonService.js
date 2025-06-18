import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createLessonService = async ({ lessonData, currentUserId }) => {
  try {
    if (!currentUserId) {
      throw new Error("SERVICE | Dersleri çekerken sorun: userId eksik");
    }

    if (!lessonData || typeof lessonData !== "object") {
      throw new Error("SERVICE | Geçersiz ders verisi");
    }

    const userSnapShot = await getDoc(doc(db, "managers", currentUserId));

    if (!userSnapShot.exists()) {
      throw new Error("Yönetici bulunamadı");
    }

    const lessonsCollectionRef = collection(db, "lessons");
    const newLessonDocRef = doc(lessonsCollectionRef);

    const result = await setDoc(newLessonDocRef, {
      lessonId: newLessonDocRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...lessonData,
    });

    return result;
  } catch (err) {
    throw new Error(`SERVICE | Dersleri çekerken sorun: ${err.message}`);
  }
};

export const getLessonsService = async (currentUserId) => {
  try {
    if (!currentUserId) {
      throw new Error(`SERVICE | Dersleri çekerken sorun: eksik bilgi: userId`);
    }

    const userSnapShot = await getDoc(doc(db, "managers", currentUserId));
    if (!userSnapShot.exists()) {
      throw new Error(`SERVICE | Dersleri çekerken sorun: yönetici bulunamadı`);
    }

    const lessonsDocRef = collection(db, "lessons");
    const lessonsSnapShot = await getDocs(lessonsDocRef);

    const lessons = lessonsSnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return lessons;
  } catch (err) {
    throw new Error(`SERVICE | Dersleri çekerken sorun: ${err}`);
  }
};
