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
    <div key={item.id} className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>{item.type === "RESTOCK" ? "+" : "-"}</AvatarFallback>
      </Avatar>

      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {item.product.name || "Neznámý produkt"}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatDescription(item)} ({Number(item.product.price)} Kč - kus)
        </p>
      </div>

      {handleDelete && (
        <div className="ml-auto font-medium">
          {Number(item.product.price) * item.quantity} Kč
          <Button
            className="ml-4 rounded px-2 py-1"
            onClick={() => handleDelete?.(item)}
          >
            Smazat
            <RxTrash />
          </Button>
        </div>
      )}
    </div>
  );
};
