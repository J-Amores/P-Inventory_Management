"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from "recharts"
import { useState } from "react"

interface ExpenseSummary {
  expenseSummaryId: string
  totalExpenses: number
  date: string
}

interface ExpensesOverviewProps {
  expenseSummaries: ExpenseSummary[]
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div className="custom-tooltip" style={{ 
        backgroundColor: 'var(--background)', 
        border: '1px solid var(--border)',
        padding: '8px 12px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        <p className="label" style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{label}</p>
        <p className="value" style={{ margin: 0 }}>
          <span style={{ color: 'var(--primary)' }}>Expenses: </span>
          ${Number(dataPoint.value).toFixed(2)}M
        </p>
      </div>
    );
  }

  return null;
};

export default function ExpensesOverview({ expenseSummaries }: ExpensesOverviewProps) {
  // Get the most recent 12 months of data
  const recentExpenses = [...expenseSummaries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12)
    .reverse()

  // Format data for the chart
  const chartData = recentExpenses.map((expense) => {
    const date = new Date(expense.date);
    return {
      name: date.toLocaleString("default", { month: "short", year: "2-digit" }),
      month: date.toLocaleString("default", { month: "short", year: "2-digit" }),
      value: expense.totalExpenses / 1000000, // Convert to millions for readability
      amount: Number((expense.totalExpenses / 1000000).toFixed(2)), // Ensure it's a number with 2 decimal places
      rawAmount: expense.totalExpenses,
      fullDate: date.toLocaleDateString(),
    };
  });

  // Calculate total expenses
  const totalExpenses = expenseSummaries.reduce((sum, expense) => sum + expense.totalExpenses, 0)

  // Calculate average monthly expense
  const averageMonthlyExpense = totalExpenses / expenseSummaries.length

  // Find highest monthly expense
  const highestMonthlyExpense = Math.max(...expenseSummaries.map((expense) => expense.totalExpenses))

  // Custom tooltip formatter
  const customTooltipFormatter = (value: number, name: string, props: any) => {
    return [`$${value.toFixed(2)}M`, "Expenses"];
  };

  // Custom label formatter
  const customLabelFormatter = (label: string) => {
    const dataPoint = chartData.find(item => item.month === label);
    return `${dataPoint?.fullDate || label}`;
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalExpenses / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">Lifetime expenses across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(averageMonthlyExpense / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">Average monthly expense</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Monthly</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="m12 8-9.04 9.06a10.07 10.07 0 0 1 17.64-4.54" />
              <path d="M12 8v4" />
              <path d="M12 12h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(highestMonthlyExpense / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">Highest recorded monthly expense</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Trends</CardTitle>
          <CardDescription>Monthly expense totals for the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

