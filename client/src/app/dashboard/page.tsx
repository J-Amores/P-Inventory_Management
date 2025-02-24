"use client"

import { CalendarIcon, ChevronDownIcon, SearchIcon, LayoutDashboard, ReceiptIcon, PackageIcon, Settings, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import NavBar from "../components/nav-bar"
// Importing recharts for the bar chart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", value: 1500 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 2800 },
  { month: "Apr", value: 5000 },
  { month: "May", value: 4200 },
  { month: "Jun", value: 4500 },
  { month: "Jul", value: 3500 },
  { month: "Aug", value: 2500 },
  { month: "Sep", value: 5000 },
  { month: "Oct", value: 5500 },
  { month: "Nov", value: 2000 },
  { month: "Dec", value: 3000 },
]

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
]

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Expenses",
    icon: ReceiptIcon,
    href: "/expenses",
  },
  {
    label: "Inventory",
    icon: PackageIcon,
    href: "/inventory",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

const DashboardPage = () =>  {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
     
      {/* Top Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="p-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-white">
                Overview
              </Button>
              <Button variant="ghost" className="text-gray-400">
                Analytics
              </Button>
              <Button variant="ghost" className="text-gray-400">
                Reports
              </Button>
              <Button variant="ghost" className="text-gray-400">
                Notifications
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Jan 20, 2023 - Feb 09, 2023
            </Button>
            <Button>Download</Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Total Revenue</p>
                <h2 className="text-2xl font-bold">$45,231.89</h2>
                <p className="text-green-500 text-sm">+20.1% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Subscriptions</p>
                <h2 className="text-2xl font-bold">+2350</h2>
                <p className="text-green-500 text-sm">+180.1% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Sales</p>
                <h2 className="text-2xl font-bold">+12,234</h2>
                <p className="text-green-500 text-sm">+19% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Active Now</p>
                <h2 className="text-2xl font-bold">+573</h2>
                <p className="text-green-500 text-sm">+201 since last hour</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <Card className="lg:col-span-4 bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Bar dataKey="value" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <p className="text-sm text-gray-400 mb-4">You made 265 sales this month.</p>
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{sale.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{sale.name}</p>
                        <p className="text-sm text-gray-400">{sale.email}</p>
                      </div>
                    </div>
                    <p className="font-medium">{sale.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
export default DashboardPage;