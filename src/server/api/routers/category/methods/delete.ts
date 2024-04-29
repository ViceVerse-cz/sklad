import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteCategoriesSchema } from "../schema";

export const deleteCategories = protectedProcedure.input(deleteCategoriesSchema).mutation(async ({ input }) => {
  const products = await db.productCategory.findMany({
    where: {
      categoryId: input,
    },
    select: {
      productId: true,
    },
  });
  await db.product.updateMany({
    where: {
      id: {
        in: products.map((product) => product.productId),
      },
    },
    data: {
      visibility: "Hidden",
    },
  });
  return db.category.delete({
    where: {
      id: input,
    },
  });
});
