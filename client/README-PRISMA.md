# Prisma Integration Guide

This project uses [Prisma](https://www.prisma.io/) as the ORM (Object-Relational Mapping) tool for database management. Prisma simplifies database access with type-safe queries and reduces the need for manual SQL.

## Getting Started

### Setup

The project is already configured to use Prisma with SQLite. To initialize the database:

```bash
# Install dependencies if you haven't already
npm install

# Set up the database (creates SQLite file, runs migrations, and seeds data)
npm run db:setup
```

### Database Location

The SQLite database file is stored at `prisma/dev.db`. This file contains all your application data.

## Available Commands

- `npm run db:setup` - Initializes the database, runs migrations, and seeds data
- `npm run db:push` - Quick way to update the database schema without migrations
- `npm run db:studio` - Opens Prisma Studio, a visual database editor
- `npm run db:generate` - Generates the Prisma client based on your schema

## Prisma Schema

The database schema is defined in `prisma/schema.prisma`. This file contains:

- Model definitions (tables)
- Fields (columns)
- Relationships between models
- Indexes and other database features

## How to Use Prisma in Your Code

### Importing the Prisma Client

```typescript
import { prisma } from '@/lib/prisma';
```

### Basic CRUD Operations

#### Create

```typescript
// Create a new product
const newProduct = await prisma.products.create({
  data: {
    productId: 'prod_123', // Generated using the id-utils.ts utility
    name: 'New Product',
    price: 29.99,
    stockQuantity: 100,
    rating: 4.5,
  },
});
```

#### Read

```typescript
// Get all products
const allProducts = await prisma.products.findMany();

// Get product by ID
const product = await prisma.products.findUnique({
  where: {
    productId: 'prod_123',
  },
});

// Get products with filters
const expensiveProducts = await prisma.products.findMany({
  where: {
    price: { gt: 50 },
    stockQuantity: { gt: 0 },
  },
  orderBy: {
    price: 'desc',
  },
});
```

#### Update

```typescript
// Update a product
const updatedProduct = await prisma.products.update({
  where: {
    productId: 'prod_123',
  },
  data: {
    price: 34.99,
    stockQuantity: { decrement: 1 },
  },
});
```

#### Delete

```typescript
// Delete a product
const deletedProduct = await prisma.products.delete({
  where: {
    productId: 'prod_123',
  },
});
```

### Relations

```typescript
// Get a product with its sales and purchases
const productWithRelations = await prisma.products.findUnique({
  where: {
    productId: 'prod_123',
  },
  include: {
    Sales: true,
    Purchases: true,
  },
});

// Get sales with product details
const salesWithProducts = await prisma.sales.findMany({
  include: {
    product: true,
  },
});
```

### Transactions

```typescript
// Run multiple operations in a transaction
const result = await prisma.$transaction(async (tx) => {
  // Operations here are part of the same transaction
  const product = await tx.products.findUnique({
    where: { productId: 'prod_123' },
  });
  
  // Update stock
  await tx.products.update({
    where: { productId: 'prod_123' },
    data: { stockQuantity: { decrement: 5 } },
  });
  
  // Create a sale
  const sale = await tx.sales.create({
    data: {
      saleId: 'sale_456',
      productId: 'prod_123',
      quantity: 5,
      unitPrice: product!.price,
      totalAmount: 5 * product!.price,
      timestamp: new Date(),
    },
  });
  
  return sale;
});
```

## Utility Functions

The project includes several utility files to help with Prisma operations:

- `src/lib/prisma.ts` - Configures and exports the Prisma client
- `src/lib/prisma-utils.ts` - Common Prisma operations
- `src/lib/id-utils.ts` - Functions for generating unique IDs
- `src/lib/transaction-utils.ts` - Functions for handling transactions

## Best Practices

1. Always use transactions when performing multiple related operations
2. Use the utility functions for common operations
3. Handle errors appropriately in your API routes
4. Use TypeScript type safety with Prisma models

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [SQLite Documentation](https://www.sqlite.org/docs.html) 