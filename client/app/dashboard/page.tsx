import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Overview</h1>
        <Calendar />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Products" 
          value="1,234" 
          trend="+12.3%"
        />
        <StatCard 
          title="Monthly Sales" 
          value="$45,678" 
          trend="+8.2%"
        />
        <StatCard 
          title="Stock Value" 
          value="$234.5K" 
          trend="-3.1%"
        />
        <StatCard 
          title="Pending Orders" 
          value="23" 
          trend="+2.4%"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="p-6 lg:col-span-4">
          <h3 className="text-lg font-semibold">Sales Overview</h3>
          <SalesChart />
        </Card>
        
        <Card className="p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold">Expense Analysis</h3>
          <ExpensePieChart />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Popular Products</h3>
          <Button variant="outline">View All</Button>
        </div>
        <PopularProductsList />
      </Card>
    </div>
  )
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  const isPositive = trend.startsWith('+')
  
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        </div>
      </div>
    </Card>
  )
}

// Placeholder components - connect to your data sources
function SalesChart() {
  return <Skeleton className="h-[300px] w-full mt-4" />
}

function ExpensePieChart() {
  return <Skeleton className="h-[250px] w-full mt-4" />
}

function PopularProductsList() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      ))}
    </div>
  )
}