import { Card } from "../components/ui/card"
import { StatCard } from "../components/stat-card"
import { InventoryChart } from "../inventory/inventory-chart"
import { InventoryTable } from "../inventory/inventory-table"
import { ExpensePieChart } from "./expense-pie-chart"
import { PopularProducts } from "./popular-products"
import { DateRangePicker } from "../components/ui/date-range-picker"
import { Sidebar } from "../components/sidebar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <div className="text-sm text-muted-foreground">Welcome back, Admin</div>
            </div>
            <DateRangePicker />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Stock Value"
              value="$1,234,567"
              change={{ value: "$12,340", percentage: "+2.1%", isPositive: true }}
            />
            <StatCard
              title="Low Stock Items"
              value="24"
              change={{ value: "3", percentage: "-11.1%", isPositive: true }}
            />
            <StatCard
              title="Out of Stock Items"
              value="7"
              change={{ value: "2", percentage: "+40%", isPositive: false }}
            />
            <StatCard
              title="Total Products"
              value="1,234"
              change={{ value: "34", percentage: "+2.8%", isPositive: true }}
            />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Inventory Levels</h2>
              <InventoryChart />
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Expense Categories</h2>
              <ExpensePieChart />
            </Card>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Popular Products</h2>
              <PopularProducts />
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
              {/* Add recent activity component here */}
            </Card>
          </div>
          <div className="mt-6">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Inventory Overview</h2>
              <InventoryTable />
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}



