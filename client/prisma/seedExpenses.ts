import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding expense data...');

  // Clear existing data
  await prisma.expenseByCategory.deleteMany({});
  await prisma.expenseSummary.deleteMany({});
  await prisma.expenses.deleteMany({});

  // Create expense summaries
  const summaries = [
    {
      expenseSummaryId: uuidv4(),
      totalExpenses: 40749250.15,
      date: new Date("2022-08-23T23:59:13Z"),
    },
    {
      expenseSummaryId: uuidv4(),
      totalExpenses: 82516685.25,
      date: new Date("2021-12-28T17:03:47Z"),
    },
    {
      expenseSummaryId: uuidv4(),
      totalExpenses: 41860250.4,
      date: new Date("2021-09-18T23:26:30Z"),
    },
    {
      expenseSummaryId: uuidv4(),
      totalExpenses: 49456718.68,
      date: new Date("2022-01-08T04:26:56Z"),
    },
    {
      expenseSummaryId: uuidv4(),
      totalExpenses: 35573786.54,
      date: new Date("2020-08-31T11:45:23Z"),
    },
  ];

  for (const summary of summaries) {
    await prisma.expenseSummary.create({
      data: summary,
    });
  }

  // Create expenses by category
  const categories = ['Office', 'Salaries', 'Marketing', 'Equipment', 'Professional'];
  
  for (const summary of summaries) {
    // Create 2-3 expense categories for each summary
    const numCategories = Math.floor(Math.random() * 2) + 2;
    const selectedCategories = [...categories].sort(() => 0.5 - Math.random()).slice(0, numCategories);
    
    for (const category of selectedCategories) {
      const amount = Math.floor(Math.random() * 100000) + 10000;
      
      await prisma.expenseByCategory.create({
        data: {
          expenseByCategoryId: uuidv4(),
          expenseSummaryId: summary.expenseSummaryId,
          category,
          amount: BigInt(amount),
          date: summary.date,
        },
      });
    }
  }

  // Create individual expenses
  const expenseCategories = ['Office Supplies', 'Salaries', 'Marketing', 'Equipment', 'Professional Services', 'Rent', 'Utilities'];
  
  for (let i = 0; i < 20; i++) {
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
    const amount = Math.floor(Math.random() * 10000) + 1000;
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
    
    await prisma.expenses.create({
      data: {
        expenseId: uuidv4(),
        category,
        amount,
        timestamp,
      },
    });
  }

  console.log('Expense data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 