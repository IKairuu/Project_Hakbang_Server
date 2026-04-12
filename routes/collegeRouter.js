import express from "express" ;
import {authentication} from "../config/auth.js" ;
import { getColleges } from "../database/database.js";

const collegeRouter = express.Router() ;

collegeRouter.get("/available-colleges", async (req, res) => {
    let colleges = await getColleges() ;
    if (!colleges)
        return res.status(501).json({message:"Colleges not found"}) ;

    return res.status(200).json({message: "Colleges loaded successfully", data: colleges}) ;
}
) ;

export default collegeRouter ;