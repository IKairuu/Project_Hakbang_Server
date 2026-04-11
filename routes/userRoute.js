import express from "express";
import {addUserData, getUserData} from "../database/database.js";

const user = express.Router() ;

user.post("/signup", express.json(), async (req, res) => 
    {
        const user = req.body;
        await addUserData(user) ;
    }) ;

user.get("/login", async (req, res) => {
    await getUserData() ;
}) ;

export default user ;
