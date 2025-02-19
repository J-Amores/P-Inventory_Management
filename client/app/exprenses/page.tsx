export default function ExpensesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Add Expense
        </button>
      </div>
      <div className="border rounded-lg p-4 text-center text-muted-foreground">
        No expenses recorded
      </div>
    </div>
  )
} 