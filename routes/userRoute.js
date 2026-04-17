import express from "express";
import {addUserData, getUserData} from "../database/database.js";
import {authentication} from "../config/auth.js" ;
import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;

const user = express.Router() ;

user.post("/signup", async (req, res) => 
    {
        const user = req.body;
        await addUserData(user) ;
        return res.status(200).json({message: "User Signed up successfully"}) ;
    }) ;

user.post("/login", async (req, res) => {
    let user_data = await getUserData(req.body) ;
    if (user_data == null)
        return res.status(401).json({message:"Invalid Username or password", "status": 401}) ;

    let accessToken = jwt.sign({data: user_data}, process.env.JWT_SECRET_KEY) ;
    return res.status(200).json({message: "User Successfully logged in", token: accessToken, "status": 200}) ;
}) ;

//FOR TESTING PURPOSES
user.get("/auth/test-message",authentication,(req, res) => {
    return res.status(200).json({message:"Successful authentication"}) ;
}) ;

export default user ;
