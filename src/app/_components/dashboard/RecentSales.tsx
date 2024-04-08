"use client";

import { Button } from "@/components/ui/button";
import { ActionHistory, SalesEntry } from "./SalesEntry";
import { api } from "@/trpc/react";
import { useState } from "react";
import { DateRangePicker } from "@/components/ui/daterangePicker";
import { DateRange } from "react-day-picker";

type PaginatedResult<T> = {
  items: T[];
  meta: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
};

export function RecentSales() {
  const [page, setPage] = useState(1);
  const [actions, setActions] = useState<ActionHistory[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [_, setTotalCount] = useState<number>(0);

  const onDateChange = (date: DateRange | undefined) => {
    setActions([]);
    setPage(1);
    setDateRange(date);
  };

  const { data } = api.product.listLastActions.useQuery(
    { page, from: dateRange?.from, to: dateRange?.to },
    {
      enabled: page > 0,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      onSuccess: (data: PaginatedResult<ActionHistory>) => {
        setActions((prevActions) => [...prevActions, ...data.items]);
        setTotalCount(data.meta.total);
      },
    },
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showLoadMoreButton = page < (data?.meta.totalPages ?? 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2">
        <DateRangePicker
          value={dateRange}
          placeholder="Filtrovat podle data"
          onValueChange={onDateChange}
        />
      </div>

      <div className="h-[250px] space-y-8 overflow-y-auto">
        <SalesEntry actions={actions} />
      </div>

      {showLoadMoreButton && (
        <Button className="w-fit" onClick={loadMore}>
          Načíst více
        </Button>
      )}
    </div>
  );
}
