"use client";

import { StatCard } from "@/app/_components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { api } from "@/trpc/react";
import { useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { Product } from "@prisma/client";
import { CategoryProductsTable } from "@/app/_components/dashboard/CategoryProductsTable";

export default async function Page({ params }: { params: { id: string } }) {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { mutateAsync: editProduct, isLoading: isEditingProduct } =
    api.product.edit.useMutation({}, { refetchOnWindowFocus: false, refetchOnMount: false });
  const onEditProduct = async () => {
    if (!editingProduct) return;

    await editProduct({ id: editingProduct.id, name: "new name" });
    setEditingProduct(undefined);
  };

  const { data: stats } = api.category.getStats.useQuery(Number(params.id));
  const { data } = api.category.getCategory.useQuery(Number(params.id));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{data?.category?.name}</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          Icon={RxPencil2}
          title="Počet produktů"
          value={stats?.totalProducts}
        />
        <StatCard
          Icon={CiInboxIn}
          title="Počet doskladnění"
          value={stats?.totalRestock}
        />
        <StatCard
          Icon={CiInboxOut}
          title="Počet prodejů"
          value={stats?.totalSales}
        />
      </div>

      <h2 className="text-xl font-semibold">Produkty</h2>
      <CategoryProductsTable
        categoryId={Number(params.id)}
        onSetEditingProduct={setEditingProduct}
      />

      <Dialog
        open={!!editingProduct}
        onOpenChange={(open) =>
          setEditingProduct(!open ? undefined : editingProduct)
        }
      >
        <DialogContent>
          <DialogTitle>Upravit produkt</DialogTitle>
          <Input
            type="text"
            defaultValue={editingProduct?.name}
            label="Jméno"
          />

          <Input
            type="number"
            defaultValue={String(editingProduct?.price ?? 0)}
            label="Cena"
          />

          <div className="flex flex-row gap-2">
            <Button onClick={() => setEditingProduct(undefined)}>Zrušit</Button>
            <Button onClick={onEditProduct}>Upravit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
