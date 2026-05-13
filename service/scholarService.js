import { db_scholarships } from "../repository/scholarRepository.js" ;

export const getScholarships = async (req, res) =>
{
    let scholarships = await db_scholarships() ;
    if (!scholarships || scholarships.length == 0)
        throw new Error("Server Error: Scholarships not retrieved") ;

    return scholarships ;
}