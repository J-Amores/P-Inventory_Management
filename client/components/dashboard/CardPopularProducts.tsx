"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CardPopularProducts() {
  const products = [
    { name: "Product A", sales: 120, stock: 50 },
    { name: "Product B", sales: 100, stock: 30 },
    { name: "Product C", sales: 80, stock: 20 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.name} className="flex justify-between items-center">
              <span>{product.name}</span>
              <span>Sales: {product.sales}</span>
              <span>Stock: {product.stock}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 