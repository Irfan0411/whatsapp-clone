import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD-neUOY4nYJhDta4cZIJGqr66RD0BDFRo",
  authDomain: "chat-3191a.firebaseapp.com",
  databaseURL: "https://chat-3191a-default-rtdb.firebaseio.com",
  projectId: "chat-3191a",
  storageBucket: "chat-3191a.appspot.com",
  messagingSenderId: "1083170023433",
  appId: "1:1083170023433:web:8d7e86f637c52a63c7b0d8",
  measurementId: "G-KHB9H37CVT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const database = getDatabase(app);