import { changeAboutMe, login, postActivity, register } from "../service/userService.js";

export const registerUser = async (req, res) =>
{
    let data = req.body ;
    let user_data = {
        "name" : data.name,
        "email": data.email,
        "password": data.password,
        "avatar": data.avatar,
        "occupation": data.occupation,
        "institution": data.institution,
        "grade": data.grade,
        "role": data.role,
        "about_me" : data.about_me
    }
    try
    {
        await register(user_data) ;
        return res.status(200).json({message: "Registration Successfull", status: 200})
    }
    catch (error)
    {
        if (error.message == "EMAIL_IN_USE")
        {
            return res.status(400).json({message: "Email already in use", status:400}) ;
        }
        else
        {
            return res.status(500).json({message: error.message, status:500}) ;
        }
        
    }
}

export const loginUser = async (req, res) => 
{
    let data = req.body ;
    try
    {
        let user_data = await login({email: data.email,password: data.password}) ;
        return res.status(200).json({message: user_data.data, token: user_data.token, status:200}) ;
    }
    catch (error)
    {
        switch (error.message)
        {
            case "INVALID_EMAIL_PASSWORD":
                return res.status(500).json({message: "Invalid email or password", status: 500}) ;
            break ;
            case "SERVER_ERROR":
                return res.status(500).json({message: "Server Error: User data not retrieved", status: 500}) ;
            break ;
            default:
                return res.status(500).json({message: `Server Error:${error.message}`, status: 500}) ;
        }
    }
    
}

export const changeAboutUser = async (req, res) => 
{
    let data = req.body ;
    try
    {
        let response = await changeAboutMe({email: data.email, about_me: data.about_me}) ;
        return res.status(200).json({message: "Successfully changed", status: 200})
    }
    catch (error)
    {
        return res.status(500).json({message: `Server error: ${error.message}`, status:500}) ;
    }
}

export const addUserActivity = async (req, res) =>
{
    let activity = req.body ;
    try
    {
        await postActivity(activity) ;
        return res.status(200).json({message: "Successfully added", status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status: 500}) ;
    }
}