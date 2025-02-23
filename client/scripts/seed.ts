import { PrismaClient } from '@prisma/client'
import * as fs from 'fs/promises'
import * as path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function loadJSON(filename: string) {
  const filePath = path.join(__dirname, '..', 'Data', filename)
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

async function main() {
  try {
    // Load all JSON files
    const products = await loadJSON('products.json')
    const sales = await loadJSON('sales.json')
    const users = await loadJSON('users.json')
    const expenseByCategory = await loadJSON('expenseByCategory.json')
    const salesSummary = await loadJSON('salesSummary.json')
    const expenseSummary = await loadJSON('expenseSummary.json')

    // Clear existing data (if any)
    await prisma.$transaction([
      prisma.sale.deleteMany(),
      prisma.product.deleteMany(),
      prisma.user.deleteMany(),
      prisma.expenseByCategory.deleteMany(),
      prisma.expenseSummary.deleteMany(),
      prisma.salesSummary.deleteMany(),
    ])

    // Insert data in the correct order (respecting foreign key constraints)
    console.log('Seeding products...')
    await prisma.product.createMany({
      data: products.map((product: { productId: string, name: string, price: number, rating: number, stockQuantity: number }) => ({
        id: product.productId,
        name: product.name,
        price: product.price,
        rating: product.rating,
        stockQuantity: product.stockQuantity
      }))
    })

    console.log('Seeding users...')
    await prisma.user.createMany({
      data: users.map((user: { userId: string, name: string, email: string }) => ({
        id: user.userId,
        name: user.name,
        email: user.email
      }))
    })

    console.log('Seeding sales summaries...')
    await prisma.salesSummary.createMany({
      data: salesSummary.map((summary: { salesSummaryId: string, totalValue: number, changePercentage: number, date: string }) => ({
        id: summary.salesSummaryId,
        totalValue: summary.totalValue,
        changePercentage: summary.changePercentage,
        date: new Date(summary.date)
      }))
    })

    console.log('Seeding expense summaries...')
    await prisma.expenseSummary.createMany({
      data: expenseSummary.map((summary: { expenseSummaryId: string, totalExpenses: number, date: string }) => ({
        id: summary.expenseSummaryId,
        totalExpenses: summary.totalExpenses,
        date: new Date(summary.date)
      }))
    })

    console.log('Seeding expense categories...')
    await prisma.expenseByCategory.createMany({
      data: expenseByCategory.map((expense: { expenseByCategoryId: string, expenseSummaryId: string, date: string, category: string, amount: number }) => ({
        id: expense.expenseByCategoryId,
        expenseSummaryId: expense.expenseSummaryId,
        date: new Date(expense.date),
        category: expense.category,
        amount: expense.amount
      }))
    })

    console.log('Seeding sales...')
    await prisma.sale.createMany({
      data: sales.map((sale: { saleId: string, productId: string, timestamp: string, quantity: number, unitPrice: number, totalAmount: number }) => ({
        id: sale.saleId,
        productId: sale.productId,
        timestamp: new Date(sale.timestamp),
        quantity: sale.quantity,
        unitPrice: sale.unitPrice,
        totalAmount: sale.totalAmount
      }))
    })

    console.log('Data seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })