-- CreateTable
CREATE TABLE "products" (
    "productId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "stockQuantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "sales" (
    "saleId" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" REAL NOT NULL,
    "totalAmount" REAL NOT NULL,
    CONSTRAINT "sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("productId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "expense_by_category" (
    "expenseByCategoryId" TEXT NOT NULL PRIMARY KEY,
    "expenseSummaryId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "expense_by_category_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "expense_summary" ("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sales_summary" (
    "salesSummaryId" TEXT NOT NULL PRIMARY KEY,
    "totalValue" REAL NOT NULL,
    "changePercentage" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "expense_summary" (
    "expenseSummaryId" TEXT NOT NULL PRIMARY KEY
);
