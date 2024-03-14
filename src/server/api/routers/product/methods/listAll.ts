import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Prisma, Product } from "@prisma/client";
import { createPaginator } from "prisma-pagination";
import { listAllQueryInput } from "../schema";

const paginate = createPaginator({ perPage: 20 });

export const listAll = protectedProcedure
  .input(listAllQueryInput)
  .query(async ({ input }) => {
    return paginate<Product, Prisma.UserFindManyArgs>(
      db.product,
      {},
      { page: input },
    );
  });
