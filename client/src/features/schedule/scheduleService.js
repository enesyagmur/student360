import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createScheduleService = async (
  classId,
  className,
  schedule,
  currentUserId
) => {
  try {
    if (!currentUserId) {
      throw new Error(
        "SERVICE | Program oluştururken sorun: currentUserId eksik"
      );
    }
    //yönetici kontrolü
    const managerDocRef = doc(db, "managers", currentUserId);
    const managerSnapShot = await getDoc(managerDocRef);
    if (!managerSnapShot.exists()) {
      throw new Error(
        "SERVICE |Program oluştururken sorun: Yönetici bulunamadı"
      );
    }

    const schedulesColRef = collection(db, "schedules");
    const scheduleDocRef = doc(schedulesColRef); // otomatik id üretir

    const newSchedule = {
      id: scheduleDocRef.id,
      classId: classId,
      className: className,
      schedule: schedule,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    //programlara ekleme
    await setDoc(scheduleDocRef, newSchedule);

    const classDocRef = doc(db, "classes", classId);
    const classSnapShot = await getDoc(classDocRef);
    if (!classSnapShot.exists()) {
      throw new Error("SERVICE | Sınıf bulunamadı");
    }
    const classData = classSnapShot.data();
    await updateDoc(classDocRef, {
      ...classData,
      schedule: schedule,
    });

    return newSchedule;
  } catch (err) {
    throw new Error(`SERVICE | Program oluştururken sorun: ${err}`);
  }
};
