"use client";

import { Button } from "@/components/ui/button";
import { RxDownload, RxPencil2, RxReload, RxUpload, RxTrash, RxCalendar } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";
import { RestockProduct } from "../productList/RestockProduct";
import { StockProduct } from "../productList/StockProduct";
import { WarningPopup } from "./WarningPopup";
import { ProductHistoryDialog } from "../productList/ProductHistoryDialog";

type Props = {
  categoryId: number;
  data:
    | {
        products: (Product & {
          soldCount: number;
          soldPrice: number;
        })[];
      }
    | undefined;
  onRefetch: VoidFunction;
  onSetEditingProduct: (product: Product) => void;
};

export const CategoryProductsTable = ({ data, onRefetch, onSetEditingProduct }: Props) => {
  const [restock, setRestock] = useState(false);
  const [stock, setStock] = useState(false);
  const [productId, setProductId] = useState<number | undefined>();
  const [historyProductId, setHistoryProductId] = useState<number | undefined>();

  const [warningOpen, setWarningOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | undefined>();
  const toggleWarningOpen = () => setWarningOpen((prev) => !prev);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const isSelectedId = (id: number) => selectedIds.includes(id);

  const { mutateAsync: deleteManyProducts, isLoading } = api.product.deleteMany.useMutation();
  const { mutateAsync: deleteProduct } = api.product.delete.useMutation();
  const onDeleteSelected = async () => {
    await deleteManyProducts(selectedIds);
    setSelectedIds([]);
    onRefetch();
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead className="w-[100px]">Jméno</TableHead>
            <TableHead>Cena</TableHead>
            <TableHead>Počet</TableHead>
            <TableHead>Celkem prodáno</TableHead>
            <TableHead>Celkem prodáno za</TableHead>
            <TableHead>
              {selectedIds.length > 0 && (
                <Button
                  {...(isLoading && { disabled: true })}
                  className="flex flex-row gap-2"
                  onClick={onDeleteSelected}
                >
                  {isLoading && <RxReload className="animate-spin" />}
                  Smazat vybrané
                </Button>
              )}
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
              <TableCell>{String(product.price)} Kč</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.soldCount}</TableCell>
              <TableCell>{product.soldPrice} Kč</TableCell>
              <TableCell className="flex flex-row gap-1.5">
                <Button
                  className="flex w-fit flex-row gap-1.5"
                  onClick={() => onSetEditingProduct(product)}
                  variant="secondary"
                >
                  <RxPencil2 />
                  <p>Upravit</p>
                </Button>

                <div className="flex flex-row gap-2">
                  <Button
                    onClick={() => {
                      setProductId(product.id);
                      setStock(!stock);
                    }}
                    variant="outline"
                    className="flex flex-row gap-2"
                  >
                    <RxUpload /> Prodat
                  </Button>

                  <Button
                    onClick={() => {
                      setProductId(product.id);
                      setRestock(!restock);
                    }}
                    variant="outline"
                    className="flex flex-row gap-2"
                  >
                    <RxDownload /> Doskladnit
                  </Button>

                  <Button
                    onClick={() => {
                      setDeleteProductId(product.id);
                      toggleWarningOpen();
                    }}
                    variant="outline"
                    className="flex flex-row gap-2"
                  >
                    <RxTrash /> Smazat
                  </Button>

                  <Button
                    onClick={() => setHistoryProductId(product.id)}
                    variant="outline"
                    className="flex flex-row gap-2"
                  >
                    <RxCalendar /> Historie
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductHistoryDialog
        productId={historyProductId}
        onClose={() => setHistoryProductId(undefined)}
        dateRange={undefined}
      />
      <RestockProduct
        productId={productId}
        open={restock}
        onClose={() => {
          onRefetch();
          setRestock(false);
        }}
      />
      <StockProduct
        actualQuantity={data?.products.find((el) => el.id === productId)?.quantity ?? 0}
        productId={productId}
        open={stock}
        onClose={() => {
          onRefetch();
          setStock(false);
        }}
      />
      <WarningPopup
        text="Opravdu chcete smazat tento produkt?"
        open={warningOpen}
        onClose={toggleWarningOpen}
        onConfirm={async () => {
          if (deleteProductId) {
            await deleteProduct(deleteProductId);
            setDeleteProductId(undefined);
            toggleWarningOpen();
            onRefetch();
          }
        }}
      />
    </div>
  );
};
