import express from "express" ;
import { collegeList } from "../controller/collegeController.js" ;

const collegeRouter = express.Router() ;

collegeRouter.get("/available-colleges" , collegeList) ;
export default collegeRouter ;