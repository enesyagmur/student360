import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const createAnnouncementService = async (
  title,
  content,
  target,
  creatorName,
  currentUserId
) => {
  try {
    if (!currentUserId) {
      throw new Error(`SERVICE | Duyurular getirilirken sorun: kullanıcı Id`);
    }

    const userDocRef = doc(db, "managers", currentUserId);
    const userSnapDoc = await getDoc(userDocRef);

    if (!userSnapDoc.exists()) {
      throw new Error(
        `SERVICE | Duyuru oluştururken sorun: Yönetici bulunamadı`
      );
    }

    const announcementColRef = collection(db, "announcements");
    const announcementDocRef = doc(announcementColRef);
    const newAnnouncement = {
      id: announcementDocRef.id,
      title: title,
      content: content,
      target: target,
      creatorName: creatorName,
      createdBy: currentUserId,
      createdAt: new Date().toISOString(),
    };

    await setDoc(announcementDocRef, newAnnouncement);
    return newAnnouncement;
  } catch (err) {
    throw new Error(`SERVICE | Duyuru oluştururken sorun: ${err.message}`);
  }
};

export const fetchAnnouncementsService = async (userId, userRole) => {
  try {
    if (!userId || !userRole) {
      throw new Error(
        `SERVICE | Duyurular getirilirken sorun: kullanıcı bilgileri eksik`
      );
    }

    let userDocRef;
    if (userRole === "manager") {
      userDocRef = doc(db, "managers", userId);
    } else if (userRole === "teacher") {
      userDocRef = doc(db, "teachers", userId);
    } else if (userRole === "student") {
      userDocRef = doc(db, "students", userId);
    }
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
      throw new Error(
        `SERVICE | Duyurular getirilirken sorun: kullanıcı bulunamadı`
      );
    }

    let announcementsQuery;
    if (userRole === "manager") {
      announcementsQuery = collection(db, "announcements");
    } else if (userRole === "teacher") {
      announcementsQuery = query(
        collection(db, "announcements"),
        where("target", "in", ["everybody", "teacher"])
      );
    } else if (userRole === "student") {
      announcementsQuery = query(
        collection(db, "announcements"),
        where("target", "in", ["everybody", "student"])
      );
    }
    const announcementsSnap = await getDocs(announcementsQuery);

    if (announcementsSnap.empty) {
      return [];
    }

    const announcements = announcementsSnap.docs.map((item) => ({
      ...item.data(),
    }));

    return announcements;
  } catch (err) {
    throw new Error(`SERVICE | Duyurular getirilirken sorun: ${err}`);
  }
};

export const deleteAnnouncementService = async (announcementId, managerId) => {
  try {
    if (!managerId) {
      throw new Error(`SERVICE | Duyuru silinirken sorun: Yönetici Id eksik`);
    }
    const userDocRef = doc(db, "managers", managerId);
    const userSnapDoc = await getDoc(userDocRef);

    if (!userSnapDoc.exists()) {
      throw new Error(`SERVICE | Duyuru silinirken sorun: Yönetici bulunamadı`);
    }

    const announcementDocRef = doc(db, "announcements", announcementId);
    const announcementSnapShot = await getDoc(announcementDocRef);

    if (!announcementSnapShot.exists()) {
      throw new Error(`SERVICE | Duyuru silinirken sorun: Duyuru Bulunamadı`);
    }

    await deleteDoc(announcementDocRef);
  } catch (err) {
    throw new Error(`SERVICE | Duyuru silinirken sorun: ${err}`);
  }
};
