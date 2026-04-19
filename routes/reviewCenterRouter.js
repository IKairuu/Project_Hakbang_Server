import express from "express" ;
import { authentication } from "../config/auth.js";

const center = express.Router() ;

center.get("/auth/get-review-centers", authentication, (req, res) => 
{
    res.send("Working") ;
}) ;

export default center ;