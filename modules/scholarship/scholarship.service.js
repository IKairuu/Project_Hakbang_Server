import { errorCodes } from "../error/error.handler.js";
import { db_scholarships } from "./scholarship.repository.js";

export const getScholarships = async () => {
  let scholarships = await db_scholarships();
  if (scholarships == null || scholarships.length == 0)
    throw errorCodes.SERVER.SERVER_12;

  return scholarships;
};
