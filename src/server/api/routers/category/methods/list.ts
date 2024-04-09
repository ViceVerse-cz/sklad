import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const listCategories = protectedProcedure.query(async () => {
  const categories = await db.category.findMany();

  const productCategories = await db.productCategory.findMany({
    where: {
      categoryId: {
        in: categories.map((category) => category.id),
      },
    },
    include:
    {
      product: true
    }
  });

  return categories.map((category) => {
    const productCount = productCategories
      .filter((productCategory) => productCategory.categoryId === category.id)
      .filter((productCategory) => productCategory.product.visibility === 'Visible')
      .length;

    return {
      ...category,
      productCount,
    };
  });

});
