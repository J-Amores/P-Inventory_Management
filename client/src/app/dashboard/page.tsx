import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { InventoryTable } from "../inventory/inventory-table"
import { DateRangePicker } from "../components/ui/date-range-picker"
import { AppLayout } from "../components/app-layout"
import { TotalRevenue, LowStockItems, OutOfStockItems, TotalProducts } from "./inventory-metrics"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { SalesTrendChart } from "./sales-trend-chart"
import { SalesTable } from "./sales-table"

export default async function DashboardPage() {
  // Fetch all metrics data
  const revenueData = await TotalRevenue()
  const lowStockData = await LowStockItems()
  const outOfStockData = await OutOfStockItems()
  const totalProductsData = await TotalProducts()

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
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Metrics Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
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
                  <div className="text-2xl font-bold">{revenueData.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {revenueData.change.isPositive ? (
                      <>
                        <span className="text-green-500 inline-flex items-center">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          {revenueData.change.value} ({revenueData.change.percentage})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 inline-flex items-center">
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                          {revenueData.change.value} ({revenueData.change.percentage})
                        </span>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
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
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lowStockData.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {lowStockData.change.isPositive ? (
                      <>
                        <span className="text-green-500 inline-flex items-center">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          {lowStockData.change.value} ({lowStockData.change.percentage})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 inline-flex items-center">
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                          {lowStockData.change.value} ({lowStockData.change.percentage})
                        </span>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
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
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v12M16 10H8" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{outOfStockData.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {outOfStockData.change.isPositive ? (
                      <>
                        <span className="text-green-500 inline-flex items-center">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          {outOfStockData.change.value} ({outOfStockData.change.percentage})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 inline-flex items-center">
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                          {outOfStockData.change.value} ({outOfStockData.change.percentage})
                        </span>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
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
                    <path d="M2 20h.01M7 20v-4m0 0v-4m0 4h.01M17 20v-4m0 0V8m0 8h.01M12 20v-4m0 0V4m0 12h.01M17 8h.01" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProductsData.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalProductsData.change.isPositive ? (
                      <>
                        <span className="text-green-500 inline-flex items-center">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          {totalProductsData.change.value} ({totalProductsData.change.percentage})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 inline-flex items-center">
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                          {totalProductsData.change.value} ({totalProductsData.change.percentage})
                        </span>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Sales Trend Chart */}
            <SalesTrendChart />
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <SalesTrendChart />
            <SalesTable />
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



