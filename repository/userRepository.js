import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase_config.js" ;
import User from "../model/user.js"

export async function db_add_user(user) 
{
    try
    {
        const doc_data = await addDoc(collection(database, "users"), 
        {
            name: user.name,
            email: user.email,
            password: user.hash,
            avatar: user.avatar,
            occupation: user.occupation,
            institution: user.institution,
            grade: user.grade,
            role: user.role,
            about_me: user.about_me
        }) ;
    }
    catch(error)
    {
        throw new Error(`Database error: ${error.message}`) ;
    }
    
}

export async function db_getAllUsers()
{
    let users = [] ;
    const querySnapshot = await getDocs(collection(database, "users"));
    for (const doc of querySnapshot.docs)
    {
        let user = doc.data() ;
        users.push(user) ;
    }
    return users ;
}