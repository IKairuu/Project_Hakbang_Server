import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv" ;
import { authentication } from "../middleware/auth.js";
dotenv.config() ;

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}) ;
const ai_model = "gemini-2.5-flash" ;

export let history = [] ;
export const aiConfig = ai.chats.create({
            model: ai_model,
            history: history
        }) ;
