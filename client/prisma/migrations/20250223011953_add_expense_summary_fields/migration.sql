/*
  Warnings:

  - Added the required column `date` to the `expense_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExpenses` to the `expense_summary` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expense_summary" (
    "expenseSummaryId" TEXT NOT NULL PRIMARY KEY,
    "totalExpenses" REAL NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_expense_summary" ("expenseSummaryId") SELECT "expenseSummaryId" FROM "expense_summary";
DROP TABLE "expense_summary";
ALTER TABLE "new_expense_summary" RENAME TO "expense_summary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
