import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { addProductSchema } from "../schema";

export const addProduct = protectedProcedure
  .input(addProductSchema)
  .mutation(async ({ input }) => {
    const productCategories = input.productIds.map((productId) => ({
      productId,
      categoryId: input.categoryId,
    }));

    await db.productCategory.createMany({
      data: productCategories,
    });
  });
