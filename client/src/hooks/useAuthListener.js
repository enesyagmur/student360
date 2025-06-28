import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { doc, getDoc } from "firebase/firestore";

export default function useAuthListener() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Eğer redux'ta user varsa tekrar arama yapma
      if (user && user.uid) return;

      if (firebaseUser) {
        // Firestore'dan kullanıcı rolünü çek
        let userData = null;
        const collections = ["managers", "teachers", "students"];

        for (const collection of collections) {
          const docRef = doc(db, collection, firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            userData = {
              ...docSnap.data(),
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: docSnap.data().role,
            };
            break;
          }
        }
        if (userData) {
          dispatch(setUser(userData));
        }
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch, user]);
}
