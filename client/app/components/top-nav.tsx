"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useStore } from "@/app/store/useStore";
import { Bell, Moon, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const isSidebarCollapsed = useStore((state) => state.isSidebarCollapsed);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <header
      className={cn(
        "fixed top-0 z-30 flex h-16 w-full items-center border-b px-4 transition-all duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
        isSidebarCollapsed ? "md:pl-20" : "md:pl-72"
      )}
    >
      <div className="flex flex-1 items-center justify-end space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 