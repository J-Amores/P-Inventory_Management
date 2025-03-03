"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { InventoryForm } from "@/app/components/inventory/InventoryForm"
import { Card, CardContent } from "@/app/components/ui/card"

interface Product {
  productId: string
  name: string
  price: number
  rating: number | null
  stockQuantity: number
}

export default function EditInventoryPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/inventory/${params.productId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product")
      }
    }

    fetchProduct()
  }, [params.productId])

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

  if (!product) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <InventoryForm mode="edit" initialData={product} />
    </div>
  )
} 