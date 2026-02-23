"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface StatusData {
  status_pesan: string;
  _count: {
    status_pesan: number;
  };
}

const chartConfig = {
  MenungguKonfirmasi: {
    label: "Menunggu Konfirmasi",
    color: "var(--chart-1)",
  },
  SedangDiproses: {
    label: "Sedang Diproses",
    color: "var(--chart-3)",
  },
  MenungguKurir: {
    label: "Menunggu Kurir",
    color: "var(--chart-4)",
  },
  PesananSelesai: {
    label: "Pesanan Selesai",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartPesananStatus({ data }: { data: StatusData[] }) {
  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      name: item.status_pesan,
      value: item._count.status_pesan,
      fill: chartConfig[item.status_pesan as keyof typeof chartConfig]?.color,
    }));
  }, [data]);

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Status Pesanan</CardTitle>
      </CardHeader>

      <CardContent className="h-full">
        <ChartContainer
          className="mx-auto aspect-auto h-full"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Pesanan
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent />}
              className="translate-y-2 flex-wrap gap-2 *:basis-2/5 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
