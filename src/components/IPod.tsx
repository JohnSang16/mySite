import { motion, AnimatePresence } from 'framer-motion'

interface IPodProps {
  visible: boolean
  isPlaying: boolean
  onPlayPause: () => void
  onSkipNext: () => void
  onSkipPrev: () => void
  onSeekForward: () => void
  onSeekBack: () => void
  trackName?: string
  albumArt?: string
  sm?: boolean
  onClose?: () => void
}

export default function IPod({ visible, isPlaying, onPlayPause, onSkipNext, onSkipPrev, onSeekForward, onSeekBack, trackName = 'Angel With A Shotgun', albumArt, sm = false, onClose }: IPodProps) {
  const btnStyle = { cursor: 'none' as const, pointerEvents: 'auto' as const }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-110vh' }}
          animate={{ y: '-50%' }}
          exit={{ y: '-110vh' }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="fixed"
          style={{ top: '50%', left: '50%', x: '-50%', zIndex: 50000, pointerEvents: 'none' }}
        >
          <svg width={sm ? 170 : 220} height={sm ? 326 : 422} viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1c1c1e"/>
                <stop offset="100%" stopColor="#0a0a0c"/>
              </linearGradient>
              <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a2a2e"/>
                <stop offset="100%" stopColor="#1a1a1c"/>
              </linearGradient>
              <radialGradient id="wheelSheen" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </radialGradient>
              <clipPath id="artClip">
                <rect x="16" y="18" width="128" height="106" rx="6"/>
              </clipPath>
              <clipPath id="bodyClip">
                <rect x="1" y="1" width="158" height="258" rx="22"/>
              </clipPath>
              <filter id="screenGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Body */}
            <rect x="1" y="1" width="158" height="258" rx="22" fill="url(#bodyGrad)" stroke="#333336" strokeWidth="1.5"/>
            {/* Body sheen */}
            <rect x="1" y="1" width="158" height="130" rx="22" fill="url(#sheen)" clipPath="url(#bodyClip)"/>
            {/* Side highlight */}
            <rect x="1" y="20" width="2" height="220" rx="1" fill="#ffffff" opacity="0.04"/>

            {/* Screen bezel */}
            <rect x="14" y="16" width="132" height="110" rx="8" fill="#000" stroke="#2a2a2e" strokeWidth="1"/>
            {/* Screen */}
            <rect x="16" y="18" width="128" height="106" rx="6" fill="#050505"/>

            {/* Album art */}
            {albumArt && <image href={albumArt} x="16" y="18" width="128" height="106" clipPath="url(#artClip)" preserveAspectRatio="xMidYMid slice"/>}

            {/* Track name overlay */}
            <rect x="16" y="100" width="128" height="24" fill="rgba(0,0,0,0.65)" clipPath="url(#artClip)"/>
            <text x="80" y="112" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">{trackName.slice(0, 22)}</text>
            <text x="80" y="120" textAnchor="middle" fill="#aaaaaa" fontSize="5" fontFamily="monospace">Nightcore</text>

            {/* Progress bar track */}
            <rect x="20" y="132" width="120" height="2.5" rx="1.25" fill="#2a2a2e"/>
            {/* Progress bar fill */}
            <rect x="20" y="132" width="48" height="2.5" rx="1.25" fill="#e0e0e0" opacity="0.7"/>
            {/* Progress dot */}
            <circle cx="68" cy="133.25" r="3" fill="#ffffff" opacity="0.9"/>

            {/* Time labels */}
            <text x="20" y="143" fill="#666" fontSize="4.5" fontFamily="monospace">0:00</text>
            <text x="140" y="143" textAnchor="end" fill="#666" fontSize="4.5" fontFamily="monospace">-3:30</text>

            {/* Click wheel housing */}
            <circle cx="80" cy="198" r="52" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5"/>
            <circle cx="80" cy="198" r="52" fill="url(#wheelSheen)"/>

            {/* Wheel ring groove */}
            <circle cx="80" cy="198" r="47" fill="none" stroke="#222224" strokeWidth="0.75"/>
            <circle cx="80" cy="198" r="38" fill="url(#wheelGrad)" stroke="#1e1e20" strokeWidth="0.5"/>

            {/* EXIT label */}
            <text x="80" y="162" textAnchor="middle" fill="#888" fontSize="7.5" fontFamily="monospace" letterSpacing="2" style={{ pointerEvents: 'auto', cursor: 'none' }} onClick={onClose}>EXIT</text>
            <rect x="55" y="152" width="50" height="14" fill="transparent" style={{ pointerEvents: 'auto', cursor: 'none' }} onClick={onClose}/>

            {/* Skip next — right */}
            <text x="118" y="202" textAnchor="middle" fill="#777" fontSize="9" style={{ pointerEvents: 'none' }}>▶▶</text>
            <circle cx="118" cy="198" r="14" fill="transparent" style={btnStyle} onClick={onSkipNext}/>

            {/* Skip prev — left */}
            <text x="42" y="202" textAnchor="middle" fill="#777" fontSize="9" style={{ pointerEvents: 'none' }}>◀◀</text>
            <circle cx="42" cy="198" r="14" fill="transparent" style={btnStyle} onClick={onSkipPrev}/>

            {/* Seek forward — bottom right */}
            <text x="104" y="230" textAnchor="middle" fill="#777" fontSize="9" style={{ pointerEvents: 'none' }}>▶</text>
            <circle cx="104" cy="227" r="12" fill="transparent" style={btnStyle} onClick={onSeekForward}/>

            {/* Seek back — bottom left */}
            <text x="56" y="230" textAnchor="middle" fill="#777" fontSize="9" style={{ pointerEvents: 'none' }}>◀</text>
            <circle cx="56" cy="227" r="12" fill="transparent" style={btnStyle} onClick={onSeekBack}/>

            {/* Center button */}
            <circle cx="80" cy="198" r="18" fill={isPlaying ? '#1f1f22' : '#191919'} stroke="#333336" strokeWidth="1"/>
            <circle cx="80" cy="198" r="18" fill="url(#wheelSheen)"/>
            <text x="80" y="203" textAnchor="middle" fill={isPlaying ? '#dddddd' : '#999'} fontSize="11" style={{ pointerEvents: 'none' }}>
              {isPlaying ? '❚❚' : '▶'}
            </text>
            <circle cx="80" cy="198" r="18" fill="transparent" style={btnStyle} onClick={onPlayPause}/>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
