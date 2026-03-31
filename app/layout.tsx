import type { Metadata } from 'next'
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'John Sang — Portfolio',
  description: 'Discovery portfolio — High-contrast manga panel layout.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
