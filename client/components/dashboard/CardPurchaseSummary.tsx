"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', purchases: 3000 },
  { month: 'Feb', purchases: 2800 },
  { month: 'Mar', purchases: 3200 },
  { month: 'Apr', purchases: 2400 },
  { month: 'May', purchases: 2900 },
  { month: 'Jun', purchases: 3100 },
]

export function CardPurchaseSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="purchases" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 