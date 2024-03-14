import { protectedProcedure } from "@/server/api/trpc";
import { createCategorySchema } from "../schema";
import { db } from "@/server/db";

export const createCategory = protectedProcedure
  .input(createCategorySchema)
  .mutation(async ({ input }) => {
    return db.category.create({
      data: {
        name: input.name,
        products: {
          connect: input.productIds.map((id) => ({
            id: id,
          })),
        },
      },
    });
  });
