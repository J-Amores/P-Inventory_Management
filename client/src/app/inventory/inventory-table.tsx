import { Avatar } from "../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { prisma } from "@/lib/prisma"

// Function to fetch products from the database
async function getProducts() {
  try {
    const products = await prisma.products.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to determine stock status
function getStockStatus(quantity: number) {
  if (quantity <= 0) {
    return "Out of Stock";
  } else if (quantity < 100) {
    return "Low Stock";
  } else {
    return "In Stock";
  }
}

// Function to format currency values consistently
function formatCurrency(value: number): string {
  if (value >= 100000) {
    // Round to nearest 100K for large values
    const roundedValue = Math.round(value / 100000) * 100000;
    if (roundedValue >= 1000000) {
      return `$${(roundedValue / 1000000).toFixed(1)}M`;
    } else {
      return `$${(roundedValue / 1000).toFixed(0)}K`;
    }
  } else if (value >= 1000) {
    // Format thousands with K
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    // Format smaller values normally
    return `$${value.toFixed(2)}`;
  }
}

// Function to get product image based on product ID
function getProductImage(productId: string): string {
  // Use the last character of the product ID to determine which image to use
  const lastChar = productId.charAt(productId.length - 1);
  const charCode = lastChar.charCodeAt(0);
  
  // Map to one of the three product images
  const imageIndex = (charCode % 3) + 1;
  return `/assets/product${imageIndex}.png`;
}

export async function InventoryTable() {
  const products = await getProducts();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const stockStatus = getStockStatus(product.stockQuantity);
          const totalValue = product.price * product.stockQuantity;
          const productImage = getProductImage(product.productId);
          
          return (
            <TableRow key={product.productId}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <img 
                      src={productImage} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.productId.substring(0, 8)}...</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stockQuantity.toLocaleString()}</TableCell>
              <TableCell>{formatCurrency(totalValue)}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                    stockStatus === "In Stock" 
                      ? "bg-green-500/10 text-green-500" 
                      : stockStatus === "Low Stock"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {stockStatus}
                </span>
              </TableCell>
              <TableCell>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}

