import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Type for expense category grouping
type ExpenseCategoryGroup = {
  category: string;
  _sum: {
    amount: number | null;
  };
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    // Build the where clause based on filters
    const whereClause: any = {};
    
    if (category) {
      whereClause.category = category;
    }
    
    // Add date range filter if provided
    if (startDate || endDate) {
      whereClause.timestamp = {};
      
      if (startDate) {
        whereClause.timestamp.gte = new Date(startDate);
      }
      
      if (endDate) {
        whereClause.timestamp.lte = new Date(endDate);
      }
    }
    
    // Query expenses with filters
    const expenses = await prisma.expenses.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc',
      },
    });
    
    // Get expenses by category
    const expensesByCategoryRaw = await prisma.$queryRaw`
      SELECT category, SUM(amount) as sum_amount
      FROM expenses
      ${whereClause ? `WHERE ${whereClause}` : ''}
      GROUP BY category
      ORDER BY SUM(amount) DESC
    `;

    // Convert raw query result to expected format
    const expensesByCategory = (expensesByCategoryRaw as any[]).map(item => ({
      category: item.category || 'Uncategorized',
      _sum: {
        amount: Number(item.sum_amount)
      }
    })) as ExpenseCategoryGroup[];
    
    // Calculate total expenses
    const totalExpenses = await prisma.expenses.aggregate({
      _sum: {
        amount: true,
      },
      where: whereClause,
    });
    
    return NextResponse.json({
      expenses,
      expensesByCategory: expensesByCategory.map((categoryGroup: ExpenseCategoryGroup) => ({
        category: categoryGroup.category,
        amount: categoryGroup._sum.amount,
      })),
      totalExpenses: totalExpenses._sum.amount || 0,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newExpense = await prisma.expenses.create({
      data: {
        expenseId: body.expenseId, // Assuming UUID is generated on client or middleware
        category: body.category,
        amount: parseFloat(body.amount),
        timestamp: new Date(body.timestamp || Date.now()),
      },
    });
    
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
} 