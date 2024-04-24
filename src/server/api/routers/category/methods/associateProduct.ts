import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

const AssociateProductsSchema = z.object({
  categoryId: z.number(),
  productIds: z.array(z.number()),
});

export const associateProducts = protectedProcedure
  .input(AssociateProductsSchema)
  .mutation(async ({ input }) => {
    const category = await db.category.findUnique({
      where: { id: Number(input.categoryId) },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const products = await db.product.findMany({
      where: { id: { in: input.productIds } },
    });

    if (products.length !== input.productIds.length) {
      throw new Error("One or more products not found");
    }

    await db.productCategory.createMany({
      data: input.productIds.map((productId) => ({
        categoryId: Number(input.categoryId),
        productId: productId,
      })),
    });
  });
