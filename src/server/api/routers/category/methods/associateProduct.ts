import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { AssociateProductSchema } from "../schema";

export const associateProduct = protectedProcedure
  .input(AssociateProductSchema)
  .mutation(async ({ input }) => {
    const product = await db.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const category = await db.category.findUnique({
      where: { id: input.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return db.productCategory.create({
      data: {
        product: {
          connect: {
            id: input.productId,
          },
        },
        category: {
          connect: {
            id: input.categoryId,
          },
        },
      },
    });
  });
