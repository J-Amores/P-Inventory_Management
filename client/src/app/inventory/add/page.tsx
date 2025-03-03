import { InventoryForm } from "@/app/components/inventory/InventoryForm"

export default function AddInventoryPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <InventoryForm mode="add" />
    </div>
  )
} 