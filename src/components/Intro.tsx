import { useRef } from 'react'
import { motion } from 'framer-motion'

interface IntroProps {
  onDone: () => void
}

export default function Intro({ onDone }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="fixed inset-0" style={{ background: '#000', zIndex: 99999, cursor: 'none' }}>
      <video
        ref={videoRef}
        src="/videos/ulquiorraCiferTeleport.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onDone}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Skip button */}
      <motion.button
        data-clickable
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={onDone}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '0.25rem',
          padding: '0.35rem 0.9rem',
          color: '#fff',
          fontSize: '0.75rem',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'none',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        skip
      </motion.button>
    </div>
  )
}
