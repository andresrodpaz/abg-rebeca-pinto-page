import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abogada Rebeca Pinto Camacho | Extranjería · Residencia · Nacionalidad',
  description:
    'Abogada especializada en extranjería, residencia y nacionalidad. Arraigo, reagrupación familiar, renovaciones, TIE/NIE y visados. Despacho en C/ Parque de San Fernando, 3, Alcalá de Henares (Madrid). Atención presencial y online en toda España. Tel. 687 20 24 99.',
  keywords:
    'abogada extranjería, abogada Alcalá de Henares, residencia España, nacionalidad española, arraigo social, reagrupación familiar, renovación residencia, TIE, NIE, visados España',
  authors: [{ name: 'Rebeca Pinto Camacho' }],
  creator: 'Rebeca Pinto Camacho',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Abogada Rebeca Pinto Camacho | Extranjería · Residencia · Nacionalidad',
    description:
      'Abogada con trayectoria internacional, colegiada en el Ilustre Colegio de Abogados de Alcalá de Henares. Trato directo, sin intermediarios, seguimiento personalizado.',
    locale: 'es_ES',
    type: 'website',
    images: ['/hero-image.jpeg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6B1A20',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="antialiased font-sans text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
