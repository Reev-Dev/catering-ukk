"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PendapatanData {
  date: string;
  total: number;
}

const chartConfig = {
  total: {
    label: "Pendapatan",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartPendapatan({
  data7,
  data30,
  data90,
}: {
  data7: PendapatanData[];
  data30: PendapatanData[];
  data90: PendapatanData[];
}) {
  const [range, setRange] = React.useState("7");

  const rawData = range === "7" ? data7 : range === "30" ? data30 : data90;

  const days = Number(range);

  const data = React.useMemo(() => {
    return fillMissingDates(rawData, days);
  }, [rawData, days]);



  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center justify-between border-b py-5">
        <div>
          <CardTitle>Pendapatan</CardTitle>
          <CardDescription>
            Total pendapatan berdasarkan tanggal
          </CardDescription>
        </div>

        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 Hari</SelectItem>
            <SelectItem value="30">30 Hari</SelectItem>
            <SelectItem value="90">90 Hari</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer
          className="aspect-auto h-64 w-full"
          config={chartConfig}
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("id-ID", {
                      month: "long",
                      day: "numeric",
                    })
                  }
                  formatter={(value) => {
                    const numberValue = Number(value);
                    return `Rp ${numberValue.toLocaleString("id-ID")}`;
                  }}
                />
              }
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--chart-1)"
              fill="url(#fillRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function fillMissingDates(
  data: PendapatanData[],
  days: number,
): PendapatanData[] {
  const result: PendapatanData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    const existing = data.find((d) => d.date === dateString);

    result.push({
      date: dateString,
      total: existing ? existing.total : 0,
    });
  }

  return result;
}
