import { prisma } from '@/lib/prisma';
import { StatCard } from '../components/stat-card';

async function getPurchasesSummary() {
  try {
    // Get the most recent purchase summary
    const latestSummary = await prisma.purchaseSummary.findFirst({
      orderBy: {
        date: 'desc',
      },
    });

    // Get the previous purchase summary for comparison
    const previousSummary = await prisma.purchaseSummary.findFirst({
      where: {
        date: {
          lt: latestSummary?.date,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Calculate change
    let changeValue = 0;
    let changePercentage = latestSummary?.changePercentage || 0;
    let isPositive = changePercentage >= 0;

    if (latestSummary && previousSummary) {
      changeValue = latestSummary.totalPurchased - previousSummary.totalPurchased;
    }

    return {
      totalPurchased: latestSummary?.totalPurchased || 0,
      changeValue,
      changePercentage,
      isPositive,
    };
  } catch (error) {
    console.error('Error fetching purchases summary:', error);
    return {
      totalPurchased: 0,
      changeValue: 0,
      changePercentage: 0,
      isPositive: true,
    };
  }
}

export async function PurchasesSummary() {
  const purchaseData = await getPurchasesSummary();

  return (
    <StatCard
      title="Total Purchases"
      value={`$${purchaseData.totalPurchased.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      change={{
        value: `$${Math.abs(purchaseData.changeValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        percentage: `${purchaseData.isPositive ? '+' : '-'}${Math.abs(purchaseData.changePercentage).toFixed(1)}%`,
        isPositive: !purchaseData.isPositive, // Inverse for purchases (decreasing costs is positive)
      }}
    />
  );
} 