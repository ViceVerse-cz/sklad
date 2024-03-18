import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { createPaginator } from "prisma-pagination";
import { listAllActionsInput } from "../schema";
import { ActionHistory } from "@prisma/client";

type PaginatedResult<T> = {
  items: T[];
  meta: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
};

const paginate = createPaginator({ perPage: 5 });

export const listLastActions = protectedProcedure
  .input(listAllActionsInput)
  .query(async ({ input }) => {
    const [totalCount, result] = await Promise.all([
      db.actionHistory.count(),
      paginate(
        db.actionHistory,
        {
          orderBy: {
            date: "desc",
          },
          include: {
            product: true,
          }
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
