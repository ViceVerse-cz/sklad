import { ActionType } from "@prisma/client";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  defaultQuantity: z.number(),
  defaultCategoryIds: z.array(z.number()).default([]),
});

export const deleteProductSchema = z.number();

export const stockProductsSchema = z.object({
  id: z.number(),
  quantity: z.number().min(1),
  type: z.nativeEnum(ActionType),
});

export const listAllQueryInput = z.number().min(1);

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
