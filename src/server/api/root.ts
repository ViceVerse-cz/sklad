import { createTRPCRouter } from "@/server/api/trpc";

import { categoryRouter } from "./routers/category/router";
import { productRouter } from "./routers/product/router";

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
