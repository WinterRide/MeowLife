import { firestore } from "../firebase";
import { getDocs, collection, setDoc, doc, query, where } from "firebase/firestore";
import "react-native-get-random-values";
import { storage, firebase } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { addDoc, updateDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system"
import { useState } from "react";

export const getData = async(collectionName) => {
    const colRef = collection(firestore, collectionName);
    const docsSnap = await getDocs(colRef);
    const fetchedData = docsSnap.docs.map(doc => doc.data());

    return fetchedData;
}

export const fetchDocumentId = async (ownerEmail, species) => {
    try {
        const id = await getDocumentId(ownerEmail, species);
        return id;
    } catch (error) {
        console.error('Error fetching document ID:', error);
        alert('Failed to fetch the item. Please try again.');
        return null;
    }
};

export const getUserDocIdByEmail = async (email) => {
    try {
        const q = query(collection(firestore, "users"), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            // console.log(`Found user document ID: ${userDoc.id}`);
            return userDoc.id;
        } else {
            throw new Error('No matching document found');
        }
    } catch (error) {
        console.error('Error getting user document ID:', error);
        throw error;
    }
};



export const uploadImages = async (imageUris) => {
    // setUploading(true);
    const imageUrls = [];

    try {
        for (const image of imageUris) {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const fileName = image.substring(image.lastIndexOf('/') + 1);
            const fileRef = ref(storage, `product/${fileName}`); // Adjusted to use imported storage

            await uploadBytes(fileRef, blob);

            // Get the download URL
            const downloadURL = await getDownloadURL(fileRef);
            imageUrls.push(downloadURL);
        }

        // setUploading(false);
        // setImages([]);

        return imageUrls;

    } catch (error) {
        console.error(error);
        // setUploading(false);
        return [];
    }
};

export const uploadVaccines = async (vaccineList) => {
    // setUploading(true);
    const imageUrls = [];

    try {
        for (const vaccine of vaccineList) {
            const { image, name } = vaccine
            if (!image) continue; // Skip if there is no image

            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const fileName = image.substring(image.lastIndexOf('/') + 1);
            const fileRef = ref(storage, `vaccines/${fileName}`); // Adjusted to use imported storage

            await uploadBytes(fileRef, blob);

            // Get the download URL
            const downloadURL = await getDownloadURL(fileRef);
            imageUrls.push({name, images: downloadURL});
        }

        // setUploading(false);
        return imageUrls;

    } catch (error) {
        console.error(error);
        // setUploading(false);
        return [];
    }
};

export const uploadData = async(collectionName, data) => {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    await updateDoc(doc(firestore, collectionName, docRef.id), {
        id: docRef.id
    });
}