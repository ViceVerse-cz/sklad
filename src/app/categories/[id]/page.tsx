"use client";

import { StatCard } from "@/app/_components/dashboard/StatCard";
import ClientButton from "./ClientButton";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { RxPencil2 } from "react-icons/rx";
import { CategoryProductsTable } from "@/app/_components/dashboard/CategoryProductsTable";
import { useCategory } from "./useCategory";
import { EditProductDialog } from "@/app/_components/dashboard/EditProductDialog";
import { AddProductDialog } from "@/app/_components/dashboard/AddProductDialog";

export default ({ params }: { params: { id: string } }) => {
  const {
    editingProduct,
    setEditingProduct,
    changeProduct,
    onEditProduct,
    creatingProduct,
    setCreatingProduct,
    onCreateProduct,
    addProduct,
    stats,
    data,
    refetchCategory,
  } = useCategory(Number(params.id));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{data?.category?.name}</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          Icon={RxPencil2}
          title="Počet produktů"
          value={stats?.totalProductsCount}
        />
        <StatCard
          Icon={CiInboxIn}
          title="Druhy produktů"
          value={stats?.totalProducts}
        />
        <StatCard
          Icon={CiInboxOut}
          title="Počet prodejů"
          value={stats?.totalSold}
        />
      </div>

      <div className="space-x-6">
        <h2 className="inline-block text-xl font-semibold">Produkty</h2>
        <ClientButton className="inline-block" onClick={setCreatingProduct}>
          Asociovat produkt
        </ClientButton>

        <CategoryProductsTable
          data={data}
          onRefetch={refetchCategory}
          categoryId={Number(params.id)}
          onSetEditingProduct={setEditingProduct}
        />
      </div>

      <AddProductDialog
        open={!!creatingProduct}
        creatingProduct={creatingProduct}
        onOpenChange={(open) => (!open ? setCreatingProduct(undefined) : open)}
        onAddProduct={addProduct}
        onCreateProduct={onCreateProduct}
      />

      <EditProductDialog
        open={!!editingProduct}
        onOpenChange={(open) => (!open ? setEditingProduct(undefined) : open)}
        editingProduct={editingProduct}
        onChangeProduct={changeProduct}
        onEditProduct={onEditProduct}
      />
    </div>
  );
};
