import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
}

export function StatCard({ title, value, change }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change.isPositive ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change.isPositive ? "+" : "-"}
          {change.value} ({change.percentage})
        </p>
      </CardContent>
    </Card>
  )
}

