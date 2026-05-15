import express from "express";
import { addUserData, getUserData, saveSchool, getSavedSchool, removeSavedSchool, userLogin, emailCheckDuplicate, updateAboutMe, getSavedScholarships, saveScholarships, removeSavedScholarship} from "../database/database.js";
import {authentication} from "../middleware/auth.js" ;
import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
import { addUserActivity, changeAboutUser, getUserActivity, getUserSavedScholarships, loginUser, postUserSavedScholarship, registerUser, removeUserActivity } from "../controller/userController.js";
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

//TODO remove saved scholarship endpoint
user.post("/auth/remove-saved-scholarship", authentication, async (req, res) => {
    const scholars = req.body ;
    try
    {
        const server_response = await removeSavedScholarship(scholars) ;
        return res.status(200).json({message: "Delete Successfull", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(517).json({message: "Server error: Cannot remove saved scholarship", status: 517}) ;
    }
}) ;

//TODO get saved schools endpoint
user.post("/auth/get-saved-schools", authentication, async (req, res) => {
    let user_data = req.body ;
    try
    {
        const schools = await getSavedSchool(user_data.email) ;
        res.status(200).json({message:"Saved Schools retrieved successfully", data: schools, status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(506).json({message: "Server error: Cannot retrieve saved schools", status: 506}) ;
    }
}) ;

//TODO post saved schools endpoint
user.post("/auth/post-saved-schools", authentication, async (req, res) => {
    let user_data = req.body ;
    try
    {
        const schools = await saveSchool(user_data) ;
        res.status(200).json({message:"School Saved Successfully", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(507).json({message: "Server error: Cannot upload saved schools", status: 507}) ;
    }
}) ;

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
