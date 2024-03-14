import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  defaultQuantity: z.number(),
  defaultCategoryIds: z.array(z.number()).default([]),
});

export const createProduct = protectedProcedure
  .input(createSchema)
  .mutation(async ({ input }) => {
    return db.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        quantity: input.defaultQuantity,
        categories: {
          connect: input.defaultCategoryIds.map((id) => ({
            id,
          })),
        },
      },
    });
  });
