"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useStore } from "@/app/store/useStore";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  // Add more icons as needed
} from "lucide-react";
import Link from "next/link";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  // Add more links as needed
];

export function Sidebar() {
  const pathname = usePathname();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const isSidebarCollapsed = useStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r transition-all duration-300 ease-in-out",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
        isSidebarCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-4">
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold">Your Logo</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation Links */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-4">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === link.href && "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  <link.icon className={cn("h-5 w-5", isSidebarCollapsed ? "mx-auto" : "mr-2")} />
                  {!isSidebarCollapsed && <span>{link.title}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 