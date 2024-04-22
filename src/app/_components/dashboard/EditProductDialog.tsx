import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/app/_components/Popup/Input";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

type EditProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct?: Product | null;
  onChangeProduct: (field: "name" | "price", value: string | number) => void;
  onEditProduct: () => void;
};

export const EditProductDialog = ({
  open,
  onOpenChange,
  editingProduct,
  onChangeProduct,
  onEditProduct,
}: EditProductDialogProps) => {
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
