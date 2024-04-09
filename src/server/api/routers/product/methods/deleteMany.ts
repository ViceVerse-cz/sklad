import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteManySchema } from "../schema";
import { Visibility } from "@prisma/client";

export const deleteMany = protectedProcedure
  .input(deleteManySchema)
  .mutation(async ({ input }) => {
    return db.product.updateMany({
      where: {
        id: {
          in: input,
        },
      },
      data: {
        visibility: Visibility.Hidden
      }
    });
  });
