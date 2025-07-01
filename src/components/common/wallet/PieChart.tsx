"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { formatCurrencyShort } from "@/lib/utils";

export function ChartPieLegend({ data }: any) {
  const staticData = [
    { token: "Block", balance: "0", valueUSD: "0" },
    { token: "USDC", balance: "0", valueUSD: "0" },
  ];

  const coinData = data?.assets?.coins || [];
  const allData = [...staticData, ...coinData];

  const chartData = allData?.map((item: any, index: number) => ({
    browser: item?.token
      ? item?.token?.toLowerCase()?.replace(/\s+/g, "-")
      : `token-${index}`,
    balance: parseFloat(item?.balance || 0),
    valueUSD: parseFloat(item?.valueUSD || 0),
    fill: `var(--chart-${(index % 5) + 1})`,
  }));

  const chartConfig = allData.reduce(
    (config: any, item: any, index: number) => {
      const key = item?.token
        ? item?.token?.toLowerCase()?.replace(/\s+/g, "-")
        : `token-${index}`;
      config[key] = {
        label: item?.token || item?.token || `Token ${index + 1}`,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return config;
    },
    {} as ChartConfig
  );

  const totalBalanceUSD = data?.assets?.totalBalanceUSD || 0;

  return (
    <Card className="flex flex-col bg-transparent border-0 shadow-none py-0">
      <CardContent className="flex justify-center pb-0">
        <ChartContainer config={chartConfig} className="w-full h-full max-w-xl">
          <ResponsiveContainer width="100%" aspect={1.4}>
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={360}
              innerRadius="60%"
              outerRadius="90%"
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                polarRadius={[86, 74]}
              />
              <RadialBar
                dataKey="balance"
                stackId="a"
                background
                cornerRadius={10}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {formatCurrencyShort(totalBalanceUSD)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Balance
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { browser, balance, valueUSD } = payload[0]?.payload;
                    return (
                      <div className="p-2 bg-background rounded shadow">
                        <span>
                          {browser}:{balance} {formatCurrencyShort(valueUSD)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="flex flex-wrap gap-2"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
