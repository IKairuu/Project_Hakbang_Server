import { db_scholarships } from "../repository/scholarRepository.js";

export const getScholarships = async () => {
  let scholarships = await db_scholarships();
  if (scholarships == null || scholarships.length == 0)
    throw new Error("Server Error: Scholarships not retrieved");

  return scholarships;
};
