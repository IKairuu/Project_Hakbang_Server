import { db_college } from "./college.repository.js";

export const getColleges = async () => {
  let colleges = await db_college();
  if (colleges == null || colleges.length == 0)
    throw new Error("Server Error: Colleges not found");

  return colleges;
};
