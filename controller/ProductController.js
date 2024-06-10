import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export const getProductById = async (itemId) => {
    try {
        const itemDocRef = doc(firestore, "market", itemId);
        const itemDocSnapshot = await getDoc(itemDocRef);

        if (itemDocSnapshot.exists()) {
            // Item document exists, return its data
            return itemDocSnapshot.data();
        } else {
            // Item document doesn't exist
            throw new Error(`No item found with ID: ${itemId}`);
        }
    } catch (error) {
        console.error('Error getting item by ID: ', error);
        throw error;
    }
};