import User from "../model/user";

export async function register(user_data)
{
    const user = User(user_data.name, user_data.email,user_data.hash,user_data.avatar,user_data.occupation,user_data.institution,user_data.grade,user_data.role,user_data.about_me,)
}