import express from "express";
import { addUserData, getUserData, saveSchool, getSavedSchool, removeSavedSchool, userLogin, emailCheckDuplicate, updateAboutMe, getSavedScholarships, saveScholarships, removeSavedScholarship} from "../database/database.js";
import {authentication} from "../middleware/auth.js" ;
import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
import { addUserActivity, changeAboutUser, getUserActivity, getUserSavedScholarships, getUserSavedSchools, loginUser, postUserSavedScholarship, postUserSavedSchools, registerUser, removeUserActivity, removeUserSavedScholarship } from "../controller/userController.js";
dotenv.config() ;

const user = express.Router() ;

user.post("/signup", registerUser) ; 
user.post("/login", loginUser) ;
user.put("/auth/change-about-me", authentication, changeAboutUser) ;
user.post("/auth/post-activity", authentication, addUserActivity) ;
user.get("/auth/get-activities/:email", authentication, getUserActivity) ;
user.delete("/auth/remove-activities/:email", authentication,removeUserActivity) ;
user.get("/auth/get-saved-scholarship/:email", authentication, getUserSavedScholarships) ;
user.post("/auth/post-saved-scholarship", authentication, postUserSavedScholarship) ;
user.post("/auth/remove-saved-scholarship", authentication, removeUserSavedScholarship) ;
user.get("/auth/get-saved-schools/:email", authentication, getUserSavedSchools) ;
user.post("/auth/post-saved-schools", authentication, postUserSavedSchools) ;

//TODO remove saved school endpoint
user.post("/auth/remove-saved-school", authentication, async (req, res) => {
    const school = req.body ;
    try
    {
        const server_response = await removeSavedSchool(school) ;
        return res.status(200).json({message: "Delete Successfull", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(508).json({message: "Server error: Cannot remove saved school", status: 508}) ;
    }
}) ;

export default user ;
