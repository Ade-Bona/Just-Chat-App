import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "just-chat-d93ee.firebaseapp.com",
  projectId: "just-chat-d93ee",
  storageBucket: "just-chat-d93ee.appspot.com",
  messagingSenderId: "24924173027",
  appId: "1:24924173027:web:7fed16c5187c6a29844bd6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(); 