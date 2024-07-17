import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/context/theme-provider"
import { ImageProvider } from "@/context/image-provider"
import "./globals.css"

const jetBrains = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Peanuts blog",
  description: "A blog about projects and studys.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={jetBrains.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <ImageProvider>
            {children}
          </ImageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
