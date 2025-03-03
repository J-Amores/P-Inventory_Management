"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"

// Sample inventory data - in a real app, this would come from an API or database
const inventoryItems = [
  {
    productId: "d35623ee-bef6-42b2-8776-2f99f8bb4782",
    name: "Pinkscale Blazing Star",
    price: 456.04,
    rating: 2.25,
    stockQuantity: 124834,
  },
  {
    productId: "8ac1ac77-7358-425e-be16-0bdde9f02e59",
    name: "Gila Milkvetch",
    price: 899.05,
    rating: 3.56,
    stockQuantity: 799402,
  },
  {
    productId: "1afc136b-4d9f-4e8e-aace-8e1df908a404",
    name: "Rocky Mountain Zinnia",
    price: 264.37,
    rating: 3.23,
    stockQuantity: 842192,
  },
  {
    productId: "af84cc12-4fea-4f58-aece-f2ce92ca9580",
    name: "Guadalupe Suncup",
    price: 555.93,
    rating: 4.09,
    stockQuantity: 236333,
  },
  {
    productId: "86e3bb1c-2f5d-4774-98f3-4df7cddd0a0f",
    name: "Saline Phlox",
    price: 82.62,
    rating: 4.8,
    stockQuantity: 601208,
  },
  {
    productId: "26b017c6-06d8-443f-9b4a-d6b1cee6f4c0",
    name: "Common Brighteyes",
    price: 435.44,
    rating: 0.27,
    stockQuantity: 124068,
  },
  {
    productId: "440c9e80-6bf8-4eb3-b2d2-f81936d67de3",
    name: "Vermejo Phlox",
    price: 759.15,
    rating: 2.46,
    stockQuantity: 234525,
  },
  {
    productId: "98255f4e-40a6-470f-89a5-0792729f8947",
    name: "Purple Marshlocks",
    price: 974.99,
    rating: 4.82,
    stockQuantity: 739009,
  },
  {
    productId: "2a339fb2-f9f3-43bc-a85a-b217a0a38f12",
    name: "Hamatocaulis Moss",
    price: 639.9,
    rating: 1.17,
    stockQuantity: 754285,
  },
  {
    productId: "8a8391b2-b4ac-4847-b652-66ffd8d65875",
    name: "Wax Myrtle",
    price: 62.95,
    rating: 4.6,
    stockQuantity: 205240,
  },
  {
    productId: "be2157fb-7454-405e-9511-bf7ba81b7726",
    name: "Thladiantha",
    price: 699.0,
    rating: 1.65,
    stockQuantity: 399124,
  },
  {
    productId: "fdf1ba3d-fa06-4ce5-90ff-d081c5d37176",
    name: "Common Tarweed",
    price: 899.61,
    rating: 2.39,
    stockQuantity: 196884,
  },
  {
    productId: "afded6df-058f-477d-9878-e0e0b1d3dff3",
    name: "Smooth Phlox",
    price: 575.6,
    rating: 4.38,
    stockQuantity: 673658,
  },
  {
    productId: "daa29167-82a7-474b-9687-b8b903e7ec69",
    name: "Lemmon's Beggarticks",
    price: 492.35,
    rating: 1.07,
    stockQuantity: 205143,
  },
  {
    productId: "ccb83982-71f3-4497-bad8-7e64c6920dc6",
    name: "Globe Fimbry",
    price: 304.69,
    rating: 2.62,
    stockQuantity: 388596,
  },
  {
    productId: "1936d406-e89e-40e4-bff7-1827532269d4",
    name: "Columbia Milkvetch",
    price: 845.15,
    rating: 2.21,
    stockQuantity: 631658,
  },
  {
    productId: "c849a535-5f8b-47e3-889c-015693a644ac",
    name: "Girdlepod",
    price: 880.09,
    rating: 1.49,
    stockQuantity: 65457,
  },
  {
    productId: "0c3e80ee-59b3-4fc4-b760-8b07acc2d3ae",
    name: "Lindley's Clerodendrum",
    price: 51.66,
    rating: 1.53,
    stockQuantity: 263383,
  },
  {
    productId: "d8f5bee3-f3eb-4071-a124-6b857e0fd798",
    name: "Arizonia Dry Rock Moss",
    price: 746.88,
    rating: 4.71,
    stockQuantity: 616812,
  },
  {
    productId: "8d15de86-0e4a-4414-9166-7a33610202d3",
    name: "Clamshell Orchid",
    price: 17.1,
    rating: 0.79,
    stockQuantity: 604774,
  },
]

