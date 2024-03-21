import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Decimal } from "@prisma/client/runtime/library";

export enum ActionType {
  RESTOCK = "RESTOCK",
  SOLD = "SOLD",
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: Decimal;
  quantity: number;
  actions: ActionHistory[];
  productCategories: ProductCategory[];
}
export interface Category {
  id: number;
  name: string;
  productCategories: ProductCategory[];
}

export interface ProductCategory {
  productId: number;
  categoryId: number;
  product: Product;
  category: Category;
}

export interface ActionHistory {
  id: number;
  type: ActionType;
  quantity: number;
  date: Date;
  product: Product;
  productId: number;
}

export function SalesEntry({ actions }: { actions: ActionHistory[] }) {
  return (
    <>
      {actions.map((item: ActionHistory) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {item.type === "RESTOCK" ? "+" : "-"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.product.description || "Neznámý produkt"}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.type === "RESTOCK" ? `Doplněno dne ${item.date.getDate()}/${item.date.getMonth() + 1}/${item.date.getFullYear()}` : `Prodáno dne ${item.date.getDate()}/${item.date.getMonth() + 1  }/${item.date.getFullYear()}`} 
            </p>
          </div>
          <div className="ml-auto font-medium">{item.quantity}</div>
        </div>
      ))}
    </>
  );
}
