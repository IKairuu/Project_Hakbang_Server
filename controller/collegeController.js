import { getColleges } from "../service/collegeService.js";

export const collegeList = async (req, res)=>
{
    try
    {
        let colleges = await getColleges() ;
        return res.status(200).json({message: "Colleges loaded successfully", data: colleges, status: 200}) ;
    }
    catch(error)
    {
        return res.status(511).json({message:error.message , status: 511}) ;
    }
}