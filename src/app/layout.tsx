import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationHeader from "../components/navigation-header"

// Force dynamic rendering
export const dynamic = "force-dynamic"
export const revalidate = 0

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wear the Vibe | Music That Matches Your Look",
  description: "Get music recommendations based on your outfit colors",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationHeader />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
