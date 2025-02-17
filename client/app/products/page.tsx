import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products management",
};

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <p>Products management page</p>
        </div>
      </div>
    </div>
  );
} 