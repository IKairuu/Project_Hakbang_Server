import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
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

export async function getScholarships()
{
    let scholarships = [] ;
    const querySnapshot = await getDocs(collection(database, "scholarship"));
    for (const doc of querySnapshot.docs)
    {
        let scholar = doc.data() ;
        scholarships.push(scholar) ;
    }
    return scholarships ;
}

export async function addUserActivity(activity)
{
    try
    {
        const doc_data = await addDoc(collection(database, "activity"), 
        {
            email: activity.email,
            description: activity.description,
            date: activity.date,
            iconName: activity.iconName
        }) ;
    }
    catch(error)
    {
        console.error(`Error: ${error}`) ;
        throw Error(error) ;
    }
}

export async function getUserActivities(user_email)
{
    let activities = [] ;
    const querySnapshot = await getDocs(collection(database, "activity"));
    for (const doc of querySnapshot.docs)
    {
        let act = doc.data() ;
        if (act.email == user_email.email)
        {
            activities.push(act) ;
        }
    }
    return activities ;
}

export async function saveSchool(schoolData) 
{
    try
    {
        const doc_data = await addDoc(collection(database, "saved_schools"),
        {
            college_name: schoolData.college_name,
            email: schoolData.email
        }) ;

    }
    catch (error)
    {
        console.error(`Error: ${error}`) ;
        throw Error(error) ;
    }
}

export async function getSavedSchool(user_email)
{
    let schools = []
    const querySnapshot = await getDocs(collection(database, "saved_schools")) ;

    for (const doc of querySnapshot.docs)
    {
        let saved = doc.data() ;
        if (user_email == saved.email)
        {
            schools.push(saved) ;
        }
    }
    return schools ;
}

export async function removeSavedSchool(schoolData)
{
    const querySnapshot = await getDocs(collection(database, "saved_schools")) ;
    for (const documents of querySnapshot.docs)
    {
        let document_id = documents.id ;
        let saved = documents.data() ;
        if (schoolData.email == saved.email && schoolData.college_name == saved.college_name)
        {
            await deleteDoc(doc(database, "saved_schools", document_id));
        }
    }
}