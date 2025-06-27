import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const createScheduleService = async (formState, currentUserId) => {
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
      classInfo: formState.class,
      schedule: formState.schedule,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    //programlara ekleme
    await setDoc(scheduleDocRef, newSchedule);

    const classDocRef = doc(db, "classes", formState.class.id);
    const classSnapShot = await getDoc(classDocRef);
    if (!classSnapShot.exists()) {
      throw new Error("SERVICE | Sınıf bulunamadı");
    }
    const classData = classSnapShot.data();
    await updateDoc(classDocRef, {
      ...classData,
      schedule: newSchedule,
    });
  } catch (err) {
    throw new Error(`SERVICE | Program oluştururken sorun: ${err}`);
  }
};
