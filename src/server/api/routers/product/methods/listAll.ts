import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { listAllQueryInput } from "../schema";

export const listAll = protectedProcedure.query(async () => {
  return db.product.findMany();
});
