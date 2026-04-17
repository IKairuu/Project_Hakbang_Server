import express from "express" ;
import { getScholarships } from "../database/database.js";
import { authentication } from "../config/auth.js";

const scholar = express.Router() ;

scholar.get("auth/active-scholarships", authentication,async (req, res) => 
{
    let active_scholarships = await getScholarships() ;
    if (!active_scholarships)
        return res.status(503).json({message:"Server Error: Scholarships not found"}) ;

    return res.status(200).json({message: "Scholarhips loaded successfully", data: active_scholarships}) ;
}) ;

export default scholar ;