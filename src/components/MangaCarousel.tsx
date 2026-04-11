import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MANGA_IMAGES = [
  { src: '/manga/musashiTUFFAH.jpg', alt: 'Musashi' },
  // add more: { src: '/manga/yourImage.jpg', alt: 'Title' }
]

const INTERVAL_MS = 5000

export default function MangaCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setIndex(i => (i + dir + MANGA_IMAGES.length) % MANGA_IMAGES.length)
  }, [])

  useEffect(() => {
    if (MANGA_IMAGES.length <= 1) return
    const id = setInterval(() => go(1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [go])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div
      className="fixed"
      style={{
        right: '1.5%',
        bottom: '2%',
        zIndex: 4,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        width: 'clamp(160px, 18vw, 280px)',
      }}
    >
      {/* Panel frame */}
      <div style={{ position: 'relative', width: '100%' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{
              border: '2px solid rgba(250,243,243,0.85)',
              borderRadius: '10px',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.03)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(2px)',
              opacity: 0.55,
              overflow: 'hidden',
            }}
          >
            <img
              src={MANGA_IMAGES[index].src}
              alt={MANGA_IMAGES[index].alt}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '0.4rem' }}>
          {MANGA_IMAGES.map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: i === index ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            data-clickable
            onClick={() => go(-1)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '2rem',
              padding: '0.2rem 0.75rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.65rem',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.1em',
              cursor: 'none',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s ease',
            }}
          >
            ←
          </button>
          <button
            data-clickable
            onClick={() => go(1)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '2rem',
              padding: '0.2rem 0.75rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.65rem',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.1em',
              cursor: 'none',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s ease',
            }}
          >
            →
          </button>
        </div>
    </div>
  )
}
