export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border p-3 rounded-lg">
          <h3>Products</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="border p-3 rounded-lg">
          <h3>Low Stock</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="border p-3 rounded-lg">
          <h3>Expenses</h3>
          <p className="text-2xl">$0</p>
        </div>
        <div className="border p-3 rounded-lg">
          <h3>Value</h3>
          <p className="text-2xl">$0</p>
        </div>
      </div>
    </div>
  )
} 