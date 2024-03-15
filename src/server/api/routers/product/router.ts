import { createTRPCRouter } from "../../trpc";

import { createProduct } from "./methods/create";
import { deleteProduct } from "./methods/delete";
import { listActions } from "./methods/listActions";
import { listAll } from "./methods/listAll";
import { listLastActions } from "./methods/listLastActions";
import { stockProducts } from "./methods/stock";

export const productRouter = createTRPCRouter({
  delete: deleteProduct,
  create: createProduct,
  stock: stockProducts,
  listAll: listAll,
  listActions: listActions,
  listLastActions: listLastActions,
});
