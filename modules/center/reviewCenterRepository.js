import { prisma } from "../config/database_config.js";

export async function db_reviewCenter() {
  const hubs = await prisma.center.findMany();
  return hubs;
}
