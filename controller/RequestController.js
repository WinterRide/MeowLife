import { firestore } from "../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const fetchDocumentId = async (ownerEmail, species) => {
  try {
    const id = await getDocumentId(ownerEmail, species);
    return id;
  } catch (error) {
    console.error("Error fetching document ID:", error);
    alert("Failed to fetch the item. Please try again.");
    return null;
  }
};

export const getDocumentId = async (ownerEmail, species) => {
  const q = query(
    collection(firestore, "request"),
    where("ownerEmail", "==", ownerEmail),
    where("species", "==", species)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Assuming only one document matches
    return doc.id;
  } else {
    throw new Error("No matching document found");
  }
};

export const handleAccept = async (itemId) => {
  try {
    const docRef = doc(firestore, "request", itemId);
    await updateDoc(docRef, { status: "Accepted" });

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const itemData = docSnap.data();
      const newItemData = { ...itemData, onFeatured: false, onOrder: false };
      await setDoc(doc(firestore, "market", docRef.id), newItemData);

      alert("Item data successfully written to the market collection");
    } else {
      alert("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleReject = async (itemId) => {
  try {
    const docRef = doc(firestore, "request", itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { status: "Rejected" });
      alert("Item data successfully rejected");
    } else {
      alert("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
};
