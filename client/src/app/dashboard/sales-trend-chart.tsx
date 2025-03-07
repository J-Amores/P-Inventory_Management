import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { SalesTrendChartClient } from "./sales-trend-chart-client"

export async function SalesTrendChart() {
  try {
    // Fetch sales summary data
    const salesData = await prisma.salesSummary.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    // Format data for the chart
    const chartData = salesData.map((item) => {
      const date = new Date(item.date);
      return {
        name: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        value: item.totalValue / 1000, // Convert to thousands for readability
        rawValue: item.totalValue,
        fullDate: date.toLocaleDateString(),
      };
    });

    // Calculate total sales
    const totalSales = salesData.reduce((sum, item) => sum + item.totalValue, 0);
    
    // Calculate average monthly sales
    const averageMonthlySales = totalSales / (salesData.length || 1);
    
    // Find highest monthly sales
    const highestMonthlySales = Math.max(...salesData.map(item => item.totalValue));

    return <SalesTrendChartClient 
      chartData={chartData} 
      totalSales={totalSales} 
      averageMonthlySales={averageMonthlySales} 
      highestMonthlySales={highestMonthlySales} 
    />;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
          <CardDescription>Sales performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Error loading sales data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
} 