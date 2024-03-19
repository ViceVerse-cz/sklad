"use client";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { api } from "@/trpc/react";
import { Decimal } from "@prisma/client/runtime/library";

export const Stats = () => {
  const { data: monthlyData } = api.product.getMonths.useQuery();

  if (!monthlyData) {
    return <div>Loading...</div>;
  }

  const chartData = monthlyData.map((item) => ({
    name: item.month,
    total: parseFloat(item.totalSales),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value},-`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};