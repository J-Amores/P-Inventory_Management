import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Inventory management",
};

export default function InventoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <p>Inventory management page</p>
        </div>
      </div>
    </div>
  );
} 