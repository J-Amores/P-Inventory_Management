const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkExpenses() {
  try {
    const expenses = await prisma.expenses.findMany();
    console.log('All expenses in database:');
    console.table(expenses.map(exp => ({ 
      id: exp.expenseId, 
      category: exp.category, 
      amount: exp.amount,
      date: exp.timestamp
    })));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkExpenses(); 