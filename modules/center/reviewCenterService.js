import { db_reviewCenter } from "../repository/reviewCenterRepository.js"

export const getCenters = async () =>
{
    let centers = await db_reviewCenter() ;
    if (!centers || centers.length == 0)
        throw new Error("Server Error: Centers not retrieved") ;

    return centers ;
}