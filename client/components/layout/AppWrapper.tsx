import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b h-14 fixed top-0 w-full bg-background z-30 flex items-center px-4">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        <div className="font-semibold">Your App Name</div>
      </nav>

      <div className="flex flex-1 pt-14">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block w-64 fixed inset-y-0 z-20 mt-14">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 md:pl-64">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/products" },
    { label: "Inventory", href: "/inventory" },
    { label: "Expenses", href: "/expenses" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-full w-64 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full block"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}