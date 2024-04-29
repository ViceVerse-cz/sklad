import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteProductSchema } from "../schema";
import { Visibility } from "@prisma/client";

export const deleteProduct = protectedProcedure
  .input(deleteProductSchema)
  .mutation(async ({ input }) => {
    const product = await db.product.update({
      where: {
        id: input,
      },
      data: {
        visibility: Visibility.Hidden,
      },
    });
   
    await db.actionHistory.updateMany({
      where: {
        productId: input,
      },
      data: {
        visibility: Visibility.Hidden,
      },
    });

    return product;
  });
