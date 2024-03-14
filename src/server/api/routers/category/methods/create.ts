import { protectedProcedure } from "@/server/api/trpc";
import { createCategorySchema } from "../schema";

export const createCategory = protectedProcedure
  .input(createCategorySchema)
  .mutation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return "Nigga!";
  });
