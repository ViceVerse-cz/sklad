import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RxTrash } from "react-icons/rx";
import { ActionHistory } from "./SalesEntry";

type Props = {
  handleDelete?: (action: ActionHistory) => void;
  item: ActionHistory;
};

const formatDescription = (item: ActionHistory) => {
  const prefix = item.type === "RESTOCK" ? "Doplněno" : "Prodáno";

  const date = `${item.date.getDate()}/${
    item.date.getMonth() + 1
  }/${item.date.getFullYear()}`;

  return `${prefix} ${item.quantity} kusů dne ${date}`;
};

export const Action = ({ item, handleDelete }: Props) => {
  return (
    <div key={item.id} className="flex flex-row items-center gap-2">
      <div className="flex w-2/3 flex-row gap-1">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>{item.type === "RESTOCK" ? "+" : "-"}</AvatarFallback>
        </Avatar>

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            {item.product.name || "Neznámý produkt"}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDescription(item)}

            {item.type === "SOLD" &&
              `${item.quantity} x ${item.product.price} Kč`}
          </p>
        </div>
      </div>

      {handleDelete && (
        <div className="ml-auto flex flex-row gap-2 font-medium">
          {item.type === "SOLD" && (
            <span className="text-md">
              {(
                Number((item as any).price ?? item.product.price) *
                item.quantity
              ).toFixed(2)}{" "}
              Kč
            </span>
          )}

          <Button
            type="button"
            className="mx-auto mr-0 size-10 rounded bg-red-600 px-2 py-1"
            onClick={() => handleDelete?.(item)}
          >
            <RxTrash size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};
