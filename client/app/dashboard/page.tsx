import { ExpenseSummaryCard } from "@/app/dashboard/expense-summary-card";
import { ExpenseLineChart } from "@/app/dashboard/expense-pie-chart";
import expenseSummaryData from "@/Data/expenseSummary.json";
import expenseByCategoryData from "@/Data/expenseByCategory.json";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to your dashboard</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <ExpenseSummaryCard data={expenseSummaryData} />
        <ExpenseLineChart data={expenseByCategoryData} />
      </div>
    </div>
  );
} 