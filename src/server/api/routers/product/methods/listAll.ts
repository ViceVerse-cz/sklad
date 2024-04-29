import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { ProductCategory, Visibility } from "@prisma/client";
import { listAllProductsSchema } from "../schema";

export const listAll = protectedProcedure.input(listAllProductsSchema).query(async ({ input }) => {
  const products = await db.product.findMany({
    where: { visibility: Visibility.Visible },
  });

  const actions = await db.actionHistory.findMany({
    where: {
      productId: {
        in: products.map((product) => product.id),
      },
      date: {
        gte: input.dateRange?.from,
        lt: input.dateRange?.to ? new Date(input.dateRange.to.setHours(24, 0, 0)) : undefined,
      },
      visibility: Visibility.Visible,
    },
  });

  let productCategories: ProductCategory[] | undefined;
  if (input.notShowAssociatedCategoryId) {
    productCategories = await db.productCategory.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
        categoryId: input.notShowAssociatedCategoryId,
      },
    });
  }

  return products
    .map((product) => {
      const productActions = actions.filter(
        (action) => action.productId === product.id && action.type === "SOLD" && action.visibility === "Visible",
      );
      const soldCount = productActions.reduce((acc, action) => acc + action.quantity, 0);
      const soldPrice = productActions.reduce(
        (acc, action) => acc + action.quantity * (action.price ?? product.price),
        0,
      );

      return {
        ...product,
        soldCount,
        soldPrice,
      };
    })
    .filter((product) => {
      if (!productCategories) {
        return true;
      }
      return !productCategories.some((productCategory) => productCategory.productId === product.id);
    });
});
