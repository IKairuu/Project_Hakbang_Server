import express from "express";
import {addUserActivity, addUserData, getUserActivities, getUserData, saveSchool, getSavedSchool, removeSavedSchool, removeUserActivity, userLogin, emailCheckDuplicate, updateAboutMe, getSavedScholarships, saveScholarships, removeSavedScholarship} from "../database/database.js";
import {authentication} from "../middleware/auth.js" ;
import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
import { loginUser, registerUser } from "../controller/userController.js";
dotenv.config() ;

const user = express.Router() ;

user.post("/signup", registerUser) ; 
user.post("/login", loginUser) ;

//TODO change about me endpoints
user.put("/auth/change-about-me", authentication, async  (req, res) => {
    const updates = req.body ;
    try
    {
        await updateAboutMe(updates["email"], updates["about_me"]) ;
        return res.status(200).json({message:"Successfully Updated user data", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(514).json({message: "Server error: Cannot update user about me", status: 514}) ;
    }
}) ;

//TODO post activity endpoint
user.post("/auth/post-activity", authentication, async (req, res) => {
    const activity = req.body ; 
    try 
    {
        await addUserActivity(activity) ;
        return res.status(200).json({message: "Operation Successfull", status:200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(503).json({message: "Server error: Cannot upload user activities", status: 503}) ;
    }
}) ;

//TODO get activities endpoint
user.post("/auth/get-activities", authentication, async (req, res) => {
    const user_email =  req.body ;
    try
    {
        let activities =  await getUserActivities(user_email) ;
        return res.status(200).json({message: "Operation Successfull", data : activities, status : 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(504).json({message: "Server error: Cannot retrieve user activities", status:504}) ;
    }
}) ;

//TODO remove activity endpoint
user.post("/auth/remove-activities", authentication, async (req, res) => {
    const email = req.body.email ;
    try
    {
        await removeUserActivity(email) ;
        return res.status(200).json({message: "Activity Deletion Successfull", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(505).json({message: "Server error: Cannot remove activities", status:505}) ;
    }

}) ;

//TODO gets saved scholarship endpoint
user.post("/auth/get-saved-scholarship", authentication, async (req, res) => {
    let user_data = req.body ;
    try
    {
        const scholars = await getSavedScholarships(user_data.email) ;
        res.status(200).json({message:"Saved Scholarshis retrieved successfully", data: scholars, status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(515).json({message: "Server error: Cannot retrieve saved scholarships", status: 515}) ;
    }
}) ;

//TODO post saved scholarship endpoint
user.post("/auth/post-saved-scholarship", authentication, async (req, res) => {
    let user_data = req.body ;
    try
    {
        const schools = await saveScholarships(user_data) ;
        res.status(200).json({message:"Scholarship Saved Successfully", status: 200}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(516).json({message: "Server error: Cannot upload saved scholarships", status: 516}) ;
    }
}) ;

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
