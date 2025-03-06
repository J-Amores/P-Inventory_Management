"use client"

import { Sidebar } from "./sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="grid lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
} 