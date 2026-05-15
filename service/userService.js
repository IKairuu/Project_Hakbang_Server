import bcrypt  from "bcrypt" ;
import User from "../model/user.js";
import jwt from "jsonwebtoken" ;
import { db_add_user, db_get_user_data, db_getAllUsers, db_login_user } from "../repository/userRepository.js";

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