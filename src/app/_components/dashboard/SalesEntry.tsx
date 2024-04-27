import { Decimal } from "@prisma/client/runtime/library";
import { api } from "@/trpc/react";
import { Action } from "./Action";
import { WarningPopup } from "./WarningPopup";
import { useState } from "react";

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
  price?: number;
}

export function SalesEntry({
  actions,
  onRefetch,
}: {
  actions: ActionHistory[];
  onRefetch: VoidFunction;
}) {
  const [warningOpen, setWarningOpen] = useState(false);
  const toggleWarningOpen = () => {
    setWarningOpen((prev) => !prev);
  };

  const { mutate: deleteAction } = api.product.deleteAction.useMutation();
  const [deletingAction, setDeletingAction] = useState<ActionHistory | null>(
    null,
  );
  const handleDeleteOpen = (action: ActionHistory) => {
    setDeletingAction(action);
    toggleWarningOpen();
  };
  const handleDelete = async () => {
    if (deletingAction) {
      toggleWarningOpen();

      await deleteAction(deletingAction?.id);
      onRefetch();
    }
  };

  return (
    <>
      {actions.length === 0 && "Nenalezeny žádné produkty"}
      {actions.map((item: ActionHistory) => (
        <Action item={item} handleDelete={handleDeleteOpen} />
      ))}

      <WarningPopup
        text="Opravdu chcete smazat tuto akci?"
        open={warningOpen}
        onClose={toggleWarningOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
