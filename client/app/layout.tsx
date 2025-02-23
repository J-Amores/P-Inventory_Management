import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Modern inventory management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <div className="flex min-h-screen">
           
            <main className="flex-1">
             
              <div className="p-8">{children}</div>
            </main>
          </div>
       
      </body>
    </html>
  )
}

