import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Application settings",
};

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <p>Settings configuration page</p>
        </div>
      </div>
    </div>
  );
} 