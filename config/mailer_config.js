import nodemailer from "nodemailer" ;
import * as dotenv from "dotenv" ;
import dns from "dns" ;
dotenv.config() ;

dns.setDefaultResultOrder("ipv4first");
export const transporter = nodemailer.createTransport({host:"smtp.gmail.com", port: 465, secure: true, auth: {
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASSWORD
}, connectionTimeout: 10000})