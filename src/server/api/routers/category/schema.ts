import { z } from "zod";

export const addProductSchema = z.object({
  categoryId: z.number(),
  productIds: z.array(z.number()),
});

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export const deleteCategoriesSchema = z.array(z.number());
