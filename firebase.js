import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBA8Zhtf-EvTLObcNnZs9kbkYlHenMko6g",
  authDomain: "meowlife-5b904.firebaseapp.com",
  projectId: "meowlife-5b904",
  storageBucket: "meowlife-5b904.appspot.com",
  messagingSenderId: "37571279844",
  appId: "1:37571279844:web:5e5f6fa7449beb1b0f65f1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()

const firestore = getFirestore(app)
const storage = getStorage(app)

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {auth, storage, firestore, firebase}