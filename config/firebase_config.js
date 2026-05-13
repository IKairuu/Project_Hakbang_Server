import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import * as dotenv from "dotenv" ;
import bcrypt from "bcrypt"  ;
dotenv.config() ;

const firebaseApp = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseApp);
  const database = getFirestore(app) ;

export default database ;