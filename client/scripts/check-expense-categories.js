const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkExpenseCategories() {
  try {
    // This replicates the logic in our API endpoint
    const expenseCategories = await prisma.expenses.groupBy({
      by: ['category'],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    const result = expenseCategories.map(item => ({
      category: item.category,
      amount: Number(item._sum.amount || 0),
    }));

    console.log('Expense categories (grouped by category):');
    console.table(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkExpenseCategories(); 