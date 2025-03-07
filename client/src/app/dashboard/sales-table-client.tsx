"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { formatDistanceToNow } from "date-fns"

export interface SalesTableClientProps {
  salesData: Array<{
    id: string;
    productId: string;
    productName: string;
    date: Date;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }>;
}

export function SalesTableClient({ salesData }: SalesTableClientProps) {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Sales</CardTitle>
        <CardDescription>Recent sales transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.length > 0 ? (
              salesData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{sale.productName}</div>
                      <div className="text-xs text-muted-foreground">{sale.productId.substring(0, 8)}...</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell className="text-right">{sale.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(sale.unitPrice)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(sale.totalAmount)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No sales data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 