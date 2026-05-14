import { register } from "../service/userService";

export const registerUser = async (req, res) =>
{
    let data = req.body ;
    try
    {
        await register(data.name, data.email, data.hash, data.avatar, data.occupation, data.institution, data.grade, data.role, data.about_me) ;
        return res.status(200).json({message: "Registration Successfull", status: 200})
    }
    catch (error)
    {
        return res.status(500).json({message: `Server Error: ${error.message}`, status:500}) ;
    }
}