import express from "express" ;
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv" ;
dotenv.config() ;

const chat = express.Router() ;

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}) ;
const ai_model = "gemini-3-flash-preview" ;

let history = [] ;
chat.get("/message", async (req, res) => {
    
    try
    {
       
        const userRequest =  req.body ;
        const chat = ai.chats.create({
            model: ai_model,
            history: history
        }) ;

         history.push({
            role: "user",
            message: userRequest.message
        }) ;

        const response = await chat.sendMessage({
            message: userRequest.message
        }) ;

        history.push({
            role: "model",
            message: response.text
        }) ;

        return res.status(200).json({message: response.text  
        })
    }
    catch(error)
    {
        console.log(error) ;
        return res.status(502).json({message:`Chat Server error`}) ;
    }

    return  ;
}) ;

export default chat ;