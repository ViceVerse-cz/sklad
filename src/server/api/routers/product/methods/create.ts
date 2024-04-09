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
    
    await db.productCategory.createMany({
      data: [
        {
          productId: product.id,
          categoryId: input.defaultCategoryId,
        },
      ],
    });

    return product;
  });