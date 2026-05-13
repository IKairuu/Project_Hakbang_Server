import express from "express" ;
import { scholarshipList } from "../controller/scholarController.js" ;

const scholar = express.Router() ;

scholar.get("/active-scholarships", scholarshipList) ;
export default scholar ;