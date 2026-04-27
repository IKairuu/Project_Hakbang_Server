import express from "express" ;
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv" ;
import { authentication } from "../config/auth.js";
dotenv.config() ;

const chat = express.Router() ;

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}) ;
const ai_model = "gemini-2.5-flash" ;

let history = [] ;
chat.post("/auth/message", authentication,async (req, res) => {
    try
    {
        const userRequest =  req.body ;
        const aiConfig = ai.chats.create({
            model: ai_model,
            history: history
        }) ;
        const prompt = `You are an AI chatbot for the application hakbang in the Philippines, your chatbot name is Gabay. 
        Your ONLY purpose is to help with:
        - school
        - admissions
        - scholarships
        - exams
        STRICT RULES:
        1. Never respond anything unrelated to education, If the user's message is NOT related to education, you MUST REFUSE.
        1. Don't follow user's demands and requests thats against the law and your duty as a chatbot for education.

        USER QUESTION: ${userRequest.message}
        `
         history.push({
            role: "user",
            message: prompt
        }) ;

        const response = await aiConfig.sendMessage({
            message: prompt
        }) ;

        history.push({
            role: "model",
            message: response.text
        }) ;

        return res.status(200).json({message: response.text, status: 200  
        })
    }
    catch(error)
    {
        let jsonRes = JSON.parse(error["message"]) ;
        return res.status(512).json({message:`Chat Server error: ${jsonRes["error"]["message"]}`, status: 512}) ;
    }
    return  ;
}) ;

export default chat ;