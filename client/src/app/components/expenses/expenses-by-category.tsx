"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ExpenseByCategory {
  expenseByCategoryId: string
  expenseSummaryId: string
  date: string
  category: string
  amount: number
}

interface ExpensesByCategoryProps {
  expensesByCategory: ExpenseByCategory[]
}

export default function ExpensesByCategory({ expensesByCategory }: ExpensesByCategoryProps) {
  // Group expenses by category and sum the amounts
  const categoryTotals = expensesByCategory.reduce(
    (acc, expense) => {
      const { category, amount } = expense
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Format data for the pie chart
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }))

  // Define pie chart colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A288E3"]

  // Calculate percentages for each category
  const total = pieData.reduce((sum, entry) => sum + entry.value, 0)
  const dataWithPercentage = pieData.map((entry) => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(1),
  }))

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Distribution of expenses across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithPercentage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                >
                  {dataWithPercentage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} units`, "Amount"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {dataWithPercentage.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                    </div>
                    <div className="w-full bg-secondary h-2 mt-1 rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

