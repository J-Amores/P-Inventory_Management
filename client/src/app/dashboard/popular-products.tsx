import { prisma } from '@/lib/prisma';

interface ProductSalesData {
  productId: string;
  name: string;
  totalQuantity: number;
  totalAmount: number;
}

interface SalesGroupResult {
  productId: string;
  _sum: {
    quantity: number | null;
    totalAmount: number | null;
  };
}

interface ProductDetails {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number | null;
}

// Function to format currency values consistently
function formatCurrency(value: number): string {
  if (value >= 100000) {
    // Round to nearest 100K for large values
    const roundedValue = Math.round(value / 100000) * 100000;
    if (roundedValue >= 1000000) {
      return `$${(roundedValue / 1000000).toFixed(1)}M`;
    } else {
      return `$${(roundedValue / 1000).toFixed(0)}K`;
    }
  } else if (value >= 1000) {
    // Format thousands with K
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    // Format smaller values normally
    return `$${value.toFixed(2)}`;
  }
}

async function getPopularProducts(): Promise<ProductSalesData[]> {
  try {
    // Get top selling products (most quantity sold)
    const topSellingProducts = await prisma.sales.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        totalAmount: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    // Convert the result to our expected type
    const salesResults = topSellingProducts as unknown as SalesGroupResult[];

    // Get product details for top selling products
    const productIds = salesResults.map(product => product.productId);
    const productDetails = await prisma.products.findMany({
      where: {
        productId: { in: productIds },
      },
    });

    // Combine sales data with product details
    return salesResults.map(sales => {
      const product = productDetails.find(p => p.productId === sales.productId);
      return {
        productId: sales.productId,
        name: product?.name || 'Unknown Product',
        totalQuantity: sales._sum.quantity || 0,
        totalAmount: sales._sum.totalAmount || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
}

export async function PopularProducts() {
  const popularProducts = await getPopularProducts();

  if (popularProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <p>No sales data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {popularProducts.map((product) => (
        <div key={product.productId} className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.totalQuantity.toLocaleString()} units sold
            </p>
          </div>
          <div className="font-medium">
            {formatCurrency(product.totalAmount)}
          </div>
        </div>
      ))}
    </div>
  );
}

