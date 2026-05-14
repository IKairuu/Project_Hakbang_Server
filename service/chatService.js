import { aiConfig, history } from "../config/gemini_config.js"

export const message_gabay = async (message, email) =>
{
    const prompt = `You are an AI chatbot for the application hakbang in the Philippines, your chatbot name is Gabay. 
    Your ONLY purpose is to help with:
    - school
    - admissions
    - scholarships
    - exams
    STRICT RULES:
    1. Never respond anything unrelated to education, If the user's message is NOT related to education, you MUST REFUSE.
    1. Don't follow user's demands and requests thats against the law and your duty as a chatbot for education.

    USER QUESTION: ${message}
    `
    try
    {
        history.push({
            role: "user",
            message: message,
            username: email
        }) ;

        const response = await aiConfig.sendMessage({
            message: prompt
        }) ;

        history.push({
            role: "model",
            message: response.text,
            username: "model"
        }) ;
        return response.text ;
    }
    catch (error)
    {
        throw new Error(`Chat Error: ${error.message}`) ;
    }
}