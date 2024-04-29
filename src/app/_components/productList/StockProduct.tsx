import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";

type Props = {
  productId?: number;
  actualQuantity: number;
  open?: boolean;
  onClose: VoidFunction;
};

export const StockProduct = ({ productId, open, actualQuantity, onClose }: Props) => {
  const { mutateAsync, isLoading, error } = api.product.stock.useMutation();
  const [count, setCount] = useState(1);

  const onSell = async () => {
    if (!productId) return;

    await mutateAsync({
      type: "SOLD",
      quantity: count,
      id: productId,
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent>
        <h1 className="text-2xl font-bold">Prodat produkt</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Počet</Label>
          {actualQuantity - count < 0 && (
            <p className="flex flex-row gap-2 text-red-500 transition-all">
              <CiWarning size={23} color="red" className="text-red-500" /> Počet produktů na skladu bude v mínusu
            </p>
          )}
          <Input onChange={(e) => setCount(Number(e.target.value))} value={count} id="picture" type="number" />
          {error && <div className="text-red-500">Číslo musí být větší než 0</div>}
        </div>
        <Button onClick={onSell} className="w-fit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Prodat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
