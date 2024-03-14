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