import { protectedProcedure } from "@/server/api/trpc";
import { getCategorySchema } from "../schema";
import { db } from "@/server/db";
import { Visibility } from "@prisma/client";

export const getCategory = protectedProcedure.input(getCategorySchema).query(async ({ input }) => {
  const productCategories = await db.productCategory.findMany({
    where: {
      categoryId: input,
      product: {
        visibility: Visibility.Visible,
      },
    },
    include: {
      product: true,
    },
  });

  const productActions = await db.actionHistory.findMany({
    where: {
      visibility: Visibility.Visible,
      productId: {
        in: productCategories.map((productCategory) => productCategory.productId),
      },
    },
  });

  const category = await db.category.findFirst({
    where: {
      id: input,
    },
  });

  const productsCounted = productCategories.map((productCategory) => {
    const actions = productActions
      .filter((productAction) => productAction.productId === productCategory.productId)
      .filter((item) => item.type === "SOLD");

    return {
      ...productCategory.product,
      soldCount: actions.reduce((acc, action) => acc + action.quantity, 0),
      soldPrice: actions.reduce((acc, action) => acc + action.quantity * Number(action.price), 0),
    };
  });

  return {
    category: category,
    products: productsCounted,
  };
});
