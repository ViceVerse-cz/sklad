"use client";

import { StatCard } from "@/app/_components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { RxAccessibility, RxAlignBottom, RxPencil2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { Product } from "@prisma/client";
import { CategoryProductsTable } from "@/app/_components/dashboard/CategoryProductsTable";

export default async function Page({ params }: { params: { id: string } }) {
  const { mutateAsync: editProduct } = api.product.edit.useMutation();

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const changeProduct = <T,>(
    property: keyof Product & string,
    value: T,
  ): void => {
    if (!editingProduct) return;

    setEditingProduct({
      ...editingProduct,
      [property]: value,
    });
  };
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
          additionalContent={<Button variant="outline">Doskladnit</Button>}
          onAdditionalContentClick={() => alert("doskladnit")}
          Icon={RxAccessibility}
          title="Počet doskladnění"
          value={stats?.totalRestock}
        />
        <StatCard
          Icon={RxPencil2}
          title="Počet produktů"
          value={stats?.totalProducts}
        />
        <StatCard
          Icon={RxAlignBottom}
          title="Počet prodejů"
          value={stats?.totalSales}
          additionalContent={<Button variant="outline">Prodat</Button>}
          onAdditionalContentClick={() => alert("prodat")}
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
            onChange={(e) => changeProduct("name", e.target.value)}
            defaultValue={editingProduct?.name}
            type="text"
            label="Jméno"
          />

          <Input
            onChange={(e) => changeProduct("price", Number(e.target.value))}
            defaultValue={String(editingProduct?.price)}
            type="number"
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
