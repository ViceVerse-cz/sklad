import { protectedProcedure } from "@/server/api/trpc";
import { editProductSchema } from "../schema";
import { db } from "@/server/db";

export const editProduct = protectedProcedure.input(editProductSchema).mutation(({ input }) => {
  return db.product.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      price: input.price,
    },
  });
});
