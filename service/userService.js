import bcrypt  from "bcrypt" ;
import User from "../model/user.js";
import jwt from "jsonwebtoken" ;
import { db_add_user, db_change_about_me, db_get_activities, db_get_saved_scholarships, db_get_saved_schools, db_get_user_data, db_getAllUsers, db_login_user, db_post_activity, db_post_saved_scholarship, db_post_saved_schools, db_remove_saved_scholarship, db_remove_saved_school, db_remove_user_activity } from "../repository/userRepository.js";

export const register = async (user_data) =>
{
    if ((await db_getAllUsers()).some((value) => value["email"] == user_data.email))
    {
        throw new Error("EMAIL_IN_USE") ;
    }

    const saltRounds = 10 ;
    const salt = await bcrypt.genSalt(saltRounds) ;
    const hashed_password = await bcrypt.hash(user_data.password, salt) ;

    const user = new User(user_data.name, user_data.email, hashed_password, user_data.avatar, user_data.occupation, user_data.institution, user_data.grade, user_data.role, user_data.about_me,) ;

    try
    {
        await db_add_user(user) ;
    }
    catch(error)
    {
        throw new Error("Server Error: Registration Failed") ;
    }    
}

export const login = async (user_data) =>
{
    let verify = await db_login_user(user_data.email) ;
    if (verify == null || !(await bcrypt.compare(user_data.password, verify.password)))
    {
        throw new Error("INVALID_EMAIL_PASSWORD") ;
    }
    //TODO authentication here
    let data = await db_get_user_data(verify.email) ;
    if (data == null)
    {
        throw new Error("SERVER_ERROR") ;
    }

    let accessToken = jwt.sign({data: data.email}, process.env.JWT_SECRET_KEY, {expiresIn: "2h"}) ;

    return {data : {name: data.name, email: data.email, password: data.password_hash, avatar: data.avatar, occupation: data.occupation, institution: data.institution, grade: data.grade, role: data.role, about_me: data.about_me}, token: accessToken} ;
}

export const changeAboutMe = async (user_data) =>
{
    try
    {
        await db_change_about_me(user_data.email, user_data.about_me) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const postActivity = async (activity_details) =>
{
    try
    {
        await db_post_activity(activity_details) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const getActivity = async (email) =>
{
    let activities = await db_get_activities(email) ;
    return activities ;
}

export const removeActivity = async (email) =>
{
    try
    {
        await db_remove_user_activity(email) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const getSavedScholarships = async (email) => 
{
    let saved = await db_get_saved_scholarships(email) ;
    return saved ;
}

export const postSavedScholarship = async (scholarship_data) =>
{
    try
    {
        await db_post_saved_scholarship(scholarship_data) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const removeSavedScholarship = async (scholarship_data) =>
{
    try
    {
        await db_remove_saved_scholarship(scholarship_data) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const getSavedSchools = async (email) =>
{
    let saved = await db_get_saved_schools(email) ;
    return saved ;
}

export const postSavedSchools = async (school_data) =>
{
    try
    {
        await db_post_saved_schools(school_data) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}

export const removeSavedSchool = async (school_data) =>
{
    try
    {
        await db_remove_saved_school(school_data) ;
    }
    catch (error)
    {
        throw new Error(`Server Error: ${error.message}`) ;
    }
}