import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

type Props = {
  open?: boolean;
  text: string;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
};

export const WarningPopup = ({ onClose, onConfirm, text, open }: Props) => {
  const onOpenChange = (state: boolean) => {
    if (!state) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <h1 className="text-xl font-bold">Upozornění</h1>
        <p>{text}</p>

        <DialogFooter className="flex flex-row gap-4">
          <Button variant="default" onClick={onConfirm}>
            Ano
          </Button>

          <Button variant="destructive" onClick={onClose}>
            Zrušit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
