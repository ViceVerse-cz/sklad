import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  onClose: VoidFunction;
  open?: boolean;
};

export const StockModal = ({ onClose, open }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => (open === false ? onClose() : () => {})}
    >
      <DialogContent>
        <h1>{type === "restock" ? "Doskladnit" : "Prodat"}</h1>
        <p>
          {type === "restock"
            ? "Chystáte se doskladnit produkt"
            : "Chystáte se prodat produkt"}
        </p>
      </DialogContent>
    </Dialog>
  );
};
