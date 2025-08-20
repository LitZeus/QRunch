'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import { AnimatePresence } from 'framer-motion'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter">
        <ErrorBoundary>
          <ServiceWorkerRegistration />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </ErrorBoundary>
      </body>
    </html>
  )
}
