import { prisma } from "../config/database.config.js";

export async function db_college() {
  const colleges = await prisma.college.findMany();
  return colleges;
}
