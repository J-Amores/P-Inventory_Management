import { prisma } from '@/lib/prisma';
import { StatCard } from '../components/stat-card';

export async function LowStockItems() {
  try {
    // Count low stock items (less than 10 units)
    const lowStockCount = await prisma.products.count({
      where: {
        stockQuantity: {
          gt: 0,
          lt: 10,
        },
      },
    });

    // Get previous month's low stock count (simulated for demo)
    // In a real app, you might store historical data or use a more sophisticated approach
    const previousCount = lowStockCount + Math.floor(Math.random() * 5) - 2;
    
    const change = lowStockCount - previousCount;
    const percentChange = previousCount > 0 
      ? (change / previousCount) * 100 
      : 0;
    
    // For low stock, decreasing is positive
    const isPositive = change <= 0;

    return (
      <StatCard
        title="Low Stock Items"
        value={lowStockCount.toString()}
        change={{
          value: Math.abs(change).toString(),
          percentage: `${isPositive ? '-' : '+'}${Math.abs(percentChange).toFixed(1)}%`,
          isPositive,
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    return (
      <StatCard
        title="Low Stock Items"
        value="0"
        change={{
          value: "0",
          percentage: "0%",
          isPositive: true,
        }}
      />
    );
  }
}

export async function OutOfStockItems() {
  try {
    // Count out of stock items
    const outOfStockCount = await prisma.products.count({
      where: {
        stockQuantity: 0,
      },
    });

    // Get previous month's out of stock count (simulated for demo)
    const previousCount = outOfStockCount + Math.floor(Math.random() * 3) - 1;
    
    const change = outOfStockCount - previousCount;
    const percentChange = previousCount > 0 
      ? (change / previousCount) * 100 
      : 0;
    
    // For out of stock, decreasing is positive
    const isPositive = change <= 0;

    return (
      <StatCard
        title="Out of Stock Items"
        value={outOfStockCount.toString()}
        change={{
          value: Math.abs(change).toString(),
          percentage: `${isPositive ? '-' : '+'}${Math.abs(percentChange).toFixed(1)}%`,
          isPositive,
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching out of stock items:', error);
    return (
      <StatCard
        title="Out of Stock Items"
        value="0"
        change={{
          value: "0",
          percentage: "0%",
          isPositive: true,
        }}
      />
    );
  }
}

export async function TotalProducts() {
  try {
    // Count total products
    const totalCount = await prisma.products.count();

    // Get previous total (simulated for demo)
    const previousCount = totalCount - Math.floor(Math.random() * 10);
    
    const change = totalCount - previousCount;
    const percentChange = previousCount > 0 
      ? (change / previousCount) * 100 
      : 0;
    
    // For total products, increasing is positive
    const isPositive = change >= 0;

    return (
      <StatCard
        title="Total Products"
        value={totalCount.toString()}
        change={{
          value: Math.abs(change).toString(),
          percentage: `${isPositive ? '+' : '-'}${Math.abs(percentChange).toFixed(1)}%`,
          isPositive,
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching total products:', error);
    return (
      <StatCard
        title="Total Products"
        value="0"
        change={{
          value: "0",
          percentage: "0%",
          isPositive: true,
        }}
      />
    );
  }
}

export async function TotalStockValue() {
  try {
    // Get all products with their price and stock quantity
    const products = await prisma.products.findMany({
      select: {
        price: true,
        stockQuantity: true,
      },
    });
    
    // Calculate total stock value
    const totalValue = products.reduce(
      (sum: number, product: { price: number; stockQuantity: number }) => 
        sum + product.price * product.stockQuantity, 
      0
    );
    
    // Get previous value (simulated for demo)
    const previousValue = totalValue * (0.95 + Math.random() * 0.1);
    
    const change = totalValue - previousValue;
    const percentChange = previousValue > 0 
      ? (change / previousValue) * 100 
      : 0;
    
    // For stock value, increasing is positive
    const isPositive = change >= 0;

    return (
      <StatCard
        title="Total Stock Value"
        value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={{
          value: `$${Math.abs(change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          percentage: `${isPositive ? '+' : '-'}${Math.abs(percentChange).toFixed(1)}%`,
          isPositive,
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching total stock value:', error);
    return (
      <StatCard
        title="Total Stock Value"
        value="$0.00"
        change={{
          value: "$0.00",
          percentage: "0%",
          isPositive: true,
        }}
      />
    );
  }
} 