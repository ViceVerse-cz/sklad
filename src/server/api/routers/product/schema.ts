import { ActionType } from "@prisma/client";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  defaultQuantity: z.number(),
  defaultCategoryId: z.number(),
});

export const deleteProductSchema = z.number();

export const stockProductsSchema = z.object({
  id: z.number(),
  quantity: z.number().min(1),
  type: z.nativeEnum(ActionType),
});

export const listAllQueryInput = z.number().min(1);

export const listAllActionsInput = z.object({
  page: z.number().min(1),
  from: z.date().optional(),
  to: z.date().optional(),
});

export const listActionsInput = z.object({
  page: z.number().min(1),
  productId: z.number(),
});

export const deleteManySchema = z.array(z.number());

export const editProductSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  price: z.number().optional(),
});
