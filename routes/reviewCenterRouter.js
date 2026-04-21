import express from "express" ;
import { authentication } from "../config/auth.js";
import { getHubs } from "../database/database.js" ;

const center = express.Router() ;

center.get("/auth/get-review-centers", authentication, async (req, res) => 
{
    try
    {
        let hubs = await getHubs() ;
        return res.status(200).json({message: "Hubs Retrieved Successfully", status: 200, data: hubs}) ;
    }
    catch (error)
    {
        return res.status(503).json({message: "Error retrieving hubs"}) ;
    }
    
}) ;

export default center ;