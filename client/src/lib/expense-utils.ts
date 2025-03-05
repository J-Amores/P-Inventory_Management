"use server"

import { prisma } from './prisma';
import { generateId } from './prisma-utils';

// Mock functions to simulate data fetching
// In a real application, these would fetch from an API or database

interface ExpenseSummary {
  expenseSummaryId: string
  totalExpenses: number
  date: string
}

interface ExpenseByCategory {
  expenseByCategoryId: string
  expenseSummaryId: string
  date: string
  category: string
  amount: number
}

// Fetch expense summaries from the database
export async function getExpenseSummaries(): Promise<ExpenseSummary[]> {
  try {
    const summaries = await prisma.expenseSummary.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    
    return summaries.map(summary => ({
      expenseSummaryId: summary.expenseSummaryId,
      totalExpenses: summary.totalExpenses,
      date: summary.date.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching expense summaries:", error);
    return [];
  }
}

// Fetch expenses by category from the database
export async function getExpensesByCategory(): Promise<ExpenseByCategory[]> {
  try {
    const expensesByCategory = await prisma.expenseByCategory.findMany({
      include: {
        expenseSummary: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    
    return expensesByCategory.map(expense => ({
      expenseByCategoryId: expense.expenseByCategoryId,
      expenseSummaryId: expense.expenseSummaryId,
      date: expense.date.toISOString(),
      category: expense.category,
      amount: Number(expense.amount), // Convert BigInt to Number
    }));
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    return [];
  }
}

// Add a new expense
export async function addExpense(category: string, amount: number) {
  try {
    const expenseId = generateId();
    const timestamp = new Date();
    
    // Create the expense record
    const expense = await prisma.expenses.create({
      data: {
        expenseId,
        category,
        amount,
        timestamp,
      },
    });
    
    // Update or create expense summary for the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find existing summary for today
    let summary = await prisma.expenseSummary.findFirst({
      where: {
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });
    
    if (summary) {
      // Update existing summary
      summary = await prisma.expenseSummary.update({
        where: {
          expenseSummaryId: summary.expenseSummaryId,
        },
        data: {
          totalExpenses: summary.totalExpenses + amount,
        },
      });
    } else {
      // Create new summary
      const summaryId = generateId();
      summary = await prisma.expenseSummary.create({
        data: {
          expenseSummaryId: summaryId,
          totalExpenses: amount,
          date: today,
        },
      });
    }
    
    // Add to expense by category
    await prisma.expenseByCategory.create({
      data: {
        expenseByCategoryId: generateId(),
        expenseSummaryId: summary.expenseSummaryId,
        category,
        amount: BigInt(Math.round(amount)),
        date: timestamp,
      },
    });
    
    return expense;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw new Error("Failed to add expense");
  }
}

