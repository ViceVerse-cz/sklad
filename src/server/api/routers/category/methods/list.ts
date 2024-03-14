import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Category, Prisma } from "@prisma/client";
import { createPaginator } from "prisma-pagination";
import { listCategoriesInput } from "../schema";

const paginate = createPaginator({ perPage: 10 });

export const listCategories = protectedProcedure
  .input(listCategoriesInput)
  .query(({ input }) => {
    return paginate<Category, Prisma.UserFindManyArgs>(
      db.category,
      {},
      { page: input.page },
    );
  });
