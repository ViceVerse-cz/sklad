import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { useEffect } from "react";

type FormData = Exclude<keyof Product, "id">;

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creatingProduct?: Omit<Product, "id"> | null;
  onAddProduct: (field: FormData, value: string | number) => void;
  onCreateProduct: () => void;
};

export const AddProductDialog = ({
  open,
  onOpenChange,
  creatingProduct,
  onAddProduct,
  onCreateProduct,
}: AddProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Přidat produkt</DialogTitle>
        <Input
          onChange={(e) => onAddProduct("name", String(e.target.value))}
          defaultValue={creatingProduct?.name}
          type="text"
          label="Jméno"
        />
        <Input
          onChange={(e) => onAddProduct("price", Number(e.target.value))}
          defaultValue={String(creatingProduct?.price)}
          type="number"
          label="Cena"
        />
        <Input
          onChange={(e) => onAddProduct("quantity", Number(e.target.value))}
          defaultValue={String(creatingProduct?.quantity)}
          type="number"
          label="Počet"
        />
        <Input
          onChange={(e) => onAddProduct("description", String(e.target.value))}
          type="text"
          label="Popis"
        />
        <div className="flex flex-row gap-2">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Zrušit
          </Button>

          <Button onClick={onCreateProduct}>Přidat</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
