import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { addMonths, subMonths, format } from "date-fns";

export const getMonthlySales = protectedProcedure.query(async () => {
  const currentDate = new Date();
  const startDate = subMonths(currentDate, 11);

  const monthlySales = await db.$queryRaw<Array<{ month: Date; totalsales: Prisma.Decimal }>>`
    SELECT
      date_trunc('month', "date") AS month,
      SUM(CASE WHEN ah.type = 'SOLD' THEN ah.price * ah.quantity ELSE -ah.price * ah.quantity END) AS totalSales
    FROM "ActionHistory" ah
    WHERE ah."date" >= ${startDate.toISOString()}::TIMESTAMP
      AND ah."visibility" = 'Visible'
    GROUP BY date_trunc('month', ah."date")
    ORDER BY month;
  `;

  const months = [];
  let currentMonth = startDate;

  while (currentMonth <= currentDate) {
    const salesData = monthlySales.find(
      (sale) =>
        sale.month.getMonth() === currentMonth.getMonth() && sale.month.getFullYear() === currentMonth.getFullYear(),
    );
    const totalSales = salesData ? salesData.totalsales : new Decimal(0);

    const month = format(currentMonth, "MMM");
    months.push({ month, totalSales });

    currentMonth = addMonths(currentMonth, 1);
  }

  return months;
});
