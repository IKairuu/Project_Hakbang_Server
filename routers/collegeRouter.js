import express from "express" ;
import { authentication } from "../middleware/auth.js" ;
import { collegeList } from "../controller/collegeController.js" ;

const collegeRouter = express.Router() ;

collegeRouter.get("/available-colleges" , collegeList) ;
export default collegeRouter ;