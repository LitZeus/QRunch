import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Login - The Grand Plate',
  description: 'Admin login for The Grand Plate cafe management system',
}

export const viewport: Viewport = {
  themeColor: '#F1D3CE',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 