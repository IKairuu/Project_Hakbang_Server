import express from "express";
import {addUserActivity, addUserData, getUserActivities, getUserData, saveSchool, getSavedSchool} from "../database/database.js";
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
            await addUserData(user) ;
            return res.status(200).json({message: "User Signed up successfully"}) ;
        }
        catch (error)
        {
            return res.status(500).json({message: "Server error"}) ;
        }
        
    }) ;

user.post("/login", async (req, res) => {
    let user_data = await getUserData(req.body) ;
    if (user_data == null)
        return res.status(401).json({message:"Invalid Username or password", "status": 401}) ;

    let accessToken = jwt.sign({data: user_data}, process.env.JWT_SECRET_KEY) ;
    return res.status(200).json({message: "Successfully logged in", token: accessToken, "status": 200, "data": user_data}) ;
}) ;

user.post("/auth/post-activity", authentication, async (req, res) => {
    const activity = req.body ; 
    try 
    {
        await addUserActivity(activity) ;
        return res.status(200).json({message: "Operation Successfull"}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: "Server error"}) ;
    }
}) ;

user.post("/auth/get-activities", authentication, async (req, res) => {
    const user_email =  req.body ;
    try
    {
        let activities =  await getUserActivities(user_email) ;
        return res.status(200).json({message: "Operation Successfull", "data" : activities}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: "Server error"}) ;
    }
}) ;

user.post("/auth/get-saved-schools", authentication, async (req, res) => {
    let user_data = req.body ;
    try
    {
        const schools = await getSavedSchool(user_data.email) ;
        res.status(200).json({message:"Saved Schools retrieved successfully", data: schools}) ;
    }
    catch (error)
    {
        console.log(error) ;
        return res.status(500).json({message: "Server error"}) ;
    }
}) ;

user.post("/auth/post-saved-schools", authentication, (req, res) => {

}) ;

//FOR TESTING PURPOSES
user.get("/auth/test-message",authentication,(req, res) => {
    return res.status(200).json({message:"Successful authentication"}) ;
}) ;

export default user ;
