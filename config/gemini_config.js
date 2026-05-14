import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv" ;
dotenv.config() ;

export const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY}) ;
export const ai_model = "gemini-2.5-flash" ;

export let history = {} ;

