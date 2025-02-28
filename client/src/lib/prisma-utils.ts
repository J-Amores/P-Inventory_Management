import { prisma } from './prisma';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * Helper functions for common Prisma operations
 */

/**
 * Generate a UUID for database records
 */
export function generateId(): string {
  return uuidv4();
}

/**
 * Product-related utilities
 */
export const productUtils = {
  /**
   * Get product by ID with related sales and purchases
   */
  async getProductWithRelations(productId: string) {
    return prisma.products.findUnique({
      where: { productId },
      include: {
        Sales: true,
        Purchases: true,
      },
    });
  },

  /**
   * Get products with low stock
   */
  async getLowStockProducts(threshold: number = 10, limit: number = 5) {
    return prisma.products.findMany({
      where: {
        stockQuantity: { lt: threshold },
      },
      orderBy: {
        stockQuantity: 'asc',
      },
      take: limit,
    });
  },

  /**
   * Update product stock quantity
   */
  async updateStock(productId: string, quantity: number) {
    return prisma.products.update({
      where: { productId },
      data: {
        stockQuantity: quantity,
      },
    });
  },
};

/**
 * Sales-related utilities
 */
export const salesUtils = {
  /**
   * Record a new sale with stock update
   */
  async recordSale(
    productId: string,
    quantity: number,
    unitPrice: number
  ) {
    // Start a transaction to ensure data consistency
    return prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => {
      // Get the current product
      const product = await tx.products.findUnique({
        where: { productId },
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (product.stockQuantity < quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Calculate total amount
      const totalAmount = quantity * unitPrice;

      // Create the sale record
      const sale = await tx.sales.create({
        data: {
          saleId: generateId(),
          productId,
          quantity,
          unitPrice,
          totalAmount,
          timestamp: new Date(),
        },
      });

      // Update product stock
      await tx.products.update({
        where: { productId },
        data: {
          stockQuantity: product.stockQuantity - quantity,
        },
      });

      return sale;
    });
  },

  /**
   * Get sales within a date range
   */
  async getSalesInDateRange(startDate: Date, endDate: Date) {
    return prisma.sales.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        product: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  },
};

/**
 * Expenses-related utilities
 */
export const expenseUtils = {
  /**
   * Get expenses by category
   */
  async getExpensesByCategory(category?: string) {
    const whereClause = category ? { category } : {};
    
    return prisma.expenses.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc',
      },
    });
  },

  /**
   * Get expense summary by date range
   */
  async getExpenseSummary(startDate?: Date, endDate?: Date) {
    const whereClause: any = {};
    
    if (startDate || endDate) {
      whereClause.timestamp = {};
      if (startDate) whereClause.timestamp.gte = startDate;
      if (endDate) whereClause.timestamp.lte = endDate;
    }
    
    // Get totals by category
    const expensesByCategory = await prisma.expenses.groupBy({
      by: ['category'],
      _sum: {
        amount: true,
      },
      where: whereClause,
    });

    // Get overall total
    const totalExpenses = await prisma.expenses.aggregate({
      _sum: {
        amount: true,
      },
      where: whereClause,
    });

    return {
      byCategory: expensesByCategory.map((item: { category: string; _sum: { amount: number | null } }) => ({
        category: item.category,
        amount: item._sum.amount || 0,
      })),
      total: totalExpenses._sum.amount || 0,
    };
  },
}; 