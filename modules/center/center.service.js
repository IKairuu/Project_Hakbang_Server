import { errorCodes } from "../error/error.handler.js";
import { db_reviewCenter } from "./center.repository.js";

export const getCenters = async () => {
  let centers = await db_reviewCenter();
  if (!centers || centers.length == 0) throw errorCodes.SERVER.SERVER_11;

  return centers;
};
