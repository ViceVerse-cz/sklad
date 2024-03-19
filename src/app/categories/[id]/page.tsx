"use client";

import { StatCard } from "@/app/_components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { api } from "@/trpc/react";
import { useState } from "react";
import { RxAccessibility, RxAlignBottom, RxPencil2 } from "react-icons/rx";

export default async function Page({ params }: { params: { id: string } }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const isSelectedId = (id: number) => selectedIds.includes(id);

  const { data } = api.category.getCategory.useQuery(parseInt(params.id, 10));
  const { data: stats } = api.category.getStats.useQuery(
    parseInt(params.id, 10),
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{data?.category?.name}</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          Icon={RxAccessibility}
          title="Počet doskladnění"
          value={stats?.totalRestock}
        />
        <StatCard
          Icon={RxPencil2}
          title="Počet produktů"
          value={stats?.totalProducts}
        />
        <StatCard
          Icon={RxAlignBottom}
          title="Počet prodejů"
          value={stats?.totalSales}
        />
      </div>

      <h2 className="text-xl font-semibold">Produkty</h2>
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
              <Button>Delete</Button>
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
                <Button variant="ghost">
                  <RxPencil2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}
