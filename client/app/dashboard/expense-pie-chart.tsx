'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface ExpenseByCategoryData {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  date: string;
  category: string;
  amount: number;
}

interface ExpenseLineChartProps {
  data: ExpenseByCategoryData[];
}

export function ExpenseLineChart({ data }: ExpenseLineChartProps) {
  // Sort data by date and group by date
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const dailyTotals = sortedData.reduce((acc, curr) => {
    const date = format(new Date(curr.date), 'MMM d');
    acc[date] = (acc[date] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format for Recharts
  const chartData = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Expense Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-sm text-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-sm text-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.date}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Amount
                          </span>
                          <span className="font-bold">
                            ${payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, className: "fill-primary" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 