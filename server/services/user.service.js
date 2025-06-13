const admin = require("../config/firebase-admin");

exports.createUserInFirestore = async ({
  fullName,
  email,
  phone,
  role,
  position,
  tc,
}) => {
  const password = Math.random().toString(36).slice(-8);
  const userRecord = await admin
    .auth()
    .createUser({ email, password, displayName: fullName });

  const userData = {
    id: userRecord.uid,
    fullName,
    email,
    phone,
    role,
    position,
    tc,
    createdAt: new Date().toISOString(),
  };

  await admin.firestore().collection("users").doc(userRecord.uid).set(userData);
  return userData;
};
