import express from "express";
import {addUserData, getUserData} from "../database/database.js";

const user = express.Router() ;

user.post("/signup", async (req, res) => 
    {
        const user = req.body;
        await addUserData(user) ;
    }) ;

user.post("/login", async (req, res) => {
    let user_data = await getUserData(req.body) ;
    if (user_data == null)
        return res.status(401).json({message:"Invalid Username or password"}) ;
    return res.status(200).json(user_data) ;
}) ;

export default user ;
