import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDb = async () => {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected, query executed successfully...");
  } catch (error) {
    console.error(
      "Database connection failed, Please check if db connenction is correct."
    );
    console.error(
      "Unable to find the issue? Please use the error file to see the real issue in config/db.ts"
    );
    process.exit(1);
  }
};

const disconnectDb = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDb, disconnectDb };
