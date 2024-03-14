import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { createProductSchema } from "../schema";

export const createProduct = protectedProcedure
  .input(createProductSchema)
  .mutation(async ({ input }) => {
    return db.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.defaultQuantity,
        categories: {
          connect: input.defaultCategoryIds.map((id) => ({
            id,
          })),
        },
      },
    });
  });
