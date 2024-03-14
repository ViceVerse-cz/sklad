import { protectedProcedure } from "@/server/api/trpc";
import { createProductSchema } from "../schema";
import { db } from "@/server/db";

export const createProduct = protectedProcedure
  .input(createProductSchema)
  .mutation(async ({ input }) => {
    const product = await db.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.defaultQuantity,
      },
    });

    const productCategories = input.defaultCategoryIds.map((categoryId) => ({
      productId: product.id,
      categoryId,
    }));

    await db.productCategory.createMany({
      data: productCategories,
    });

    return product;
  });
