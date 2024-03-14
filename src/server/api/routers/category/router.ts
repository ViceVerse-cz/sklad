import { createTRPCRouter } from "../../trpc";

import { createCategory } from "./methods/create";
import { addProduct } from "./methods/addProduct";
import { deleteCategories } from "./methods/delete";

export const categoryRouter = createTRPCRouter({
  createCategory,
  addProduct,
  deleteCategories,
});
