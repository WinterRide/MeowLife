import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getDocumentIDByEmail = async (email) => {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Assuming only one document matches
    return doc.id;
  } else {
    throw new Error("No matching document found");
  }
};

export const updateProfile = async (
  email,
  nickname,
  fullName,
  phoneNumber,
  address
) => {
  try {
    const id = await getDocumentIDByEmail(email); // Await the promise to get the document ID
    const userDocRef = doc(firestore, "users", id);

    await updateDoc(userDocRef, {
      nickname: nickname,
      name: fullName,
      phoneNumber: phoneNumber,
      address: address,
    });

    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
