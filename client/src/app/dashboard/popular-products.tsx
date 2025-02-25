import { Avatar } from "../components/ui/avatar"

const popularProducts = [
  { name: "Widget A", sales: 1234, image: "/placeholder.svg?height=32&width=32" },
  { name: "Gadget B", sales: 987, image: "/placeholder.svg?height=32&width=32" },
  { name: "Tool C", sales: 765, image: "/placeholder.svg?height=32&width=32" },
  { name: "Device D", sales: 543, image: "/placeholder.svg?height=32&width=32" },
]

export function PopularProducts() {
  return (
    <div className="space-y-8">
      {popularProducts.map((product, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <img src={product.image || "/placeholder.svg"} alt={product.name} />
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sales.toLocaleString()} sales</p>
          </div>
          <div className="ml-auto font-medium">#{index + 1}</div>
        </div>
      ))}
    </div>
  )
}

