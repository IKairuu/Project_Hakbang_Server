import { prisma } from "../config/database_config.js";

export async function db_college() {
  const colleges = await prisma.college.findMany();
  return colleges;
}
