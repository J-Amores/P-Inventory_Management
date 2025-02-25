"use client"

import { useTheme } from "next-themes"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Box, BarChart3, Truck, Package, ShoppingCart, LifeBuoy, Settings, Layers, Sun, Moon } from "lucide-react"

export function Sidebar() {
  const { theme, setTheme } = useTheme()

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
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Layers className="h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Package className="h-4 w-4" />
          Products
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Truck className="h-4 w-4" />
          Suppliers
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ShoppingCart className="h-4 w-4" />
          Orders
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <BarChart3 className="h-4 w-4" />
          Reports
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LifeBuoy className="h-4 w-4" />
          Support
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  )
}

