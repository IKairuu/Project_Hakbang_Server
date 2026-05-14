import User from "../model/user";
import { db_add_user } from "../repository/userRepository";

export const register = async (user_data) =>
{
    const user = User(user_data.name, user_data.email,user_data.hash,user_data.avatar,user_data.occupation,user_data.institution,user_data.grade,user_data.role,user_data.about_me,) ;

    try
    {
        await db_add_user(user) ;
    }
    catch(error)
    {
        throw new Error("Registration Failed") ;;
    }    
}