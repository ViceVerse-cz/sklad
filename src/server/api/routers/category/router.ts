import { createTRPCRouter } from "../../trpc";

import { createCategory } from "./methods/create";
import { addProduct } from "./methods/addProduct";
import { deleteCategories } from "./methods/delete";
import { listCategories } from "./methods/list";
import { getCategory } from "./methods/get";

export const categoryRouter = createTRPCRouter({
  createCategory,
  addProduct,
  deleteCategories,
  listCategories,
  getCategory,
});
