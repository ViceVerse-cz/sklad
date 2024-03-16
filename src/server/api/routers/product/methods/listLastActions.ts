import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { createPaginator } from "prisma-pagination";
import { listAllActionsInput } from "../schema";

const paginate = createPaginator({ perPage: 5 });

export const listLastActions = protectedProcedure
  .input(listAllActionsInput)
  .query(async ({ input }) => {
    return paginate(
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
    );
  });
