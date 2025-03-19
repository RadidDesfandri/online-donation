import { PrismaClient } from "@prisma/client";

const client =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

client.$use(async (params, next) => {
  const modelsWithTags = ["Donation"];

  if (modelsWithTags.includes(params.model || "")) {
    if (params.action === "create" || params.action === "update") {
      if (params.args.data?.tag) {
        params.args.data.tag = params.args.data.tag.map((t: string) =>
          t.toLowerCase(),
        );
      }
    }
  }

  return next(params);
});

export default client;
