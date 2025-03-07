import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { SalesTableClient } from "./sales-table-client"

export async function SalesTable() {
  try {
    // Fetch the latest sales data
    const salesData = await prisma.sales.findMany({
      take: 10, // Get the latest 10 sales
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        product: true, // Include the related product information
      },
    });

    // Format the data for the table
    const formattedSales = salesData.map((sale) => ({
      id: sale.saleId,
      productId: sale.productId,
      productName: sale.product.name,
      date: sale.timestamp,
      quantity: sale.quantity,
      unitPrice: sale.unitPrice,
      totalAmount: sale.totalAmount,
    }));

    return <SalesTableClient salesData={formattedSales} />;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Sales</CardTitle>
          <CardDescription>Recent sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">Error loading sales data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
} 