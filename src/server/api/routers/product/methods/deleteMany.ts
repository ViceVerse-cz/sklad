import { protectedProcedure } from "@/server/api/trpc";
import { deleteManySchema } from "../schema";
import { db } from "@/server/db";

export const deleteMany = protectedProcedure
  .input(deleteManySchema)
  .mutation(({ input }) => {
    return db.product.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
  });
