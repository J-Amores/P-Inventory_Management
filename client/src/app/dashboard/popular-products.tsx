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
    }) as SalesGroupResult[];

    // Get product details for top selling products
    const productIds = topSellingProducts.map((product: SalesGroupResult) => product.productId);
    const productDetails = await prisma.products.findMany({
      where: {
        productId: { in: productIds },
      },
    }) as ProductDetails[];

    // Combine sales data with product details
    return topSellingProducts.map((sales: SalesGroupResult) => {
      const product = productDetails.find((p: ProductDetails) => p.productId === sales.productId);
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
              {product.totalQuantity} units sold
            </p>
          </div>
          <div className="font-medium">
            ${product.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      ))}
    </div>
  );
}

