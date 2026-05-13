import { db_college } from "../repository/collegeRepository.js";

export const getColleges = async () => 
{
    let colleges = await db_college() ;
    if (!colleges || colleges.length == 0)
        throw new Error("Server Error: Colleges not found") ;
    
    return colleges ;
}