import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()

const firestore = getFirestore(app)
const storage = getStorage(app)

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {auth, storage, firestore, firebase}
