import bycrypt from "bcrypt" ;
import { addDoc, collection } from "firebase/firestore";
import { User } from "../model/user.js"

export async function db_add_user(user) 
{
    try
    {
        const doc_data = await addDoc(collection(database, "users"), 
        {
            name: user.name,
            email: user.email,
            password: hash,
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