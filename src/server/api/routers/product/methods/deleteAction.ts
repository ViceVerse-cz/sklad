import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { deleteProductSchema } from "../schema";
import { Visibility } from "@prisma/client";

export const deleteAction = protectedProcedure.input(deleteProductSchema).mutation(async ({ input }) => {
  return db.actionHistory.update({
    where: {
      id: input,
    },
    data: {
      visibility: Visibility.Hidden,
    },
  });
});
