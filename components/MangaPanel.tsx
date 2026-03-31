'use client'

import { motion } from 'framer-motion'

interface MangaPanelProps {
  children: React.ReactNode
  sfx?: string
  className?: string
  angle?: number
}

export default function MangaPanel({
  children,
  sfx,
  className = '',
  angle = 0,
}: MangaPanelProps) {
  return (
    <motion.div
      className={`panel p-6 ${className}`}
      style={{ rotate: angle }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      {sfx && (
        <span className="sfx font-display text-2xl top-3 right-4 text-accent">
          {sfx}
        </span>
      )}
      {children}
    </motion.div>
  )
}
