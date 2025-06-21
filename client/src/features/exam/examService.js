import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createNewExamService = async (examData, managerId) => {
  try {
    if (!managerId || !examData) {
      throw new Error("SERVICE | Sınav oluştururken sorun: Bilgiler eksik");
    }

    const managerDocRef = doc(db, "managers", managerId);
    const managerSnapShot = await getDoc(managerDocRef);
    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE | Sınav oluştururken sorun: Yönetici Bulunamadı"
      );
    }

    const examColRef = collection(db, "exams");
    const examDocRef = doc(examColRef);

    const newExam = {
      id: examDocRef.id,
      createdAt: new Date().toISOString(),
      creatorId: managerId,
      participants: [],
      ...examData,
    };

    await setDoc(examDocRef, newExam);
    return newExam;
  } catch (err) {
    throw new Error(`SERVICE | Sınav oluştururken sorun: ${err}`);
  }
};

export const fetchExamsService = async (userId, userRole) => {
  try {
    if (!userId || !userRole) {
      throw new Error(
        "SERVICE | Sınavlar getirilirken sorun: kullanıcı bilgileri eksik"
      );
    }

    let userDocRef;
    if (userRole === "manager") {
      userDocRef = doc(db, "managers", userId);
    } else if (userRole === "teacher") {
      userDocRef = doc(db, "teachers", userId);
    } else if (userRole === "student") {
      userDocRef = doc(db, "students", userId);
    } else {
      throw new Error("SERVICE | Sınavlar getirilirken sorun: Geçersiz rol");
    }

    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
      throw new Error(
        "SERVICE | Sınavlar getirilirken sorun: kullanıcı bulunamadı"
      );
    }

    let examsQuery;
    if (userRole === "manager" || userRole === "teacher") {
      examsQuery = collection(db, "exams");
    } else if (userRole === "student") {
      const userData = userSnapShot.data();
      if (!userData.grade) {
        throw new Error(
          "SERVICE | Sınavlar getirilirken sorun: öğrencinin grade bilgisi yok"
        );
      }
      examsQuery = query(
        collection(db, "exams"),
        where("grade", "==", userData.grade && "active", "==", true)
      );
    }

    const examsSnap = await getDocs(examsQuery);

    if (examsSnap.empty) {
      return [];
    }

    const exams = examsSnap.docs.map((item) => ({
      ...item.data(),
    }));

    return exams;
  } catch (err) {
    throw new Error(`SERVICE | Sınavlar getirilirken sorun: ${err}`);
  }
};
