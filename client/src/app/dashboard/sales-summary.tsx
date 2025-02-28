import { prisma } from '@/lib/prisma';
import { StatCard } from '../components/stat-card';

async function getSalesSummary() {
  try {
    // Get the most recent sales summary
    const latestSummary = await prisma.salesSummary.findFirst({
      orderBy: {
        date: 'desc',
      },
    });

    // Get the previous sales summary for comparison
    const previousSummary = await prisma.salesSummary.findFirst({
      where: {
        date: {
          lt: latestSummary?.date,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Calculate change percentage
    let changeValue = 0;
    let changePercentage = latestSummary?.changePercentage || 0;
    let isPositive = changePercentage >= 0;

    if (latestSummary && previousSummary) {
      changeValue = latestSummary.totalValue - previousSummary.totalValue;
    }

    return {
      totalValue: latestSummary?.totalValue || 0,
      changeValue,
      changePercentage,
      isPositive,
    };
  } catch (error) {
    console.error('Error fetching sales summary:', error);
    return {
      totalValue: 0,
      changeValue: 0,
      changePercentage: 0,
      isPositive: true,
    };
  }
}

export async function SalesSummary() {
  const salesData = await getSalesSummary();

  return (
    <StatCard
      title="Total Sales"
      value={`$${salesData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      change={{
        value: `$${Math.abs(salesData.changeValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        percentage: `${salesData.isPositive ? '+' : '-'}${Math.abs(salesData.changePercentage).toFixed(1)}%`,
        isPositive: salesData.isPositive,
      }}
    />
  );
} 