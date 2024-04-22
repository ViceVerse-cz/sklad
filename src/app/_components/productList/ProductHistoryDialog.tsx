import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useRef, useState } from "react";
import { Action } from "../dashboard/Action";
import { ActionHistory } from "../dashboard/SalesEntry";
import { Button } from "@/components/ui/button";
import { PaginatedResult } from "prisma-pagination";

type Props = {
  productId?: number | undefined;
  onClose: () => void;
};

export const ProductHistoryDialog = ({ productId, onClose }: Props) => {
  const scrollableContainer = useRef<HTMLDivElement>(null);

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

  const { data, isLoading: actionsLoading } = api.product.listActions.useQuery(
    {
      productId: productId ?? 0,
      page,
    },
    {
      onSuccess: onLoadMoreProducts,
    },
  );

  return (
    <Dialog open={!!productId} onOpenChange={onOpenChange}>
      <DialogContent>
        <h1 className="mt-[-10px] text-xl font-bold">Historie produktu</h1>

        <div ref={scrollableContainer} className="h-80 overflow-scroll">
          <div className="mt-7 flex flex-col gap-7 overflow-scroll">
            {actions.map((item) => (
              <Action item={item as ActionHistory} />
            ))}
          </div>
        </div>

        {data?.meta.next && (
          <Button
            className="mt-4 w-fit"
            type="button"
            onClick={increasePage}
            disabled={actionsLoading}
          >
            {actionsLoading ? "Načítám..." : "Načíst další"}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};