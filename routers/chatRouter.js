import express from "express" ;
import { chatMessage } from "../controller/chatController.js";
const chat = express.Router() ;

chat.post("/message", chatMessage) ;

export default chat ;