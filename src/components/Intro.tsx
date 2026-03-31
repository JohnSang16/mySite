import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface IntroProps {
  onDone: () => void
}

export default function Intro({ onDone }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
const [phase, setPhase] = useState<'idle' | 'playing'>('idle')
  const [textHovered, setTextHovered] = useState(false)

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('playing')
    videoRef.current!.play()
  }

  const handleEnded = () => {
    onDone()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#000', zIndex: 1000, cursor: 'none' }}
      onClick={handleClick}
    >
      {/* Click me text */}
      {phase === 'idle' && (
        <motion.p
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [0.85, 1.04, 1], opacity: 1, y: [0, -10, 0] }}
          transition={{
            scale: { duration: 2.4, ease: 'easeOut' },
            opacity: { duration: 1.2, ease: 'easeOut' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
          onMouseEnter={() => setTextHovered(true)}
          onMouseLeave={() => setTextHovered(false)}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            color: textHovered ? 'rgba(255,255,255,0.65)' : '#fff',
            letterSpacing: '0.12em',
            userSelect: 'none',
            cursor: 'none',
            transition: 'color 0.2s ease, text-shadow 0.2s ease',
            textShadow: textHovered
              ? '0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.15)'
              : 'none',
          }}
        >
          click me
        </motion.p>
      )}

      {/* Video — hidden until clicked */}
      <video
        ref={videoRef}
        src="/videos/ulquiorraCiferTeleport.mp4"
        onEnded={handleEnded}
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: phase === 'playing' ? 'block' : 'none',
          pointerEvents: 'none',
        }}
      />

    </div>
  )
}
