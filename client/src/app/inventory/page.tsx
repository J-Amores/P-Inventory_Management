"use client"

import { ChangeEvent, useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"

interface InventoryItem {
  productId: string
  name: string
  price: number
  rating: number | null
  stockQuantity: number
}

const getStockStatus = (quantity: number): "Out of Stock" | "Low Stock" | "In Stock" => {
  if (quantity <= 50000) return "Out of Stock"
  if (quantity <= 200000) return "Low Stock"
  return "In Stock"
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory")
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data")
        }
        const data = await response.json()
        setInventoryItems(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setIsLoading(false)
      }
    }

    fetchInventory()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Card className="bg-destructive/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-lg font-semibold">Error</h2>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Filter inventory items based on search query
  const filteredItems = inventoryItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/inventory?productId=${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      setInventoryItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      )

      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    } finally {
      setItemToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button asChild>
          <Link href="/inventory/add">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>
            Manage your inventory items, track stock levels, and update product information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Total Items</h4>
              <div className="text-2xl font-bold">{inventoryItems.length}</div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Low Stock Items</h4>
              <div className="text-2xl font-bold">
                {inventoryItems.filter((item) => item.stockQuantity <= 200000).length}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Out of Stock Items</h4>
              <div className="text-2xl font-bold">
                {inventoryItems.filter((item) => item.stockQuantity <= 50000).length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const status = getStockStatus(item.stockQuantity)
                return (
                  <TableRow key={item.productId}>
                    <TableCell className="font-medium">{item.productId.substring(0, 8)}...</TableCell>
                    <TableCell>
                      <Link href={`/inventory/${item.productId}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {item.rating?.toFixed(1) ?? "N/A"}
                        {item.rating && <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.stockQuantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={status === "In Stock" ? "default" : status === "Low Stock" ? "secondary" : "destructive"}
                        className={status === "Low Stock" ? "bg-yellow-500 hover:bg-yellow-500/80" : ""}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/inventory/${item.productId}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/inventory/${item.productId}/edit`}>Edit item</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setItemToDelete(item.productId)
                              setDeleteDialogOpen(true)
                            }}
                            className="text-destructive"
                          >
                            Delete item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToDelete && handleDelete(itemToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  )
}

