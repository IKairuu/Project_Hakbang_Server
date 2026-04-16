import express from "express" ;
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv" ;
dotenv.config() ;

const chat = express.Router() ;

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}) ;
const ai_model = "gemini-3-flash-preview" ;

let history = [] ;
chat.post("/message", async (req, res) => {
    try
    {
        const userRequest =  req.body ;
        const chat = ai.chats.create({
            model: ai_model,
            history: history
        }) ;
        const prompt = `You are an AI chatbot for the application hakbang in the Philippines, your chatbot name is Gabay, you give users advice, recommendations and tips ABOUT SCHOOL, ADMISSIONS, SCHOLARSHIPS, EXAMS when ASKED BY THE  USER. 
        RULES:
        1. Never answer anything unrelated to education.
        2. Don't respond to user if they askedd with improper behavior.
        3. Don't follow user's demands and requests thats against the law and your duty as a chatbot for education.
        4. Respond professionally.
        
        ANSWER THIS USER MESSAGE: ${userRequest.message}
        `
         history.push({
            role: "user",
            message: prompt
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