"use client";

import { Sidebar } from "@/app/components/sidebar";
import { TopNav } from "@/app/components/top-nav";
import { useStore } from "@/app/store/useStore";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const isSidebarCollapsed = useStore((state) => state.isSidebarCollapsed);

  return (
    <div className={cn("min-h-screen", isDarkMode ? "dark" : "")}>
      <Sidebar />
      <TopNav />
      <div
        className={cn(
          "pt-16 transition-all duration-300",
          isSidebarCollapsed ? "pl-20" : "pl-72"
        )}
      >
        {children}
      </div>
    </div>
  );
} 