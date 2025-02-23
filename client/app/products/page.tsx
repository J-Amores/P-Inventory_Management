"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

import { Header } from "@/components/header"  
import { Rating } from "@/components/rating"

type Product = {
  id: string
  name: string
  price: number
  stockQuantity: number
  rating: number
}

type ProductFormData = Omit<Product, "id">

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock data for demonstration
  const products: Product[] = [
    { id: "1", name: "Product 1", price: 19.99, stockQuantity: 100, rating: 4.5 },
    { id: "2", name: "Product 2", price: 29.99, stockQuantity: 50, rating: 3.8 },
    { id: "3", name: "Product 3", price: 39.99, stockQuantity: 75, rating: 4.2 },
  ]

  const handleCreateProduct = (productData: ProductFormData) => {
    // Mock create product functionality
    console.log("Creating product:", productData)
    toast({
      title: "Product Created",
      description: `${productData.name} has been added to the inventory.`,
    })
    setIsDialogOpen(false)
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
            </DialogHeader>
            <CreateProductForm onSubmit={handleCreateProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <Image
            src={`/placeholder.svg?height=150&width=150`}
            alt={product.name}
            width={150}
            height={150}
            className="mb-3 rounded-2xl w-36 h-36"
          />
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground mt-1">Stock: {product.stockQuantity}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Rating rating={product.rating} />
      </CardFooter>
    </Card>
  )
}

function CreateProductForm({ onSubmit }: { onSubmit: (data: ProductFormData) => void }) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "name" ? value : Number(value) }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="stockQuantity">Stock Quantity</Label>
        <Input
          id="stockQuantity"
          name="stockQuantity"
          type="number"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Create Product</Button>
    </form>
  )
}

