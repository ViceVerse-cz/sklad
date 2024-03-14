import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteProductSchema } from "../schema";

export const deleteProduct = protectedProcedure
  .input(deleteProductSchema)
  .mutation(({ input }) => {
    return db.product.delete({
      where: {
        id: input,
      },
    });
  });
