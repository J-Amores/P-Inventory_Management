import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { recordSale } from '@/lib/transaction-utils';
import { generateSaleId } from '@/lib/id-utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    // Build the where clause based on filters
    const whereClause: any = {};

    if (productId) {
      whereClause.productId = productId;
    }

    // Add date range filter if provided
    if (startDate || endDate) {
      whereClause.timestamp = {};

      if (startDate) {
        whereClause.timestamp.gte = new Date(startDate);
      }

      if (endDate) {
        whereClause.timestamp.lte = new Date(endDate);
      }
    }

    // Query sales with filters and include product details
    const sales = await prisma.sales.findMany({
      where: whereClause,
      include: {
        product: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.productId || !body.quantity || !body.unitPrice) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, quantity, unitPrice' },
        { status: 400 }
      );
    }

    const quantity = parseInt(body.quantity);
    const unitPrice = parseFloat(body.unitPrice);

    if (isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid quantity or unitPrice' },
        { status: 400 }
      );
    }

    // Use the transaction utility to record the sale
    const result = await recordSale(
      body.productId,
      quantity,
      unitPrice
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create sale' },
      { status: 500 }
    );
  }
} 