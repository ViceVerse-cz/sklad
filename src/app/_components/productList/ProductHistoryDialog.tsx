import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Suspense, useRef, useState } from "react";
import { Action } from "../dashboard/Action";
import { ActionHistory } from "../dashboard/SalesEntry";
import { Button } from "@/components/ui/button";
import { PaginatedResult } from "prisma-pagination";
import { api } from "@/trpc/react";
import { DateRange } from "react-day-picker";
import { WarningPopup } from "../dashboard/WarningPopup";

type Props = {
  productId?: number | undefined;
  onClose: () => void;
  dateRange: DateRange | undefined;
};

export const ProductHistoryDialog = ({ productId, onClose, dateRange }: Props) => {
  const scrollableContainer = useRef<HTMLDivElement>(null);
  const [warningOpen, setWarningOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [actions, setActions] = useState<ActionHistory[]>([]);

  const onOpenChange = (state: boolean) => {
    if (!state && productId) {
      onClose();
      setPage(1);
      setActions([]);
    }
  };

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scrollContainer = () => {
    setTimeout(() => {
      if (scrollableContainer.current) {
        scrollableContainer.current.scrollTo({
          top: scrollableContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  const onLoadMoreProducts = (data: PaginatedResult<ActionHistory>) => {
    setActions((prevActions) => [...prevActions, ...data.data]);
    scrollContainer();
  };

  const {
    data,
    isLoading: actionsLoading,
    refetch,
  } = api.product.listActions.useQuery(
    {
      productId: productId ?? 0,
      page,
      dateRange: dateRange,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: onLoadMoreProducts,
    },
  );

  const [deletingAction, setDeletingAction] = useState<ActionHistory | null>(null);
  const handleDeleteOpen = (action: ActionHistory) => {
    setDeletingAction(action);
    setWarningOpen(!warningOpen);
  };

  const { mutateAsync: deleteAction } = api.product.deleteAction.useMutation();

  const handleDeleteAction = async () => {
    if (deletingAction) {
      await deleteAction(deletingAction.id);
      setActions((prevActions) => prevActions.filter((item) => item.id !== deletingAction?.id));
      setWarningOpen(!warningOpen);
    }
  };

  return (
    <Dialog open={!!productId} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[700px]">
        <h1 className="mt-[-10px] text-xl font-bold">Historie produktu</h1>

        <div ref={scrollableContainer} className="h-80 overflow-scroll">
          {!actionsLoading && (
            <>
              {actions.length === 0 && <p className="mt-4">Nenalezena žádná historie</p>}
              <div className="mt-7 flex flex-col gap-7 overflow-scroll">
                {actions.map((item) => (
                  <Action handleDelete={handleDeleteOpen} item={item as ActionHistory} />
                ))}
              </div>
            </>
          )}
        </div>

        {data?.meta.next && (
          <Button className="mt-4 w-fit" type="button" onClick={increasePage} disabled={actionsLoading}>
            {actionsLoading ? "Načítám..." : "Načíst další"}
          </Button>
        )}
      </DialogContent>
      <WarningPopup
        text="Opravdu chcete smazat tuto akci?"
        open={warningOpen}
        onClose={() => setWarningOpen(!warningOpen)}
        onConfirm={handleDeleteAction}
      />
    </Dialog>
  );
};
