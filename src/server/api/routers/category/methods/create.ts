import { protectedProcedure } from "@/server/api/trpc";
import { createCategorySchema } from "../schema";
import { db } from "@/server/db";

export const createCategory = protectedProcedure
  .input(createCategorySchema)
  .mutation(async ({ input }) => {
    const category = await db.category.create({
      data: {
        name: input.name,
      },
    });

    const productCategories = input.productIds.map((productId) => ({
      productId,
      categoryId: category.id,
    }));

    await db.productCategory.createMany({
      data: productCategories,
    });

    return category;
  });
