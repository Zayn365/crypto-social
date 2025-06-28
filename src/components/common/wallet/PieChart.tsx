"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "usdc", visitors: 275, fill: "var(--color-usdc)" },
  { browser: "block", visitors: 200, fill: "var(--color-block)" },
  { browser: "ethereum", visitors: 187, fill: "var(--color-ethereum)" },
  { browser: "base", visitors: 173, fill: "var(--color-base)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  usdc: {
    label: "USDC",
    color: "var(--chart-1)",
  },
  block: {
    label: "Block",
    color: "var(--chart-2)",
  },
  ethereum: {
    label: "Ethereum",
    color: "var(--chart-3)",
  },
  base: {
    label: "Base",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col bg-transparent border-0 shadow-none py-0">
      <CardContent className="flex-1 pb-0 px-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={
                <ChartLegendContent nameKey="browser" payload={chartData} />
              }
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
