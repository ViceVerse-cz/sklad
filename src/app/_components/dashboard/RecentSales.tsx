"use client";
import { Button } from "@/components/ui/button";
import { ActionHistory, SalesEntry } from "./SalesEntry";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

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
  const [_, setTotalCount] = useState<number>(0);

  const { data } = api.product.listLastActions.useQuery(
    { page },
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
    <div className="h-[400px] space-y-8 overflow-y-auto">
      <SalesEntry actions={actions} />
      {showLoadMoreButton && <Button onClick={loadMore}>Načíst více</Button>}
    </div>
  );
}
