import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expenses",
  description: "Expenses tracking",
};

export default function ExpensesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <p>Expenses tracking page</p>
        </div>
      </div>
    </div>
  );
} 