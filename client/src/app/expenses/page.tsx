import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import ExpensesOverview from "@/app/components/expenses/expenses-overview"
import ExpensesByCategory from "@/app/components/expenses/expenses-by-category"
import ExpensesTable from "@/app/components/expenses/expenses-table"
import { getExpenseSummaries, getExpensesByCategory } from "@/lib/expense-utils"

export default async function ExpensesPage() {
  // Fetch all data server-side
  const expenseSummaries = await getExpenseSummaries()
  const expensesByCategory = await getExpensesByCategory()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">Monitor and analyze your company expenses</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <ExpensesOverview expenseSummaries={expenseSummaries} />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <ExpensesByCategory expensesByCategory={expensesByCategory} />
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>
                Detailed list of all company expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesTable expenseSummaries={expenseSummaries} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

