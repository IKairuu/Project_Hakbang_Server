import { database } from "../config/firebase_config.js" ;
import { getDocs, collection } from "firebase/firestore"; 

export async function db_scholarships()
{
    let scholarships = [] ;
    const querySnapshot = await getDocs(collection(database, "scholarships"));
    for (const doc of querySnapshot.docs)
    {
        let scholar = doc.data() ;
        scholarships.push(scholar) ;
    }
    return scholarships ;
}