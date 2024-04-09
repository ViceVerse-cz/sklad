"use client";
import { StatCard } from "@/app/_components/dashboard/StatCard";
import ClientButton from "./ClientButton";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { RxPencil2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { CategoryProductsTable } from "@/app/_components/dashboard/CategoryProductsTable";
import { useCategory } from "./useCategory";

export default ({ params }: { params: { id: string } }) => {
  const {
    editingProduct,
    setEditingProduct,
    changeProduct,
    onEditProduct,
    createProduct,
    creatingProduct,
    setCreatingProduct,
    onCreateProduct,
    addProduct,
    stats,
    data,
  } = useCategory(Number(params.id));

  console.log(creatingProduct)

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
        <h2 className="text-xl font-semibold inline-block">Produkty</h2>
        <ClientButton className="inline-block" onClick={setCreatingProduct}>Přidat produkt</ClientButton>
        <CategoryProductsTable
          categoryId={Number(params.id)}
          onSetEditingProduct={setEditingProduct}
        />
      </div>

      <Dialog
        open={creatingProduct}
        onOpenChange={(open) => !open ? setCreatingProduct(false) : open}
      >
        <DialogContent>
          <DialogTitle>Přidat produkt</DialogTitle>
          <Input
            onChange={(e) => addProduct("name", String(e.target.value))}
            defaultValue={creatingProduct?.name}
            type="text"
            label="Jméno"
          />

          <Input
            onChange={(e) => addProduct("price", Number(e.target.value))}
            defaultValue={String(creatingProduct?.price)}
            type="number"
            label="Cena"
          />

          <Input
            onChange={(e) => addProduct("quantity", Number(e.target.value))}
            defaultValue={String(creatingProduct?.quantity)}
            type="number"
            label="Počet"
          />

          <Input
            onChange={(e) => addProduct("description", String(e.target.value))}
            type="text"
            label="Popis"
          />

          <div className="flex flex-row gap-2">
            <ClientButton onClick={() => setCreatingProduct(false)}>
              Zrušit
            </ClientButton>
            <ClientButton onClick={onCreateProduct}>Přidat</ClientButton>
          </div>
        </DialogContent>
      </Dialog>
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
            <ClientButton onClick={() => setEditingProduct(undefined)}>
              Zrušit
            </ClientButton>
            <ClientButton onClick={onEditProduct}>Upravit</ClientButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
