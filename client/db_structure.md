# Database Structure Documentation (Commerce Data)

## Tables Overview

### users
- `userId` (PRIMARY KEY, UUID)
- `name` (VARCHAR(100))
- `email` (VARCHAR(255), UNIQUE)

### products
- `productId` (PRIMARY KEY, UUID)
- `name` (VARCHAR(255))
- `price` (DECIMAL(10,2))
- `rating` (DECIMAL(3,2))
- `stockQuantity` (INT)

### expenses
- `expenseId` (PRIMARY KEY, UUID)
- `category` (ENUM('Salaries', 'Office', 'Professional'))
- `amount` (DECIMAL(12,2))
- `timestamp` (TIMESTAMP)

### expense_summary
- `expenseSummaryId` (PRIMARY KEY, UUID)
- `totalExpenses` (DECIMAL(12,2))
- `date` (TIMESTAMP)

### expense_by_category
- `expenseByCategoryId` (PRIMARY KEY, UUID)
- `expenseSummaryId` (UUID, FOREIGN KEY -> expense_summary.expenseSummaryId)
- `date` (TIMESTAMP)
- `category` (ENUM('Salaries', 'Office', 'Professional'))
- `amount` (INT)

### purchases
- `purchaseId` (PRIMARY KEY, UUID)
- `productId` (UUID, FOREIGN KEY -> products.productId)
- `timestamp` (TIMESTAMP)
- `quantity` (INT)
- `unitCost` (DECIMAL(10,2))
- `totalCost` (DECIMAL(10,2))

### purchase_summary
- `purchaseSummaryId` (PRIMARY KEY, UUID)
- `totalPurchased` (DECIMAL(12,2))
- `changePercentage` (DECIMAL(5,2))
- `date` (TIMESTAMP)

### sales
- `saleId` (PRIMARY KEY, UUID)
- `productId` (UUID, FOREIGN KEY -> products.productId)
- `timestamp` (TIMESTAMP)
- `quantity` (INT)
- `unitPrice` (DECIMAL(10,2))
- `totalAmount` (DECIMAL(10,2))

### sales_summary
- `salesSummaryId` (PRIMARY KEY, UUID)
- `totalValue` (DECIMAL(12,2))
- `changePercentage` (DECIMAL(5,2))
- `date` (TIMESTAMP)

## Indexes
- users_email_idx ON users(email)
- products_name_idx ON products(name)
- expenses_category_idx ON expenses(category)
- expense_by_category_summary_idx ON expense_by_category(expenseSummaryId)
- purchases_product_idx ON purchases(productId)
- sales_product_idx ON sales(productId)

## Relationships
1. expense_by_category -> expense_summary (Many-to-One)
   - Category expenses belong to one summary
   - A summary can have multiple category entries

2. purchases -> products (Many-to-One)
   - Purchases reference one product
   - Products can be purchased multiple times

3. sales -> products (Many-to-One)
   - Sales reference one product
   - Products can be sold multiple times

4. purchase_summary -> purchases (One-to-Many)
   - Summary aggregates multiple purchases

5. sales_summary -> sales (One-to-Many)
   - Summary aggregates multiple sales

## Notes
- All monetary values stored as DECIMAL to prevent floating-point errors
- Timestamps stored in UTC format
- UUIDs used for all primary keys
- Category fields use ENUM types to ensure data consistency
- Expense amounts use different precision levels based on context:
  - Expenses: High precision (12,2) for accounting needs
  - Sales/Purchases: Standard precision (10,2) for transaction records
- Change percentages store both positive and negative values
- Stock quantities validated to never be negative 