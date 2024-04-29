import { protectedProcedure } from "@/server/api/trpc";
import { createCategorySchema } from "../schema";
import { db } from "@/server/db";

export const createCategory = protectedProcedure.input(createCategorySchema).mutation(({ input }) => {
  return db.category.create({
    data: {
      name: input.name,
      productCategories: {
        create: input.productIds.map((productId) => ({
          product: {
            connect: { id: productId },
          },
        })),
      },
    },
  });
});
