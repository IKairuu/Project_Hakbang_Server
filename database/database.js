import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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

  // Initialize Firebase
  const app = initializeApp(firebaseApp);
  const database = getFirestore(app) ;

export async function addUserData(user)
{
    try
    {
        const doc_data = await addDoc(collection(database, "users"), 
        {
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            occupation: user.occupation,
            school: user.school,
            institution: user.institution,
            grade: user.grade
        }) ;
        console.log(`Document written with: ${doc_data.id}`) ;
    }
    catch(error)
    {
        console.error(`Error: ${error}`) ;
        throw Error(error) ;
    }
}

export async function getUserData(user_data)
{
    const querySnapshot = await getDocs(collection(database, "users"));
    for (const doc of querySnapshot.docs)
    {
        let user = doc.data() ;
        if (user_data.email == user.email && user_data.password == user.password)
        {
            return user ;
        }
    }
    return null ;
}

export async function getColleges()
{
    let colleges = [] ;
    const querySnapshot = await getDocs(collection(database, "college"));
    for (const doc of querySnapshot.docs)
    {
        let college = doc.data() ;
        colleges.push(college) ;
    }
    return colleges ;
}