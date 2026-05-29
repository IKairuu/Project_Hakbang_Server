import { prisma } from "../config/database.config.js";

export async function db_scholarships() {
  const scholarships = await prisma.scholarship.findMany();
  return scholarships;
}
