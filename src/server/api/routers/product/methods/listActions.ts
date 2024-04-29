import { protectedProcedure } from "@/server/api/trpc";
import { listActionsInput } from "../schema";
import { createPaginator } from "prisma-pagination";
import { db } from "@/server/db";
import { Visibility } from "@prisma/client";

const paginate = createPaginator({ perPage: 7 });

export const listActions = protectedProcedure.input(listActionsInput).query(async ({ input }) => {
  return paginate(
    db.actionHistory,
    {
      orderBy: {
        date: "desc",
      },
      where: {
        productId: input.productId,
        visibility: Visibility.Visible,
        date: {
          gte: input.dateRange?.from,
          lt: input.dateRange?.to ? new Date(input.dateRange.to.setHours(24, 0, 0)) : undefined,
        },
      },
      include: {
        product: true,
      },
    },
    { page: input.page, perPage: 5 },
  );
});
