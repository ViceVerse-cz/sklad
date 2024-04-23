import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Visibility } from "@prisma/client";
import { listAllProductsSchema } from "../schema";

export const listAll = protectedProcedure
  .input(listAllProductsSchema)
  .query(async ({ input }) => {
    const products = await db.product.findMany({
      where: { visibility: Visibility.Visible },
    });

    const actions = await db.actionHistory.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
        date: {
          lte: input.dateRange?.to,
          gte: input.dateRange?.from,
        },
        visibility: Visibility.Visible,
      },
    });

    return products.map((product) => {
      const productActions = actions.filter(
        (action) => action.productId === product.id && action.type === "SOLD",
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
