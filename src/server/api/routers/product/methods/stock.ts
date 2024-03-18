import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { stockProductsSchema } from "../schema";

export const stockProducts = protectedProcedure
  .input(stockProductsSchema)
  .mutation(async ({ input }) => {
    const product = await db.product.findUnique({
      where: {
        id: input.id,
      },
    });

    await db.actionHistory.create({
      data: {
        type: input.type,
        quantity: input.quantity,
        ...(input.type === "SOLD" &&
          product?.price && {
            price: product.price as unknown as number,
          }),
        product: {
          connect: {
            id: input.id,
          },
        },
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
