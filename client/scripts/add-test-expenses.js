const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addTestExpenses() {
  try {
    // Sample expense data with different categories
    const expenses = [
      { expenseId: 'exp-test-1', category: 'Office Supplies', amount: 150, timestamp: new Date() },
      { expenseId: 'exp-test-2', category: 'Marketing', amount: 300, timestamp: new Date() },
      { expenseId: 'exp-test-3', category: 'Utilities', amount: 200, timestamp: new Date() },
      { expenseId: 'exp-test-4', category: 'Travel', amount: 450, timestamp: new Date() },
      { expenseId: 'exp-test-5', category: 'Maintenance', amount: 175, timestamp: new Date() }
    ];
    
    // Add each expense individually to handle possible duplicates
    for (const expense of expenses) {
      // Check if expense with this ID already exists
      const existingExpense = await prisma.expenses.findUnique({
        where: { expenseId: expense.expenseId }
      });
      
      if (!existingExpense) {
        await prisma.expenses.create({ data: expense });
        console.log(`Added expense: ${expense.category} - $${expense.amount}`);
      } else {
        console.log(`Expense ${expense.expenseId} already exists, skipping.`);
      }
    }
    
    console.log('Test expense data added successfully');
  } catch (error) {
    console.error('Error adding test expenses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestExpenses(); 