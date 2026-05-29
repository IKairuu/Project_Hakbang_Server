import { history, ai, ai_model } from "../config/gemini_config.js"
import chat from "../routers/chatRouter.js";

export const message_gabay = async (message, email) =>
{
    if (!history[email])
    {
        history[email] = [] ;
    }

    history[email].push({role : "user", parts: [{text:message}]}) ;
    
    const userHistory = history[email] ;
    const aiConfig = ai.chats.create({
            model: ai_model,
            history: userHistory
        }) ;
    const prompt = `You are an AI chatbot for the application hakbang in the Philippines, your chatbot name is Gabay. 
    Your ONLY purpose is to help with:
    - school
    - admissions
    - scholarships
    - exams
    You may engage in light conversational responses when appropriate,
    but always redirect the conversation toward educational assistance.

    Refuse:
    - illegal activities
    - harmful requests
    - explicit content
    USER QUESTION: ${message}
    `
    try
    {
        const response = await aiConfig.sendMessage({
            message: prompt
        }) ;

       history[email].push({role : "model", parts: [{text:response.text}]}) ;
        return response.text ;
    }
    catch (error)
    {
        throw new Error(JSON.parse(error.message)["error"]["message"]) ;
    }
}