import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createClassService = async (currentUserId, classData) => {
  try {
    if (!currentUserId) {
      throw new Error("SERVICE | Sınıf oluşturmak için bilgi eksik: userId");
    }

    const managerDocRef = doc(db, "managers", currentUserId);
    const managerSnapShot = await getDoc(managerDocRef);

    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE | Sınıf oluşturmak için kullanıcı bulunamadı ya da yönetici değilsiniz."
      );
    }

    const requiredFields = ["classNumber", "classChar", "capacity", "state"];
    const missingValues = requiredFields.filter((field) => !classData[field]);

    if (missingValues.length > 0) {
      throw new Error(
        `SERVICE | Sınıf oluştururken eksik bilgi! Eksik alanlar: ${missingValues.join(
          ", "
        )}`
      );
    }

    const classesCollectionRef = collection(db, "classes");

    const newClassData = {
      ...classData,
      createdAt: new Date().toISOString(),
      currentStudents: 0,
      managerId: currentUserId,
    };

    const docRef = await addDoc(classesCollectionRef, newClassData);

    const finalClassData = {
      ...newClassData,
      id: docRef.id,
    };

    return finalClassData;
  } catch (err) {
    console.error("SERVICE | Sınıf oluştururken sorun: ", err);
    throw err;
  }
};
