import type { Metadata } from "next"
import { Inter } from "next/font/google"
import QueryProvider from "@/components/common/providers/QueryPrivider"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import Toaster from "@/components/common/toaster/Toaster"
import ThemeProvider from "@/components/common/providers/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <div className="w-screen h-screen bg-gray-100">
              <div className="w-full max-w-lg mx-auto bg-white">{children}</div>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
