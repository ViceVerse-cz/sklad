import { z } from "zod";

export const addProductSchema = z.object({
  categoryId: z.number(),
  productIds: z.array(z.number()),
});

export const createCategorySchema = z.object({
  name: z.string().min(1),
  productIds: z.array(z.number()).default([]),
});

export const deleteCategoriesSchema = z.number();

export const getCategorySchema = z.number();

export const getCategoryStatsSchema = z.number();

export const AssociateProductSchema = z.object({
  categoryId: z.number(),
  productId: z.number(),
});
