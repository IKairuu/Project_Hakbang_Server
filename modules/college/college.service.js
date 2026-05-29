import { errorCodes } from "../error/error.handler.js";
import { db_college } from "./college.repository.js";

export const getColleges = async () => {
  let colleges = await db_college();
  if (colleges == null || colleges.length == 0)
    throw errorCodes.SERVER.SERVER_10;

  return colleges;
};
