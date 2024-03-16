import { Button } from "@/components/ui/button";
import { ActionHistory, SalesEntry } from "./sales-entry";
import { api } from "@/trpc/server";
import { PaginatedResult } from "prisma-pagination";

export async function RecentSales() {
    const actions: PaginatedResult<ActionHistory> = await api.product.listLastActions.query({ page: #put current page here }) as PaginatedResult<ActionHistory>;

    return (
        <div className="space-y-8">
            <SalesEntry actions={actions.data}/>
            <Button>Načíst více</Button>
        </div>
    );
}
