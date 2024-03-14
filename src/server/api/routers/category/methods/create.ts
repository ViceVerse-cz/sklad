import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const createCategory = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
    }),
  )
  .mutation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return "Nigga!";
  });
