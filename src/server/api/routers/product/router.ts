import { createTRPCRouter } from "../../trpc";

import { createProduct } from "./methods/create";
import { deleteProduct } from "./methods/delete";
import { listAll } from "./methods/listAll";
import { stockProducts } from "./methods/stock";

export const productRouter = createTRPCRouter({
  delete: deleteProduct,
  create: createProduct,
  stock: stockProducts,
  listAll: listAll,
});
