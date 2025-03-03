"use client"

import { useTheme } from "next-themes"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Box, BarChart3, Truck, Package, ShoppingCart, LifeBuoy, Settings, Layers, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <aside className="border-r bg-card/50 backdrop-blur">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <Box className="h-6 w-6" />
          <span className="font-bold">InventoryPro</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="px-4 py-4">
        <Input placeholder="Search inventory" className="bg-background/50" />
      </div>
      <nav className="space-y-2 px-2">
        <Link href="/dashboard" className="block">
          <Button 
            variant={pathname === "/dashboard" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Layers className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/inventory" className="block">
          <Button 
            variant={pathname === "/inventory" || pathname.startsWith("/inventory/") ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Package className="h-4 w-4" />
            Products
          </Button>
        </Link>
        <Link href="/suppliers" className="block">
          <Button 
            variant={pathname === "/suppliers" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Truck className="h-4 w-4" />
            Suppliers
          </Button>
        </Link>
        <Link href="/orders" className="block">
          <Button 
            variant={pathname === "/orders" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Button>
        </Link>
        <Link href="/expenses" className="block">
          <Button 
            variant={pathname === "/expenses" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Expenses
          </Button>
        </Link>
        <Link href="/support" className="block">
          <Button 
            variant={pathname === "/support" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <LifeBuoy className="h-4 w-4" />
            Support
          </Button>
        </Link>
        <Link href="/settings" className="block">
          <Button 
            variant={pathname === "/settings" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>
    </aside>
  )
}

