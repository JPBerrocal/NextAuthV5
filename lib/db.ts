import { PrismaClient } from "@prisma/client";

//Global is not affected by hot reload so only one instance of prisma is created during development
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
