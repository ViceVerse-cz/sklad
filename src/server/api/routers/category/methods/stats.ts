import { protectedProcedure } from "@/server/api/trpc";
import { getCategoryStatsSchema } from "../schema";
import { db } from "@/server/db";
import { Visibility } from "@prisma/client";

export const getStats = protectedProcedure.input(getCategoryStatsSchema).query(async ({ input }) => {
  const totalProducts = await db.productCategory.findMany({
    where: {
      categoryId: input,
      product: {
        visibility: Visibility.Visible,
      },
    },
    select: {
      product: true,
      productId: true,
    },
  });

  const actions = await db.actionHistory.findMany({
    where: {
      productId: {
        in: totalProducts.map((product) => product.productId),
      },
    },
  });

  return {
    totalProductsCount: totalProducts.reduce((prev, curr) => {
      return prev + curr.product.quantity;
    }, 0),
    totalProducts: totalProducts.length,
    totalSold: actions
      .filter((item) => item.type === "SOLD")
      .reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0),
  };
});
