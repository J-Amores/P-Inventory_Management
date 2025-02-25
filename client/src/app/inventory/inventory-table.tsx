import { Avatar } from "../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { MoreHorizontal } from "lucide-react"

const inventoryItems = [
  {
    name: "Widget A",
    sku: "WID-001",
    price: "$24.99",
    quantity: 500,
    value: "$12,495",
    category: "Electronics",
    lastUpdated: "18.08.2023",
    status: "In Stock",
  },
  {
    name: "Gadget B",
    sku: "GAD-002",
    price: "$49.99",
    quantity: 250,
    value: "$12,497.50",
    category: "Electronics",
    lastUpdated: "17.08.2023",
    status: "Low Stock",
  },
  {
    name: "Tool C",
    sku: "TOOL-003",
    price: "$99.99",
    quantity: 100,
    value: "$9,999",
    category: "Hardware",
    lastUpdated: "16.08.2023",
    status: "In Stock",
  },
]

export function InventoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventoryItems.map((item) => (
          <TableRow key={item.sku}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <img src={`/placeholder.svg?height=24&width=24`} alt={item.name} />
                </Avatar>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.sku}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.lastUpdated}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                  item.status === "In Stock" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {item.status}
              </span>
            </TableCell>
            <TableCell>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

