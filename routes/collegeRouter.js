import express from "express" ;
import {authentication} from "../config/auth.js" ;
import { getColleges } from "../database/database.js";

const collegeRouter = express.Router() ;

collegeRouter.get("/auth/available-colleges", authentication,async (req, res) => {
    let colleges = await getColleges() ;
    if (!colleges)
        return res.status(501).json({message:"Server Error: Colleges not found", status: 501}) ;

    return res.status(200).json({message: "Colleges loaded successfully", data: colleges, status: 200}) ;
}
) ;

export default collegeRouter ;