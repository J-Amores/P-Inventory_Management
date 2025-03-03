"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

interface InventoryFormProps {
  initialData?: {
    productId?: string
    name: string
    price: number
    rating?: number | null
    stockQuantity: number
  }
  mode: "add" | "edit"
}

export function InventoryForm({ initialData, mode }: InventoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    price: initialData?.price?.toString() ?? "",
    rating: initialData?.rating?.toString() ?? "",
    stockQuantity: initialData?.stockQuantity?.toString() ?? "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = mode === "add" ? "/api/inventory" : "/api/inventory"
      const method = mode === "add" ? "POST" : "PUT"
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          mode === "edit"
            ? { ...formData, productId: initialData?.productId }
            : formData
        ),
      })

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      router.push("/inventory")
      router.refresh()
    } catch (error) {
      console.error("Error saving product:", error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "add" ? "Add New Item" : "Edit Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (optional)</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rating: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockQuantity">Stock Quantity</Label>
            <Input
              id="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, stockQuantity: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : mode === "add" ? "Add Item" : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 