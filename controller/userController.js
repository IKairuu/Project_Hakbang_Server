import { changeAboutMe, getActivity, getSavedScholarships, login, postActivity, register, removeActivity, postSavedScholarship, removeSavedScholarship, getSavedSchools, postSavedSchools, removeSavedSchool } from "../service/userService.js";

export const registerUser = async (req, res) =>
{
    let data = req.body ;
    try
    {
        await register(data) ;
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

export const getUserActivity = async (req, res) =>
{
    let email = req.params.email
    try
    {
        let activities = await getActivity(email) ;
        return res.status(200).json({message: "Successfully retrieved activities", data: activities, status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: `Server Error: ${error.message}`}) ;
    }
}

export const removeUserActivity = async (req, res) =>
{
    let email = req.params.email ;
    try
    {
        await removeActivity(email) ;
        return res.status(200).json({message: "Successfully cleared", status: 200}) ;
    }
    catch (error)
    {
        return res.status(200).json({message: `Server Error: ${error.message}`, status: 200}) ;
    }
}

export const getUserSavedScholarships = async (req, res) => 
{
    let email = req.params.email ;
    try
    {
        let scholarships = await getSavedScholarships(email) ;
        return res.status(200).json({message: "Successfully retrieved saved scholarships", data: scholarships, status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: `Server Error: ${error.message}`, data: scholarships, status: 500}) ;
    }
}

export const postUserSavedScholarship = async (req, res) =>
{
    let scholar = req.body ;
    try
    {
        await postSavedScholarship(scholar) ;
        return res.status(200).json({message: "Successfully saved", status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status: 500}) ;
    }
}

export const removeUserSavedScholarship = async (req, res) =>
{
    let scholar = req.body ;
    try
    {
        await removeSavedScholarship(scholar) ;
        return res.status(200).json({message: "Successfully removed", status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status: 500}) ;
    }
}

export const getUserSavedSchools = async (req, res) =>
{
    let email = req.params.email ;
    try
    {
        let schools = await getSavedSchools(email) ;
        return res.status(200).json({message: "Saved Schools successfully retrieved", data: schools, status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status: 500}) ;
    }
}

export const postUserSavedSchools = async (req, res) =>
{
    let school_data = req.body ;
    try
    {
        await postSavedSchools(school_data) ;
        return res.status(200).json({message: "Successfully saved", status: 200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status: 500}) ;
    }
}

export const removeUserSavedSchool = async (req, res) =>
{
    let school_data = req.body ;
    try
    {
        await removeSavedSchool(school_data) ;
        return res.status(200).json({message: "Successfully removed", status:200}) ;
    }
    catch (error)
    {
        return res.status(500).json({message: error.message, status:500}) ;
    }
}