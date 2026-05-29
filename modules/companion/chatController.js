import { message_gabay } from "../service/chatService.js";

export const chatMessage = async (req, res) =>
{
    let message = req.body.message ;
    let email = req.body.email ;
    try
    {
        let chat = await message_gabay(message, email) ;
        return res.status(200).json({message: chat, status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message:`Chat Server error: ${error.message}`, status: 500}) ;
    }
}