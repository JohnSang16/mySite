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
      className={`panel p-2 w-full ${className}`}
      style={{ rotate: angle }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      {children}
      {sfx && (
        <span className="font-display sfx-reveal" style={{ position: 'absolute', bottom: '-1.4rem', left: 0, right: 0, textAlign: 'center', fontSize: '1.6rem', lineHeight: 1, color: '#ff2222', textShadow: '0 0 10px rgba(255,34,34,0.6)', width: '100%', opacity: 0, transition: 'opacity 0.2s ease', pointerEvents: 'none' }}>
          {sfx}
        </span>
      )}
    </motion.div>
  )
}
