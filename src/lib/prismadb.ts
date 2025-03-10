import { PrismaClient } from "@prisma/client";

const client =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
