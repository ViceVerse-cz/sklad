import { protectedProcedure } from "@/server/api/trpc";
import { getCategoryStatsSchema } from "../schema";
import { db } from "@/server/db";

// TODO: Some of the stats will be replace with another ones, this is just for testing
export const getStats = protectedProcedure
  .input(getCategoryStatsSchema)
  .query(async ({ input }) => {
    const totalProducts = await db.productCategory.findMany({
      where: {
        categoryId: input,
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
      totalProducts: totalProducts.length,
      totalSales: actions.filter((action) => action.type === "SOLD").length,
      totalRestock: actions.filter((action) => action.type === "RESTOCK")
        .length,
    };
  });
