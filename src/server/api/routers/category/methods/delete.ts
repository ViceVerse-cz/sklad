import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export const deleteCategories = protectedProcedure
  .input(z.array(z.number()))
  .mutation(({ input }) => {
    return db.category.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
  });
