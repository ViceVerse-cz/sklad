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
import { RxDownload, RxUpload } from "react-icons/rx";
import { StockProduct } from "./StockProduct";
import { RestockProduct } from "./RestockProduct";
import { useState } from "react";
import { Visibility } from "@prisma/client";

export const AllProductsTable = () => {
  const { data: products, refetch: refetchProducts } =
    api.product.listAll.useQuery();

  const [restock, setRestock] = useState(false);
  const [stock, setStock] = useState(false);
  const [productId, setProductId] = useState<number | undefined>();
  console.log(products)

  return (
    <div>
      <StockProduct
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
          {products?.filter((product) => product.visibility === Visibility.Visible).map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{String(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.soldCount}</TableCell>
              <TableCell>{product.soldPrice} CZK</TableCell>
              <TableCell>
                <div className="flex flex-row gap-3">
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
