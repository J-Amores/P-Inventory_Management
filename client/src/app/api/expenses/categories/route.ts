import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ExpenseGroupResult {
  category: string;
  _sum: {
    amount: number | null;
  };
}

export async function GET() {
  try {
    // Get all expense categories
    const allExpenseCategories = await prisma.$queryRaw`
      SELECT category, SUM(amount) as sum_amount
      FROM expenses
      GROUP BY category
      ORDER BY SUM(amount) DESC
    `;

    // Convert raw query result to expected format
    const formattedCategories = (allExpenseCategories as any[]).map(item => ({
      category: item.category || 'Uncategorized',
      _sum: {
        amount: Number(item.sum_amount)
      }
    })) as ExpenseGroupResult[];

    // Filter out invalid or zero amounts and ensure all categories are named
    let validCategories = formattedCategories
      .filter(item => item._sum.amount !== null && item._sum.amount > 0 && item.category)
      .map(item => ({
        category: item.category || 'Uncategorized',
        rawAmount: Number(item._sum.amount)
      }));
    
    // Limit to top 8 categories
    validCategories = validCategories.slice(0, 8);
    
    // Calculate relative amounts that will work well for visualization
    // This approach preserves the relationships between values
    // while making the smallest value significant enough to be visible
    const totalRawAmount = validCategories.reduce((sum, item) => sum + item.rawAmount, 0);
    
    const result = validCategories.map(item => {
      // Use original proportions to keep the data accurate
      // but ensure minimum size for small slices to be visible
      const proportion = item.rawAmount / totalRawAmount;
      const adjustedAmount = Math.max(5, proportion * 100);
      
      return {
        category: item.category,
        amount: adjustedAmount,
        originalAmount: item.rawAmount // Include original for reference
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense categories' },
      { status: 500 }
    );
  }
} 