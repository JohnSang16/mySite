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
}

export default function IPod({ visible, isPlaying, onPlayPause, onSkipNext, onSkipPrev, onSeekForward, onSeekBack, trackName = 'Angel With A Shotgun', albumArt }: IPodProps) {
  const btnStyle = { cursor: 'none' as const, pointerEvents: 'auto' as const }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-110vh' }}
          animate={{ y: 0 }}
          exit={{ y: '-110vh' }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="fixed"
          style={{ top: '30%', right: '22%', zIndex: 50000, pointerEvents: 'none' }}
        >
          <svg width="300" height="338" viewBox="0 0 110 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="1" y="1" width="108" height="188" rx="18" fill="#0d1b2a" stroke="#1e3a5f" strokeWidth="1.5"/>
            {/* Subtle sheen */}
            <rect x="1" y="1" width="108" height="94" rx="18" fill="url(#sheen)" opacity="0.15"/>
            <defs>
              <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            {/* Screen bezel */}
            <rect x="12" y="14" width="86" height="72" rx="6" fill="#050d18"/>
            {/* Screen */}
            <rect x="14" y="16" width="82" height="68" rx="5" fill="#091524"/>
            {/* Album art — full screen */}
            <defs>
              <clipPath id="artClip">
                <rect x="14" y="16" width="82" height="68" rx="5"/>
              </clipPath>
            </defs>
            {albumArt && <image href={albumArt} x="14" y="16" width="82" height="68" clipPath="url(#artClip)" preserveAspectRatio="xMidYMid slice"/>}
            {/* Text overlay on art */}
            <rect x="14" y="63" width="82" height="21" fill="rgba(0,0,0,0.5)" clipPath="url(#artClip)"/>
            <text x="55" y="73" textAnchor="middle" fill="#fff" fontSize="5" fontFamily="monospace">{trackName.slice(0, 18)}</text>
            <text x="55" y="81" textAnchor="middle" fill="#ccc" fontSize="4" fontFamily="monospace">Nightcore</text>
            {/* Progress bar bg */}
            <rect x="18" y="86" width="74" height="3" rx="1.5" fill="#ccc"/>
            {/* Progress bar fill */}
            <rect x="18" y="86" width="30" height="3" rx="1.5" fill="#888" opacity="0.8"/>
            {/* Click wheel outer */}
            <circle cx="55" cy="140" r="38" fill="#112236" stroke="#1e3a5f" strokeWidth="1.5"/>
            {/* Click wheel inner ring */}
            <circle cx="55" cy="140" r="34" fill="none" stroke="#1a3350" strokeWidth="0.5"/>

            {/* MENU */}
            <text x="55" y="112" textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace">MENU</text>

            {/* Skip next (>>) — right */}
            <text x="83" y="144" textAnchor="middle" fill="#555" fontSize="9" style={{ pointerEvents: 'none' }}>▶▶</text>
            <circle cx="83" cy="140" r="12" fill="transparent" style={btnStyle} onClick={onSkipNext} />

            {/* Skip prev (<<) — left */}
            <text x="27" y="144" textAnchor="middle" fill="#555" fontSize="9" style={{ pointerEvents: 'none' }}>◀◀</text>
            <circle cx="27" cy="140" r="12" fill="transparent" style={btnStyle} onClick={onSkipPrev} />

            {/* Seek forward (>) — bottom right quadrant */}
            <text x="68" y="168" textAnchor="middle" fill="#555" fontSize="8" style={{ pointerEvents: 'none' }}>▶</text>
            <circle cx="68" cy="165" r="10" fill="transparent" style={btnStyle} onClick={onSeekForward} />

            {/* Seek back (<) — bottom left quadrant */}
            <text x="42" y="168" textAnchor="middle" fill="#555" fontSize="8" style={{ pointerEvents: 'none' }}>◀</text>
            <circle cx="42" cy="165" r="10" fill="transparent" style={btnStyle} onClick={onSeekBack} />

            {/* Center circle — play/pause */}
            <circle
              cx="55" cy="140" r="16"
              fill={isPlaying ? '#1a4a6e' : '#152f4a'}
              stroke="#2a6090" strokeWidth="0.75"
              style={btnStyle}
              onClick={onPlayPause}
            />
            <text x="55" y="144" textAnchor="middle" fill="#7eb8d4" fontSize="10" style={{ pointerEvents: 'none' }}>
              {isPlaying ? '❚❚' : '▶'}
            </text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
