import express from "express" ;
import { centerList } from "../controller/reviewCenterController.js";

const center = express.Router() ;

center.get("/get-review-centers", centerList) ;

export default center ;