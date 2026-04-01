import { motion } from 'framer-motion'
import MangaPanel from './MangaPanel'

interface HubPageProps {
  onBack: () => void
}

export default function HubPage({ onBack }: HubPageProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#000', zIndex: 100 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
    >
      <div className="flex flex-col gap-4" style={{ width: '360px' }}>
        <MangaPanel sfx="ドン！">
          <h2 className="font-display text-sm tracking-widest mb-1 text-center">abt me</h2>
          <p className="font-mono text-xs text-white/80 text-center">
            wpm 155 · lol midlane d2 · progsuhq director · professional larper
          </p>
        </MangaPanel>

        <MangaPanel sfx="バン！">
          <h2 className="font-display text-sm tracking-widest mb-1 text-center">training arc</h2>
          <p className="font-mono text-xs text-white/80 text-center">
            land a swe internship · hit 80 coffeechats · build git · credit score maxx
          </p>
        </MangaPanel>

        <MangaPanel sfx="スゥ">
          <h2 className="font-display text-sm tracking-widest mb-1 text-center">knowledge</h2>
          <p className="font-mono text-xs text-white/80 text-center">
            grokking algorithms · competitive programmer's handbook
          </p>
        </MangaPanel>
      </div>
      <button
        onClick={onBack}
        className="fixed bottom-6 right-6 font-mono text-xs text-white/50 tracking-widest uppercase"
        style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', padding: '0.4rem 0.9rem', cursor: 'none' }}
        data-clickable
      >
        ← main
      </button>
    </motion.div>
  )
}
