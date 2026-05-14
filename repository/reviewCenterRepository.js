import { database } from "../config/firebase_config.js" ;
import { getDocs, collection } from "firebase/firestore"; 

export async function db_reviewCenter()
{
    let hubs = [] ;
    const querySnapshot = await getDocs(collection(database, "review_centers")) ;
    for (const docs of querySnapshot.docs)
    {
        let available_hubs = docs.data() ;
        hubs.push(available_hubs) ;
    }
    return hubs ;
}