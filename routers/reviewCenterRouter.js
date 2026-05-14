import express from "express" ;
import { authentication } from "../middleware/auth.js";
import { getHubs } from "../database/database.js" ;
import { centerList } from "../controller/reviewCenterController.js";

const center = express.Router() ;

center.get("/get-review-centers", centerList) ;

export default center ;