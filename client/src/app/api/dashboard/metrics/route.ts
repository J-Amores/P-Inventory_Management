import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Define types for our grouped sales data
type SalesGroupBy = {
  productId: string;
  _sum: {
    quantity: number | null;
    totalAmount: number | null;
  };
};

// Define product type based on schema
type Product = {
  productId: string;
  name: string;
  price: number;
  rating: number | null;
  stockQuantity: number;
};

export async function GET() {
  try {
    // Get the most recent sales summary
    const latestSalesSummary = await prisma.salesSummary.findFirst({
      orderBy: { date: 'desc' },
    });

    // Get the most recent purchase summary
    const latestPurchaseSummary = await prisma.purchaseSummary.findFirst({
      orderBy: { date: 'desc' },
    });

    // Get the most recent expense summary with categories
    const latestExpenseSummary = await prisma.expenseSummary.findFirst({
      orderBy: { date: 'desc' },
      include: {
        ExpenseByCategory: true,
      },
    });

    // Get top selling products (most quantity sold)
    const topSellingProductsRaw = await prisma.$queryRaw`
      SELECT "productId", SUM(quantity) as sum_quantity, SUM("totalAmount") as sum_total_amount
      FROM sales
      GROUP BY "productId"
      ORDER BY SUM(quantity) DESC
      LIMIT 5
    `;

    // Convert raw query result to expected format
    const topSellingProducts = (topSellingProductsRaw as any[]).map(item => ({
      productId: item.productId,
      _sum: {
        quantity: Number(item.sum_quantity),
        totalAmount: Number(item.sum_total_amount)
      }
    })) as SalesGroupBy[];

    // Get product details for top selling products
    const productIds = topSellingProducts.map((product: SalesGroupBy) => product.productId);
    const productDetails = await prisma.products.findMany({
      where: {
        productId: { in: productIds },
      },
    }) as Product[];

    // Combine sales data with product details
    const topProducts = topSellingProducts.map((sales: SalesGroupBy) => {
      const product = productDetails.find((p: Product) => p.productId === sales.productId);
      return {
        productId: sales.productId,
        name: product?.name || 'Unknown',
        totalQuantity: sales._sum.quantity,
        totalAmount: sales._sum.totalAmount,
      };
    });

    // Get low stock products
    const lowStockProducts = await prisma.products.findMany({
      where: {
        stockQuantity: { lt: 10 },
      },
      orderBy: {
        stockQuantity: 'asc',
      },
      take: 5,
    });

    return NextResponse.json({
      salesSummary: latestSalesSummary,
      purchaseSummary: latestPurchaseSummary,
      expenseSummary: latestExpenseSummary,
      topProducts,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
} 