import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";

type Props = {
  productId?: number;
  open?: boolean;
  onClose: VoidFunction;
};

export const StockProduct = ({ productId, open, onClose }: Props) => {
  const { mutateAsync, isLoading } = api.product.stock.useMutation();

  const [count, setCount] = useState(0);

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
          <Input
            onChange={(e) => setCount(Number(e.target.value))}
            value={count}
            id="picture"
            type="number"
          />
        </div>

        <Button onClick={onSell} className="w-fit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Prodat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
