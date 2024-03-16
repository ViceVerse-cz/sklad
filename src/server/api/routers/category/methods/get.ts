import { protectedProcedure } from "@/server/api/trpc";
import { getCategorySchema } from "../schema";
import { db } from "@/server/db";

export const getCategory = protectedProcedure
  .input(getCategorySchema)
  .query(async ({ input }) => {
    const productCategories = await db.productCategory.findMany({
      where: {
        categoryId: input,
      },
      include: {
        product: true,
      },
    });

    const category = await db.category.findFirst({
      where: {
        id: input,
      },
    });

    return {
      category: category,
      products: productCategories.map(
        (productCategory) => productCategory.product,
      ),
    };
  });
