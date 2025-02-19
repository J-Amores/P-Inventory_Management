export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="border rounded-lg p-4 space-y-4">
        <div>
          <label className="block mb-2">Business Name</label>
          <input
            type="text"
            placeholder="Enter business name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">Currency</label>
          <select className="w-full p-2 border rounded-md">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>
    </div>
  )
} 