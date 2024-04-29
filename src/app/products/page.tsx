import { AllProductsTable } from "../_components/productList/AllProductsTable";

export default () => {
  return (
    <div className="space-y-8">
      <h1 className="mt-3 text-4xl font-bold">List produktů</h1>
      <AllProductsTable />
    </div>
  );
};
