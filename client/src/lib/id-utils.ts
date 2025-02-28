import { v4 as uuidv4 } from 'uuid';

/**
 * Utility functions for generating unique IDs for each database entity
 */

/**
 * Generate a UUID for a Product
 */
export function generateProductId(): string {
  return `prod_${uuidv4()}`;
}

/**
 * Generate a UUID for a Sale
 */
export function generateSaleId(): string {
  return `sale_${uuidv4()}`;
}

/**
 * Generate a UUID for a Purchase
 */
export function generatePurchaseId(): string {
  return `purch_${uuidv4()}`;
}

/**
 * Generate a UUID for an Expense
 */
export function generateExpenseId(): string {
  return `exp_${uuidv4()}`;
}

/**
 * Generate a UUID for a User
 */
export function generateUserId(): string {
  return `user_${uuidv4()}`;
}

/**
 * Generate a UUID for a Summary
 */
export function generateSummaryId(type: 'sales' | 'purchases' | 'expenses'): string {
  return `${type}_summary_${uuidv4()}`;
}

/**
 * Generate a UUID for an Expense Category
 */
export function generateExpenseCategoryId(): string {
  return `exp_cat_${uuidv4()}`;
}

/**
 * Generate a generic UUID
 */
export function generateId(): string {
  return uuidv4();
} 