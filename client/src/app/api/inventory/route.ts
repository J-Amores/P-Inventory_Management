import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const product = await prisma.products.create({
      data: {
        productId: uuidv4(),
        name: data.name,
        price: parseFloat(data.price),
        rating: data.rating ? parseFloat(data.rating) : null,
        stockQuantity: parseInt(data.stockQuantity),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const product = await prisma.products.update({
      where: {
        productId: data.productId,
      },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        rating: data.rating ? parseFloat(data.rating) : null,
        stockQuantity: parseInt(data.stockQuantity),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    await prisma.products.delete({
      where: {
        productId: productId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
} 