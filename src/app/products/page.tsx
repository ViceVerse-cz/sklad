import { Page } from "../_components/Page";
import { AllProductsTable } from "../_components/ProductList/AllProductsTable";

export default () => {
  return (
    <Page className="space-y-8">
      <h1 className="mt-3 text-4xl font-bold">List produktů</h1>
      <AllProductsTable />
    </Page>
  );
};
