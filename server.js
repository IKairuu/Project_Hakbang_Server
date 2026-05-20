import app from "./app.js" ;
import express from "express" ;
import nodemailer from "nodemailer" ;
import  { transporter } from "./config/mailer_config.js" ;

app.get("/ping", (req, res) => {
    let response = res.status(200).json({message: "Connected to Server"}) ;
    return response ;
}) ;
const port = process.env.PORT || 5050 ;
app.listen(port, function() {console.log(`Listening to http://localhost:${port}`)}); 