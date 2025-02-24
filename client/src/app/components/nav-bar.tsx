"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../components/ui/button"
import { LayoutDashboard, Receipt, Package, Settings, Menu, ChevronDownIcon, SearchIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Input } from "../components/ui/input"

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Expenses",
    icon: Receipt,
    href: "/expenses",
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/inventory",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="border-b">
        <div className="flex items-center h-16 px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2" aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] bg-gray-900 p-0">
              <div className="flex flex-col gap-4 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href ? "bg-gray-800 text-white" : "text-gray-400",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex md:items-center md:gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-white",
                  pathname === route.href ? "text-white" : "text-gray-400",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search..." className="pl-8 bg-gray-900 border-gray-800" />
            </div>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <span>Alicia Koch</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
    </nav>
  )
}

