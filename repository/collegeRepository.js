import { database } from "../config/firebase_config.js" ;
import { getDocs, collection } from "firebase/firestore"; 

export async function db_college()
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