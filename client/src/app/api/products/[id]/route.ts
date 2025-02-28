import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    const product = await prisma.products.findUnique({
      where: { productId },
      include: {
        Sales: true,
        Purchases: true
      }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const body = await request.json();
    
    const updatedProduct = await prisma.products.update({
      where: { productId },
      data: {
        name: body.name,
        price: parseFloat(body.price),
        rating: body.rating ? parseFloat(body.rating) : null,
        stockQuantity: parseInt(body.stockQuantity),
      },
    });
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    // First, delete any related Sales and Purchases
    await prisma.sales.deleteMany({
      where: { productId },
    });
    
    await prisma.purchases.deleteMany({
      where: { productId },
    });
    
    // Then delete the product
    await prisma.products.delete({
      where: { productId },
    });
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 