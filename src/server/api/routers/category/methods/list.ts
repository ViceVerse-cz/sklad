import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Category, Prisma } from "@prisma/client";
import { createPaginator } from "prisma-pagination";
import { listCategoriesInput } from "../schema";

const paginate = createPaginator({ perPage: 10 });

export const listCategories = protectedProcedure
  .input(listCategoriesInput)
  .query(async ({ input }) => {
    const categories = await paginate<Category, Prisma.UserFindManyArgs>(
      db.category.findMany,
      {},
      { page: input.page },
    );

    const productCategories = await db.productCategory.findMany({
      where: {
        categoryId: {
          in: categories.data.map((category) => category.id),
        },
      },
    });

    const categoryProductCount = categories.data.map((category) => {
      const productCount = productCategories.filter(
        (productCategory) => productCategory.categoryId === category.id,
      ).length;

      return {
        ...category,
        productCount,
      };
    });

    return {
      ...categories,
      data: categoryProductCount,
    };
  });
