export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Add</button>
          <button className="px-4 py-2 border rounded-md">Export</button>
        </div>
      </div>
      <div className="border rounded-lg p-4 text-center text-muted-foreground">
        No items in inventory
      </div>
    </div>
  )
} 