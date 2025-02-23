export function Sidebar() {
  return (
    <div className="w-64 border-r min-h-screen p-4">
      <nav className="space-y-2">
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Dashboard</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Inventory</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Expenses</a>
      </nav>
    </div>
  )
} 