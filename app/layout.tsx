import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rebeca Pinto Camacho · Abogada de Extranjería en Alcalá de Henares',
  description:
    'Asesoría legal especializada en extranjería, residencia y nacionalidad española. Despacho en Alcalá de Henares. Consulta presencial u online desde 50 €.',
  keywords: [
    'abogada extranjería Alcalá de Henares',
    'NIE residencia arraigo',
    'nacionalidad española',
    'Rebeca Pinto Camacho',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Rebeca Pinto Camacho · Abogada de Extranjería',
    description: 'Especializada en extranjería, residencia y nacionalidad española.',
    locale: 'es_ES',
    type: 'website',
  },
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
      </body>
    </html>
  )
}
