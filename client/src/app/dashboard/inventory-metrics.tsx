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

    return {
      value: lowStockCount.toString(),
      change: {
        value: Math.abs(change).toString(),
        percentage: `${Math.abs(percentChange).toFixed(1)}%`,
        isPositive,
      }
    };
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    return {
      value: "0",
      change: {
        value: "0",
        percentage: "0%",
        isPositive: true,
      }
    };
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

    return {
      value: outOfStockCount.toString(),
      change: {
        value: Math.abs(change).toString(),
        percentage: `${Math.abs(percentChange).toFixed(1)}%`,
        isPositive,
      }
    };
  } catch (error) {
    console.error('Error fetching out of stock items:', error);
    return {
      value: "0",
      change: {
        value: "0",
        percentage: "0%",
        isPositive: true,
      }
    };
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

    return {
      value: totalCount.toString(),
      change: {
        value: Math.abs(change).toString(),
        percentage: `${Math.abs(percentChange).toFixed(1)}%`,
        isPositive,
      }
    };
  } catch (error) {
    console.error('Error fetching total products:', error);
    return {
      value: "0",
      change: {
        value: "0",
        percentage: "0%",
        isPositive: true,
      }
    };
  }
}

export async function TotalRevenue() {
  try {
    // Get all sales to calculate total revenue
    const sales = await prisma.sales.findMany({
      select: {
        totalAmount: true,
        timestamp: true,
      },
    });
    
    // Calculate total revenue
    const totalRevenue = sales.reduce(
      (sum: number, sale: { totalAmount: number }) => sum + sale.totalAmount, 
      0
    );
    
    // Get previous month's revenue (simulated for demo)
    const previousRevenue = totalRevenue * (0.90 + Math.random() * 0.15);
    
    const change = totalRevenue - previousRevenue;
    const percentChange = previousRevenue > 0 
      ? (change / previousRevenue) * 100 
      : 0;
    
    // For revenue, increasing is positive
    const isPositive = change >= 0;

    // Format the revenue with appropriate scaling
    let formattedRevenue = totalRevenue;
    let unit = '';
    
    if (totalRevenue >= 1000000) {
      formattedRevenue = totalRevenue / 1000000;
      unit = 'M';
    } else if (totalRevenue >= 1000) {
      formattedRevenue = totalRevenue / 1000;
      unit = 'K';
    }

    return {
      value: `$${formattedRevenue.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}${unit}`,
      change: {
        value: `$${Math.abs(change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        percentage: `${Math.abs(percentChange).toFixed(1)}%`,
        isPositive,
      }
    };
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    return {
      value: "$0.00",
      change: {
        value: "$0.00",
        percentage: "0%",
        isPositive: true,
      }
    };
  }
} 