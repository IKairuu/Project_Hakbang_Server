import express from "express";
import {addUserData} from "../database/database.js";
const port = 5050

const app = express() ; 
const signup = express.Router() ;
app.use("/signup", signup) ;

signup.post("/", express.json(), async (req, res) => 
    {
        const user = req.body;
        await addUserData(user) ;
        console.log(user) ;
        res.send(user) ;
    }) ;


app.listen(port, function() {
    console.log(`Listening to http://localhost:${port}`) ;
}) ; 