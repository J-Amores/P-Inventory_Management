"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan", value: 1000 },
  { date: "Feb", value: 1200 },
  { date: "Mar", value: 900 },
  { date: "Apr", value: 1500 },
  { date: "May", value: 1800 },
  { date: "Jun", value: 1600 },
  { date: "Jul", value: 2000 },
  { date: "Aug", value: 2200 },
]

export function InventoryChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Items</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold">{payload[0].payload.date}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area type="monotone" dataKey="value" stroke="#ff6b00" fill="#ff6b00" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

