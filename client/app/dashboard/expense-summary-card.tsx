import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ExpenseSummaryData {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

interface ExpenseSummaryCardProps {
  data: ExpenseSummaryData[];
}

export function ExpenseSummaryCard({ data }: ExpenseSummaryCardProps) {
  // Get the most recent expense summary
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latestExpense = sortedData[0];
  
  // Calculate the previous expense for comparison
  const previousExpense = sortedData[1];
  const percentageChange = previousExpense
    ? ((latestExpense.totalExpenses - previousExpense.totalExpenses) / previousExpense.totalExpenses) * 100
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(latestExpense.totalExpenses)}</div>
        <p className="text-xs text-muted-foreground">
          {percentageChange > 0 ? "+" : ""}
          {percentageChange.toFixed(2)}% from last period
        </p>
      </CardContent>
    </Card>
  );
} 