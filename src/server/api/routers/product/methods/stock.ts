import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { stockProductsSchema } from "../schema";

export const stockProducts = protectedProcedure
  .input(stockProductsSchema)
  .mutation(async ({ input }) => {
    await db.actionHistory.create({
      data: {
        type: input.type,
        quantity: input.quantity,
        product: {
          connect: {
            id: input.id
          }
        }
      },
    });

    return db.product.update({
      where: {
        id: input.id,
      },
      data: {
        quantity: {
          ...(input.type === "RESTOCK"
            ? {
                increment: input.quantity,
              }
            : {
                decrement: input.quantity,
              }),
        },
      },
    });
  });
