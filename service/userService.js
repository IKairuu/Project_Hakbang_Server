import bcrypt  from "bcrypt" ;
import User from "../model/user.js";
import { db_add_user, db_getAllUsers } from "../repository/userRepository.js";

export const register = async (user_data) =>
{
    if ((await db_getAllUsers()).forEach((value) => Object.values(value).includes(user_data.email) ))
    {
        throw new Error("Email already used") ;
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