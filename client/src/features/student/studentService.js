import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createNewStudentService = async ({
  studentData,
  currentUserId,
}) => {
  try {
    if (!currentUserId) {
      throw new Error("SERVICE | Öğrenci oluşturmak için bilgi eksik: userId");
    }

    const managerDocRef = doc(db, "managers", currentUserId);
    const managerSnapShot = await getDoc(managerDocRef);

    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE | Öğrenci oluşturmak için kullanıcı bulunamadı ya da yönetici değilsiniz."
      );
    }

    const requiredFields = ["fullName", "tc", "email", "phone"];
    const missingValues = requiredFields.filter((field) => !studentData[field]);

    if (missingValues.length > 0) {
      throw new Error(
        `SERVICE | Öğrenci oluştururken eksik bilgi! Eksik alanlar: ${missingValues.join(
          ", "
        )}`
      );
    }

    const studentsCollectionRef = collection(db, "students");

    const newStudentData = {
      ...studentData,
      birthDate: studentData.birthDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(studentsCollectionRef, newStudentData);
    const finalStudentData = {
      ...newStudentData,
      id: docRef.id,
    };
    return finalStudentData;
  } catch (err) {
    console.error("SERVICE | Öğrenci oluştururken sorun: ", err);
    throw err;
  }
};

export const getStudentsService = async (currentUserId) => {
  try {
    if (!currentUserId) {
      throw new Error("SERVICE | Öğrenciler getirilirken eksik bilgi: UserId");
    }

    const managerDocRef = doc(db, "managers", currentUserId);
    const managerSnapShot = await getDoc(managerDocRef);

    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE | Öğrenciler çekilirken mevcut kullanıcı bulunamadı ya da yetkiniz yok."
      );
    }

    const studentsDocRef = collection(db, "students");
    const studentsSnapShot = await getDocs(studentsDocRef);

    if (studentsSnapShot.empty) {
      return [];
    }

    const students = studentsSnapShot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        birthDate: data.birthDate || null,
        createdAt: data.createdAt || null,
        updatedAt: data.updatedAt || null,
      };
    });
    return students;
  } catch (err) {
    console.error("SERVICE | Öğrenciler getirilirken sorun: ", err);
    throw err;
  }
};

export const deleteStudentService = async ({ studentId, currentUserId }) => {
  try {
    if (!studentId || !currentUserId) {
      throw new Error(`SERVICE | Öğrenci silinirken sorun: eksik bilgi`);
    }

    const userSnapShot = await getDoc(doc(db, "managers", currentUserId));
    if (!userSnapShot.exists()) {
      throw new Error(`SERVICE | Öğrenci silerken sorun: yönetici bulunamadı`);
    }

    const studentDocRef = doc(db, "students", studentId);
    await deleteDoc(studentDocRef);

    return studentId;
  } catch (err) {
    throw new Error(`SERVICE | Öğrenci silinirken sorun: ${err}`);
  }
};
