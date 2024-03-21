"use client"
import { Button } from "@/components/ui/button";
import { RxPencil2, RxReload } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";

type Props = {
  categoryId: number;
  onSetEditingProduct: (product: Product) => void;
};

export const CategoryProductsTable = ({
  categoryId,
  onSetEditingProduct,
}: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const isSelectedId = (id: number) => selectedIds.includes(id);

  const { data, refetch } = api.category.getCategory.useQuery(categoryId);

  const { mutateAsync: deleteManyProducts, isLoading } =
    api.product.deleteMany.useMutation();
  const onDeleteSelected = async () => {
    await deleteManyProducts(selectedIds);
    setSelectedIds([]);
    refetch();
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead className="w-[100px]">Jméno</TableHead>
          <TableHead>Cena</TableHead>
          <TableHead>Počet</TableHead>
          <TableHead>Celkem prodáno</TableHead>
          <TableHead>Celkem prodáno za</TableHead>
          <TableHead>
            <Button
              {...(isLoading && { disabled: true })}
              className="flex flex-row gap-2"
              onClick={onDeleteSelected}
            >
              {isLoading && <RxReload className="animate-spin" />}
              Delete
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isSelectedId(product.id)}
                  onCheckedChange={() => toggleId(product.id)}
                  id="terms"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{String(product.price)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.soldCount}</TableCell>
            <TableCell>{product.soldPrice}</TableCell>
            <TableCell>
              <Button
                onClick={() => onSetEditingProduct(product)}
                variant="ghost"
              >
                <RxPencil2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
