import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";
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
            password: user.password_hash,
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

export async function db_login_user(email)
{
    let data = null ;
    const querySnapshot = await getDocs(collection(database, "users"));
    for (const doc of querySnapshot.docs)
    {
        let user = doc.data() ;
        if (user.email == email)
        {
            data = {email: user.email, password: user.password}  ;
        }
        
    }
    return data ;
}

export async function db_get_user_data(email)
{
    const querySnapshot = await getDocs(collection(database, "users"));
    for (const doc of querySnapshot.docs)
    {
        let user_data = doc.data() ;
        if (email == user_data.email)
        {
            return new User(user_data.name, user_data.email, user_data.password, user_data.avatar, user_data.occupation, user_data.institution, user_data.grade, user_data.role, user_data.about_me) ;
        }
    }
    return null ;
}

export async function db_change_about_me(email, new_about_me)
{
    const querySnapshot = await getDocs(collection(database, "users")) ;
    for (const docs of querySnapshot.docs)
    {
        let user_id = docs.id ;
        let user = docs.data() ;
        if (email == user.email)
        {
            await updateDoc(doc(database, "users", user_id), 
            {
                about_me : new_about_me
            })  ;
        }
    }
}

export async function db_post_activity(activity)
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
        throw Error(`Database error: ${error.message}`) ;
    }
}

export async function db_get_activities(email)
{
    let activities = [] ;
    const querySnapshot = await getDocs(collection(database, "activity"));
    for (const doc of querySnapshot.docs)
    {
        let act = doc.data() ;
        if (act.email == email)
        {
            activities.push(act) ;
        }
    }
    return activities ;
}