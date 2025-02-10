import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Root Finder',
  description: 'By Jedi Natakorn',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
