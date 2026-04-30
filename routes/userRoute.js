import express from "express";
import {addUserActivity, addUserData, getUserActivities, getUserData, saveSchool, getSavedSchool, removeSavedSchool, removeUserActivity, userLogin, emailCheckDuplicate, updateAboutMe} from "../database/database.js";
import {authentication} from "../config/auth.js" ;
import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;

const user = express.Router() ;

user.post("/signup", async (req, res) => 
    {
        const user = req.body;
        try
        {
            if (await emailCheckDuplicate(user["email"]))
            {
                return res.status(405).json({message: "Email is already in use", status: 405}) ;
            }
            else
            {
                await addUserData(user) ;
                return res.status(200).json({message: "Signed up successfully", status: 200}) ;
            }
        }
        catch (error)
        {
            console.log(error) ;
            return res.status(501).json({message: "Server error: Sign up failed", status: 501}) ;
        }
        
    }) ;

user.post("/login", async (req, res) => {
    let user_email = await userLogin(req.body) ;
    if (user_email == null)
        return res.status(401).json({message:"Invalid Username or password", status: 401}) ;

    let accessToken = jwt.sign({data: user_email}, process.env.JWT_SECRET_KEY) ;
    return res.status(200).json({message: "Successfully logged in", token: accessToken, status: 200, data: user_email}) ;
}) ;

user.get("/auth/:email/get-user-data", authentication, async (req, res) => {
    const user_email = req.params.email ;
    try
    {
        let user_data = await getUserData(user_email) ;
        if (user_data == null)  return res.status(513).json({message:"Error retrieving data", status: 513}) ; 

        return res.status(200).json({message:"Successfully retrieved data", status: 200, data: user_data}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(502).json({message: "Server error: Cannot retrieve user data", status: 502}) ; 
    }
    
}) ;

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
        return res.status(513).json({message: "Server error: Cannot update user about me", status: 513}) ;
    }
}) ;

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

//FOR TESTING PURPOSES
user.get("/auth/test-message",authentication,(req, res) => {
    return res.status(200).json({message:"Successful authentication"}) ;
}) ;

export default user ;
