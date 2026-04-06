import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from '@vercel/analytics/next' 

const animeAce = localFont({
  src: [
    {
      path: '../public/fonts/anime_ace_bb/animeace2bb_tt/animeace2_reg.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/anime_ace_bb/animeace2bb_tt/animeace2_bld.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/anime_ace_bb/animeace2bb_tt/animeace2_ital.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-anime-ace',
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
    <html lang="en" className={animeAce.variable}>
      <body>
        <CustomCursor />
        {children}
        <Analytics /> 
      </body>
    </html>
  )
}