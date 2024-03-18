import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { addMonths, subMonths } from "date-fns";

export const getMonthlySales = protectedProcedure.query(async () => {
  const currentDate = new Date();
  const startDate = subMonths(currentDate, 11);

  const monthlySales = await db.$queryRaw<
    Array<{ month: string; totalsales: Prisma.Decimal }>
  >`
      SELECT
        TO_CHAR(date_trunc('month', "date"), 'YYYY-MM') AS month,
        SUM(p.price * ah.quantity * CASE WHEN ah.type = 'SOLD' THEN -1 ELSE 1 END) AS totalSales
      FROM "ActionHistory" ah
      JOIN "Product" p ON ah."productId" = p.id
      WHERE ah."date" >= ${startDate.toISOString()}::TIMESTAMP
      GROUP BY month
      ORDER BY month;
    `;

  const months = [];
  let currentMonth = startDate;

  while (currentMonth <= currentDate) {
    const month = currentMonth.toISOString().slice(0, 7);
    const salesData = monthlySales.find((sale) => sale.month === month);
    const totalSales = salesData ? salesData.totalsales : 0;

    months.push({
      month,
      totalSales,
    });
    currentMonth = addMonths(currentMonth, 1);
  }

  return { monthlySales: months };
});
