import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { createPaginator } from "prisma-pagination";
import { listAllActionsInput } from "../schema";
import { ActionHistory, Visibility } from "@prisma/client";

const paginate = createPaginator({ perPage: 5 });

export const listLastActions = protectedProcedure.input(listAllActionsInput).query(async ({ input }) => {
  const [totalCount, result] = await Promise.all([
    db.actionHistory.count(),
    paginate(
      db.actionHistory,
      {
        orderBy: {
          date: "desc",
        },
        where: {
          date: {
            gte: input.from,
            lt: input.to ? new Date(input.to.setHours(24, 0, 0)) : undefined,
          },
          visibility: Visibility.Visible,
        },
        include: {
          product: true,
        },
      },
      { page: input.page },
    ),
  ]);

  const totalPages = Math.ceil(totalCount / result.meta.perPage);

  return {
    items: result.data as ActionHistory[],
    meta: {
      total: totalCount,
      totalPages,
      currentPage: input.page,
      perPage: result.meta.perPage,
      prev: input.page > 1 ? input.page - 1 : null,
      next: input.page < totalPages ? input.page + 1 : null,
    },
  };
});
