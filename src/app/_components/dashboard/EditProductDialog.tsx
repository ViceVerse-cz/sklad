import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { RxTrash } from "react-icons/rx";
import { useState } from "react";
import { WarningPopup } from "./WarningPopup";

type EditProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct?: Product | null;
  onChangeProduct: (field: "name" | "price", value: string | number) => void;
  onEditProduct: () => void;
  onDeleteProduct: () => void;
};

export const EditProductDialog = ({
  open,
  onOpenChange,
  editingProduct,
  onChangeProduct,
  onEditProduct,
  onDeleteProduct,
}: EditProductDialogProps) => {
  const [warningOpen, setWarningOpen] = useState(false);
  const toggleWarningOpen = () => setWarningOpen((prev) => !prev);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Upravit produkt</DialogTitle>
        <Input
          onChange={(e) => onChangeProduct("name", e.target.value)}
          defaultValue={editingProduct?.name}
          type="text"
          label="Jméno"
        />

        <Input
          onChange={(e) => onChangeProduct("price", Number(e.target.value))}
          defaultValue={String(editingProduct?.price)}
          type="number"
          label="Cena"
        />

        <div className="flex flex-row gap-2">
          <Button onClick={() => onOpenChange(false)}>Zrušit</Button>
          <Button onClick={onEditProduct}>Upravit</Button>
          <Button onClick={toggleWarningOpen} variant="destructive">
            <RxTrash />
          </Button>
        </div>
      </DialogContent>

      <WarningPopup
        text="Opravdu chcete smazat tento produkt?"
        open={warningOpen}
        onClose={toggleWarningOpen}
        onConfirm={() => {
          onDeleteProduct();
          toggleWarningOpen();
        }}
      />
    </Dialog>
  );
};
