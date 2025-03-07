import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { InventoryChart } from "../inventory/inventory-chart"
import { InventoryTable } from "../inventory/inventory-table"
import { ExpensePieChart } from "./expense-pie-chart"
import { PopularProducts } from "./popular-products"
import { DateRangePicker } from "../components/ui/date-range-picker"
import { AppLayout } from "../components/app-layout"
import { SalesSummary } from "./sales-summary"
import { PurchasesSummary } from "./purchases-summary"
import { TotalStockValue, LowStockItems, OutOfStockItems, TotalProducts } from "./inventory-metrics"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze your business performance</p>
          </div>
          <DateRangePicker />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales & Purchases</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Metrics Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <TotalStockValue />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <LowStockItems />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <OutOfStockItems />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <TotalProducts />
                </CardContent>
              </Card>
            </div>
            
            {/* Charts Overview */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales & Purchases</CardTitle>
                  <CardDescription>Monthly revenue and expense comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SalesSummary />
                    <PurchasesSummary />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>Distribution of expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpensePieChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Revenue and sales metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <SalesSummary />
                  <PurchasesSummary />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Popular Products</CardTitle>
                <CardDescription>Your best-selling items</CardDescription>
              </CardHeader>
              <CardContent>
                <PopularProducts />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>Current stock levels and product information</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <InventoryTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}



