import { motion, AnimatePresence } from 'framer-motion'

interface IPodProps {
  visible: boolean
  isPlaying: boolean
  onPlayPause: () => void
  trackName?: string
}

export default function IPod({ visible, isPlaying, onPlayPause, trackName = 'Angel With A Shotgun' }: IPodProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-110vh' }}
          animate={{ y: 0 }}
          exit={{ y: '-110vh' }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="fixed"
          style={{ top: '30%', right: '22%', zIndex: 500, pointerEvents: 'none' }}
        >
          <svg width="130" height="230" viewBox="0 0 110 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="1" y="1" width="108" height="188" rx="18" fill="#e8e8e8" stroke="#aaa" strokeWidth="1.5"/>
            {/* Screen bezel */}
            <rect x="12" y="14" width="86" height="72" rx="6" fill="#111"/>
            {/* Screen */}
            <rect x="14" y="16" width="82" height="68" rx="5" fill="#1a1a2e"/>
            {/* Album art placeholder */}
            <rect x="18" y="20" width="40" height="40" rx="3" fill="#2a2a4a"/>
            <text x="38" y="46" textAnchor="middle" fill="#555" fontSize="18">♪</text>
            {/* Track name */}
            <text x="64" y="32" textAnchor="middle" fill="#ccc" fontSize="5" fontFamily="monospace">{trackName.slice(0, 18)}</text>
            <text x="64" y="42" textAnchor="middle" fill="#888" fontSize="4" fontFamily="monospace">Nightcore</text>
            {/* Progress bar bg */}
            <rect x="18" y="68" width="74" height="3" rx="1.5" fill="#333"/>
            {/* Progress bar fill */}
            <rect x="18" y="68" width="30" height="3" rx="1.5" fill="#fff" opacity="0.6"/>
            {/* Click wheel outer */}
            <circle cx="55" cy="140" r="38" fill="#d4d4d4" stroke="#bbb" strokeWidth="1"/>
            {/* Menu text */}
            <text x="55" y="112" textAnchor="middle" fill="#555" fontSize="7" fontFamily="monospace">MENU</text>
            {/* Skip fwd */}
            <text x="83" y="144" textAnchor="middle" fill="#555" fontSize="9">▶▶</text>
            {/* Skip back */}
            <text x="27" y="144" textAnchor="middle" fill="#555" fontSize="9">◀◀</text>
            {/* Play */}
            <text x="55" y="168" textAnchor="middle" fill="#555" fontSize="9">▶ ❚❚</text>
            {/* Center circle — play/pause button */}
            <circle
              cx="55" cy="140" r="16"
              fill={isPlaying ? '#bbb' : '#c8c8c8'}
              stroke="#aaa" strokeWidth="0.75"
              style={{ cursor: 'none', pointerEvents: 'auto' }}
              onClick={onPlayPause}
            />
            <text x="55" y="144" textAnchor="middle" fill="#444" fontSize="10" style={{ pointerEvents: 'none' }}>
              {isPlaying ? '❚❚' : '▶'}
            </text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
