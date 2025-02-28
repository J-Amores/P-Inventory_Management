import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { recordPurchase } from '@/lib/transaction-utils';

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

    // Query purchases with filters and include product details
    const purchases = await prisma.purchases.findMany({
      where: whereClause,
      include: {
        product: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.productName || !body.quantity || !body.unitCost) {
      return NextResponse.json(
        { error: 'Missing required fields: productName, quantity, unitCost' },
        { status: 400 }
      );
    }

    const quantity = parseInt(body.quantity);
    const unitCost = parseFloat(body.unitCost);

    if (isNaN(quantity) || quantity <= 0 || isNaN(unitCost) || unitCost <= 0) {
      return NextResponse.json(
        { error: 'Invalid quantity or unitCost' },
        { status: 400 }
      );
    }

    // Use the transaction utility to record the purchase
    const result = await recordPurchase(
      body.productName,
      quantity,
      unitCost
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating purchase:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create purchase' },
      { status: 500 }
    );
  }
} 