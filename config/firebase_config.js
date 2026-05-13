import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import * as dotenv from "dotenv" ;
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

  const app = initializeApp(firebaseApp);

export const database = getFirestore(app) ;