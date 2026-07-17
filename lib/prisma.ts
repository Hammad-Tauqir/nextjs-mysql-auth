console.log("NEW PRISMA FILE LOADED");

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};


const adapter = new PrismaMariaDb({

  host: process.env.MYSQL_HOST!,
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,
  port: Number(process.env.MYSQL_PORT),

  connectionLimit: 5,

});


export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });


if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}