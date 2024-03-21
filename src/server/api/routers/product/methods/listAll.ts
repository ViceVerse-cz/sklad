import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const listAll = protectedProcedure.query(async () => {
  const products = await db.product.findMany();

  const actions = await db.actionHistory.findMany({
    where: {
      productId: {
        in: products.map((product) => product.id),
      },
    },
  });

  return products.map((product) => {
    const productActions = actions.filter(
      (action) => action.productId === product.id,
    );

    const soldCount = productActions.reduce(
      (acc, action) => acc + action.quantity,
      0,
    );

    const soldPrice = productActions.reduce(
      (acc, action) =>
        acc + action.quantity * Number(action.price ?? product.price),
      0,
    );

    return {
      ...product,
      soldCount,
      soldPrice,
    };
  });
});
