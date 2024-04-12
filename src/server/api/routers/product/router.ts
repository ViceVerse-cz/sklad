import { createTRPCRouter } from "../../trpc";

import { createProduct } from "./methods/create";
import { deleteProduct } from "./methods/delete";
import { deleteAction } from "./methods/deleteAction";
import { listActions } from "./methods/listActions";
import { listAll } from "./methods/listAll";
import { listLastActions } from "./methods/listLastActions";
import { stockProducts } from "./methods/stock";
import { getMonthlySales } from "./methods/getMonths";
import { deleteMany } from "./methods/deleteMany";
import { editProduct } from "./methods/edit";

export const productRouter = createTRPCRouter({
  delete: deleteProduct,
  deleteAction: deleteAction,
  create: createProduct,
  stock: stockProducts,
  listAll: listAll,
  listActions: listActions,
  listLastActions: listLastActions,
  getMonths: getMonthlySales,
  deleteMany: deleteMany,
  edit: editProduct,
});
