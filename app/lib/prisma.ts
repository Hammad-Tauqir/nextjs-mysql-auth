console.log("NEW PRISMA FILE LOADED");
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};


const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "nextjs_app",
  connectionLimit: 5,
  port: 3306,
});


export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });


if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}