const purchaseHistory = [
  {
    purchaseId: "5035f91e-4a29-411a-8779-17f6105675f1",
    productId: "d35623ee-bef6-42b2-8776-2f99f8bb4782",
    timestamp: "2007-09-28T13:56:51Z",
    quantity: 875,
    unitCost: 4163.31,
    totalCost: 7871.43,
  },
  {
    purchaseId: "85841cb5-2132-40f2-b923-9769ee3c199b",
    productId: "8ac1ac77-7358-425e-be16-0bdde9f02e59",
    timestamp: "2015-02-01T13:04:43Z",
    quantity: 471,
    unitCost: 5673.17,
    totalCost: 485.48,
  },
  {
    purchaseId: "de384851-f898-4495-99b8-73448bb470bf",
    productId: "1afc136b-4d9f-4e8e-aace-8e1df908a404",
    timestamp: "2010-10-22T19:38:20Z",
    quantity: 37,
    unitCost: 3835.06,
    totalCost: 4202.25,
  },
  {
    purchaseId: "e0b0486c-6396-42b7-9a84-e21bd3a88600",
    productId: "af84cc12-4fea-4f58-aece-f2ce92ca9580",
    timestamp: "2020-01-25T13:30:58Z",
    quantity: 201,
    unitCost: 1822.27,
    totalCost: 8028.29,
  },
  {
    purchaseId: "822e6025-e582-4e8c-b143-dc5ebad4c18c",
    productId: "86e3bb1c-2f5d-4774-98f3-4df7cddd0a0f",
    timestamp: "2011-12-30T12:54:41Z",
    quantity: 789,
    unitCost: 9238.02,
    totalCost: 5086.57,
  },
  {
    purchaseId: "dd6d3a14-92d5-40f4-9bf4-92fb4043882c",
    productId: "26b017c6-06d8-443f-9b4a-d6b1cee6f4c0",
    timestamp: "2014-02-26T01:13:31Z",
    quantity: 251,
    unitCost: 2443.32,
    totalCost: 9520.42,
  },
  {
    purchaseId: "434e5415-cb23-4170-b1e7-bc85737dc8c7",
    productId: "440c9e80-6bf8-4eb3-b2d2-f81936d67de3",
    timestamp: "2001-11-18T23:49:33Z",
    quantity: 418,
    unitCost: 5085.79,
    totalCost: 5394.89,
  },
  {
    purchaseId: "963a92ab-e092-4f3d-8b6a-5ab803550d78",
    productId: "98255f4e-40a6-470f-89a5-0792729f8947",
    timestamp: "2020-04-27T08:53:44Z",
    quantity: 926,
    unitCost: 8626.52,
    totalCost: 3526.35,
  },
  {
    purchaseId: "b4aebfdc-bce9-4e90-89fc-5098447d687a",
    productId: "2a339fb2-f9f3-43bc-a85a-b217a0a38f12",
    timestamp: "2020-02-05T13:02:55Z",
    quantity: 754,
    unitCost: 9052.79,
    totalCost: 8035.97,
  },
  {
    purchaseId: "de2ba6a2-c291-4a60-aad1-23d5749c5847",
    productId: "8a8391b2-b4ac-4847-b652-66ffd8d65875",
    timestamp: "2020-05-07T16:41:13Z",
    quantity: 365,
    unitCost: 1105.02,
    totalCost: 361.77,
  },
]

const getStockStatus = (quantity: number) => {
  if (quantity <= 50000) return "Out of Stock"
  if (quantity <= 200000) return "Low Stock"
  return "In Stock"
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function InventoryItemPage({ params }: { params: { productId: string } }) {
  const router = useRouter()
  const { productId } = params

  const item = inventoryItems.find((item) => item.productId === productId)
  const itemPurchases = purchaseHistory.filter((purchase) => purchase.productId === productId)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  if (!item) {
    return (
      <div className="container mx-auto py-6">
        <Link href="/inventory" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Link>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[400px]">
            <h2 className="text-2xl font-bold mb-2">Item Not Found</h2>
            <p className="text-muted-foreground mb-6">The inventory item you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/inventory">Return to Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = getStockStatus(item.stockQuantity)

  // In a real application, these functions would make API calls
  const handleEdit = () => {
    // Implement edit functionality
    console.log("Editing item", item.productId)
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Deleting item", item.productId)
    setIsDeleteOpen(false)
    router.push("/inventory")
  }

  return (
    <div className="container mx-auto py-6">
      <Link href="/inventory" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{item.name}</CardTitle>
                <CardDescription>{item.productId}</CardDescription>
              </div>
              <Badge 
                variant={
                  status === "In Stock"
                    ? "default"
                    : status === "Low Stock"
                    ? "secondary"
                    : "destructive"
                }
                className={
                  status === "In Stock"
                    ? "bg-green-500"
                    : status === "Low Stock"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }
              >
                {status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Price:</dt>
                      <dd>${item.price.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Rating:</dt>
                      <dd className="flex items-center">
                        {item.rating.toFixed(1)}
                        <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Quantity:</dt>
                      <dd>{item.stockQuantity.toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Inventory Item</DialogTitle>
                    <DialogDescription>
                      Make changes to the inventory item. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue={item.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" defaultValue={item.price} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" defaultValue={item.stockQuantity} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input id="rating" type="number" step="0.1" min="0" max="5" defaultValue={item.rating} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEdit}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Inventory Item</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this item? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Recent purchases for this item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {itemPurchases.length > 0 ? (
                  itemPurchases.slice(0, 5).map((purchase) => (
                    <div key={purchase.purchaseId} className="border-l-2 border-muted pl-4 py-2">
                      <p className="text-sm font-medium">Purchased {purchase.quantity} units</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(purchase.timestamp)} - ${purchase.totalCost.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No purchase history available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

