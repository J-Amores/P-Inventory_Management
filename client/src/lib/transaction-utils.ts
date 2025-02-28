import { prisma } from './prisma';
import { generateProductId, generatePurchaseId, generateSaleId } from './id-utils';
import { PrismaClient } from '@prisma/client';

type TransactionClient = Omit<
  PrismaClient, 
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

/**
 * Utility functions for handling transactions
 */

/**
 * Record a purchase and update inventory in a single transaction
 */
export async function recordPurchase(
  productName: string,
  quantity: number,
  unitCost: number
) {
  return prisma.$transaction(async (tx: TransactionClient) => {
    // Find or create the product
    let product = await tx.products.findFirst({
      where: {
        name: productName,
      },
    });

    if (!product) {
      // Create a new product if it doesn't exist
      product = await tx.products.create({
        data: {
          productId: generateProductId(),
          name: productName,
          price: unitCost * 1.5, // Default markup
          stockQuantity: 0,
          rating: null,
        },
      });
    }

    // Create the purchase record
    const purchase = await tx.purchases.create({
      data: {
        purchaseId: generatePurchaseId(),
        productId: product.productId,
        quantity,
        unitCost,
        totalCost: quantity * unitCost,
        timestamp: new Date(),
      },
    });

    // Update the product stock
    await tx.products.update({
      where: {
        productId: product.productId,
      },
      data: {
        stockQuantity: {
          increment: quantity,
        },
      },
    });

    return {
      purchase,
      updatedProduct: await tx.products.findUnique({
        where: {
          productId: product.productId,
        },
      }),
    };
  });
}

/**
 * Record a sale and update inventory in a single transaction
 */
export async function recordSale(
  productId: string,
  quantity: number,
  unitPrice: number
) {
  return prisma.$transaction(async (tx: TransactionClient) => {
    // Get the product
    const product = await tx.products.findUnique({
      where: {
        productId,
      },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Check if there's enough stock
    if (product.stockQuantity < quantity) {
      throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stockQuantity}, Requested: ${quantity}`);
    }

    // Create the sale record
    const sale = await tx.sales.create({
      data: {
        saleId: generateSaleId(),
        productId,
        quantity,
        unitPrice,
        totalAmount: quantity * unitPrice,
        timestamp: new Date(),
      },
    });

    // Update the product stock
    await tx.products.update({
      where: {
        productId,
      },
      data: {
        stockQuantity: {
          decrement: quantity,
        },
      },
    });

    return {
      sale,
      updatedProduct: await tx.products.findUnique({
        where: {
          productId,
        },
      }),
    };
  });
}

/**
 * Update multiple products in a single transaction
 */
export async function updateMultipleProducts(
  updates: Array<{ productId: string; data: { name?: string; price?: number; stockQuantity?: number } }>
) {
  return prisma.$transaction(async (tx: TransactionClient) => {
    const results = [];
    
    for (const update of updates) {
      const updatedProduct = await tx.products.update({
        where: {
          productId: update.productId,
        },
        data: update.data,
      });
      
      results.push(updatedProduct);
    }
    
    return results;
  });
} 