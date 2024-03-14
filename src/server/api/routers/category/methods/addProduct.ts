import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

const addProductSchema = z.object({
  categoryId: z.number(),
  productIds: z.array(z.number()),
});

export const addProduct = protectedProcedure
  .input(addProductSchema)
  .mutation(({ input }) => {
    db.category.update({
      where: {
        id: input.categoryId,
      },
      data: {
        products: {
          connect: input.productIds.map((id) => ({
            id,
          })),
        },
      },
    });
  });
