import { createTRPCRouter } from "../../trpc";

import { createCategory } from "./methods/create";
import { addProduct } from "./methods/addProduct";
import { deleteCategories } from "./methods/delete";
import { listCategories } from "./methods/list";
import { getCategory } from "./methods/get";
import { getStats } from "./methods/stats";
import { associateProduct } from "./methods/associateProduct";

export const categoryRouter = createTRPCRouter({
  associateProduct,
  createCategory,
  addProduct,
  deleteCategories,
  listCategories,
  getCategory,
  getStats,
});
