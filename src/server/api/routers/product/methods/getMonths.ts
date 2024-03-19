import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { addMonths, subMonths, formatDate } from "date-fns";
import { cs } from "date-fns/locale";

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
    let month = currentMonth.toISOString().slice(0, 7)
    const salesData = monthlySales.find((sale) => sale.month === month);
    const totalSales = salesData ? salesData.totalsales : new Decimal(0);
    month = formatDate(currentMonth, "MMMM", {locale: cs})
    .substring(0, 3)
    .split('')
    .map((char, index) => {
        return index === 0 ? char.toUpperCase() : char;
    })
    .join('');
    
    months.push({
      month,
      totalSales,
    });
    currentMonth = addMonths(currentMonth, 1);
  }
  return months;
});
