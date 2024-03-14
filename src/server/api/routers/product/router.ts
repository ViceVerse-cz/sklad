import { createTRPCRouter } from "../../trpc";

import { createProduct } from "./methods/create";
import { deleteProduct } from "./methods/delete";

export const productRouter = createTRPCRouter({
  delete: deleteProduct,
  create: createProduct,
});
