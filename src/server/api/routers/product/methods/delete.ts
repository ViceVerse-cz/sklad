import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export const deleteProduct = protectedProcedure
  .input(z.number())
  .mutation(({ input }) => {
    return db.product.delete({
      where: {
        id: input,
      },
    });
  });
