"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { RxCalendar, RxDownload, RxPencil2, RxUpload } from "react-icons/rx";
import { StockProduct } from "./StockProduct";
import { RestockProduct } from "./RestockProduct";
import { useState } from "react";
import { DateRangePicker } from "@/components/ui/daterangePicker";
import { DateRange } from "react-day-picker";
import { ProductHistoryDialog } from "./ProductHistoryDialog";
import { DayPickerProvider } from "react-day-picker";
import { Product } from "@prisma/client";
import { EditProductDialog } from "../dashboard/EditProductDialog";
import { CiWarning } from "react-icons/ci";

export const AllProductsTable = () => {
  const [restock, setRestock] = useState(false);
  const [stock, setStock] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>();

  const [productId, setProductId] = useState<number | undefined>();
  const [historyProductId, setHistoryProductId] = useState<
    number | undefined
  >();

  const [date, setDate] = useState<DateRange | undefined>();

  const { data: products, refetch: refetchProducts } =
    api.product.listAll.useQuery({
      dateRange: date,
    });

  const { mutateAsync: editProduct } = api.product.edit.useMutation();
  const onEditProduct = async () => {
    if (editingProduct) {
      // TODO: Problem with prisma decimal here, not enough time to fit it
      editingProduct.price = Number(editingProduct.price) as any;
      await editProduct(editingProduct as any);
      setEditingProduct(null);
      refetchProducts();
    }
  };
  const onChangeEditProduct = (
    field: "name" | "price",
    value: string | number,
  ) => {
    setEditingProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: field === "price" ? Number(value) : value,
      };
    });
  };
  const onEditOpenChange = (open: boolean) => {
    if (!open) {
      setEditingProduct(null);
    }
  };

  return (
    <div>
      <DayPickerProvider initialProps={{}}>
        <div className="mb-5 flex flex-col gap-2">
          <h3>Vyberte datum</h3>
          <DateRangePicker onValueChange={setDate} value={date} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Jméno</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Počet</TableHead>
              <TableHead>Celkem prodáno</TableHead>
              <TableHead>Celkem prodáno za</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {products?.map(
              (product: Product & { soldCount: number; soldPrice: number }) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{String(product.price)} Kč</TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center justify-center gap-2 align-middle">
                      {product.quantity}
                      {product.quantity < 0 && (
                        <CiWarning size={25} color="red" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.soldCount}</TableCell>
                  <TableCell>{product.soldPrice} Kč</TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-3">
                      <Button
                        onClick={() => setEditingProduct(product)}
                        variant="secondary"
                        className="flex flex-row gap-2"
                      >
                        <RxPencil2 /> Upravit
                      </Button>

                      <Button
                        onClick={() => {
                          setProductId(product.id);
                          setStock(!stock);
                        }}
                        variant="outline"
                        className="flex flex-row gap-2"
                      >
                        <RxUpload />
                        Prodat
                      </Button>

                      <Button
                        onClick={() => {
                          setProductId(product.id);
                          setRestock(!restock);
                        }}
                        variant="outline"
                        className="flex flex-row gap-2"
                      >
                        <RxDownload />
                        Doskladnit
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
              ),
            )}
          </TableBody>
        </Table>

        <EditProductDialog
          open={!!editingProduct}
          onOpenChange={onEditOpenChange}
          editingProduct={editingProduct}
          onChangeProduct={onChangeEditProduct}
          onEditProduct={onEditProduct}
        />
        <ProductHistoryDialog
          productId={historyProductId}
          dateRange={date}
          onClose={() => setHistoryProductId(undefined)}
        />
        <StockProduct
          actualQuantity={
            products?.find((el) => el.id === productId)?.quantity ?? 0
          }
          productId={productId}
          open={stock}
          onClose={() => {
            setStock(false);
            setProductId(undefined);
            refetchProducts();
          }}
        />
        <RestockProduct
          productId={productId}
          open={restock}
          onClose={() => {
            setRestock(false);
            setProductId(undefined);
            refetchProducts();
          }}
        />
      </DayPickerProvider>
    </div>
  );
};
