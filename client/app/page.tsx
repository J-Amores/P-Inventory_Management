import { DashboardWrapper } from '@/components/layout/DashboardWrapper'
import { StatCard } from '@/components/dashboard/StatCard'
import { CardSalesSummary } from '@/components/dashboard/CardSalesSummary'
import { CardPurchaseSummary } from '@/components/dashboard/CardPurchaseSummary'
import { CardExpenseSummary } from '@/components/dashboard/CardExpenseSummary'
import { CardPopularProducts } from '@/components/dashboard/CardPopularProducts'

export default function DashboardPage() {
  return (
    <DashboardWrapper>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales"
          value="$12,345"
          description="+20% from last month"
          trend="up"
        />
        <StatCard 
          title="Total Expenses"
          value="$4,567"
          description="-5% from last month"
          trend="down"
        />
        <StatCard 
          title="Total Products"
          value="156"
          description="+12 new products"
          trend="up"
        />
        <StatCard 
          title="Low Stock"
          value="8"
          description="Products below threshold"
          trend="warning"
        />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <CardSalesSummary />
        <CardPurchaseSummary />
        <CardExpenseSummary />
      </div>

      <div className="mt-4">
        <CardPopularProducts />
      </div>
    </DashboardWrapper>
  )
}
