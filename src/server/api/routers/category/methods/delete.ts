import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteCategoriesSchema } from "../schema";

export const deleteCategories = protectedProcedure
  .input(deleteCategoriesSchema)
  .mutation(({ input }) => {
    return db.category.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
  });
