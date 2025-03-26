import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import { AnimatePresence } from 'framer-motion'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'The Grand Plate',
  description: 'Digital menu and ordering system for The Grand Plate',
  manifest: '/manifest.json',
  themeColor: '#D1E9F6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Grand Plate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter">
        <ServiceWorkerRegistration />
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  )
}
