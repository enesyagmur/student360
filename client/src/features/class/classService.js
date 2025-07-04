import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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

    const requiredFields = ["classNumber", "classChar", "capacity"];
    const missingValues = requiredFields.filter((field) => !classData[field]);

    if (missingValues.length > 0) {
      throw new Error(
        `SERVICE | Sınıf oluştururken eksik bilgi! Eksik alanlar: ${missingValues.join(
          ", "
        )}`
      );
    }

    const classesCollectionRef = collection(db, "classes");
    const newClassDocRef = doc(classesCollectionRef);

    const newClassData = {
      id: newClassDocRef.id,
      ...classData,
      createdAt: new Date().toISOString(),
      currentStudentNumber: 0,
      students: [],
      schedule: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    };

    await addDoc(classesCollectionRef, newClassData);

    return newClassData;
  } catch (err) {
    console.error("SERVICE | Sınıf oluştururken sorun: ", err);
    throw err;
  }
};

export const getClassesService = async (currentUserId) => {
  try {
    if (!currentUserId) {
      throw new Error("SERVICE | Sınıflar getirilirken eksik bilgi: UserId");
    }

    const managerDocRef = doc(db, "managers", currentUserId);
    const managerSnapShot = await getDoc(managerDocRef);

    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE | Sınıf çekilirken mevcut kullanıcı bulunamadı ya da yetkiniz yok."
      );
    }

    const classesDocRef = collection(db, "classes");
    const classesSnapShot = await getDocs(classesDocRef);

    if (classesSnapShot.empty) {
      return [];
    }

    const classes = classesSnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return classes;
  } catch (err) {
    console.error("SERVICE | Sınıflar getirilirken sorun: ", err);
    throw new Error("SERVICE | Sınıflar getirilirken sorun: ", err);
  }
};

export const studentAddToClassService = async (
  student,
  classId,
  currentUserId
) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | Öğrenciyi sınıfa eklerken sorun: userId eksik"
      );
    }

    if (!classId) {
      throw new Error(
        "SERVICE | Öğrenciyi sınıfa eklerken sorun: classId eksik"
      );
    }

    const classDocRef = doc(db, "classes", classId);
    const classSnapShot = await getDoc(classDocRef);
    if (!classSnapShot.exists()) {
      throw new Error(
        "SERVICE | Öğrenciyi sınıfa eklerken sorun: sınıf bulunamadı"
      );
    }

    const classData = classSnapShot.data();

    const alreadyExists = classData.students.some((s) => s.id === student.id);
    if (alreadyExists) {
      throw new Error(
        "SERVICE | Öğrenciyi sınıfa eklerken sorun: kullanıcı sınıfa daha önce eklenmiş"
      );
    }

    await updateDoc(classDocRef, {
      students: [...classData.students, student],
      currentStudentNumber: (classData.currentStudentNumber || 0) + 1,
    });
  } catch (err) {
    throw new Error(`SERVICE | Öğrenciyi sınıfa eklerken sorun: ${err}`);
  }
};
