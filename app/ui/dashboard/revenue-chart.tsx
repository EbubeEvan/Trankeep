"use client";

import { fetchRevenue } from "@app/lib/data";
import { lusitana } from "@app/ui/common/fonts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Revenue } from "@app/lib/definitions";

const RevenueChart = ({ revenue }: { revenue: Revenue[] }) => {
  // Fetch data inside the component
  const chartHeight = 350;

  const chartConfig = {
    desktop: {
      label: "revenue",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-[50%]">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4 w-full">
        <ChartContainer
          config={chartConfig}
          className="min-h-[450px] w-full bg-white p-5"
        >
          <BarChart accessibilityLayer data={revenue}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* <CartesianGrid vertical={false} /> */}
            <Bar dataKey="revenue" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default RevenueChart;

