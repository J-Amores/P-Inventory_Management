import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, AlertTriangleIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  trend: 'up' | 'down' | 'warning'
}

export function StatCard({ title, value, description, trend }: StatCardProps) {
  const TrendIcon = {
    up: <ArrowUpIcon className="h-4 w-4 text-green-500" />,
    down: <ArrowDownIcon className="h-4 w-4 text-red-500" />,
    warning: <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />
  }[trend]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {TrendIcon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 