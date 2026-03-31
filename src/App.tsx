import { motion } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import MangaPanel from '@/components/MangaPanel'

export default function App() {
  return (
    <>
      <CustomCursor />
      <main className="relative min-h-screen" style={{ zIndex: 2 }}>

        {/* Panels — fixed horizontal row at bottom right */}
        <div className="fixed bottom-0 right-0 flex flex-row gap-2 px-4 pb-4" style={{ zIndex: 10 }}>

          <MangaPanel sfx="ドン！">
            <h2 className="font-display text-sm tracking-widest mb-1 text-center">stats</h2>
            <p className="font-mono text-xs text-white/80 text-center">
              wpm 155 · lol midlane d2 · gsu → georgia tech · search quality rater
            </p>
          </MangaPanel>

          <MangaPanel sfx="バン！">
            <h2 className="font-display text-sm tracking-widest mb-1 text-center">training arc</h2>
            <p className="font-mono text-xs text-white/80 text-center">
              land a swe internship · complete pitchpulse mvp · master c++ demon-rank · financial literacy arc
            </p>
          </MangaPanel>

          <MangaPanel sfx="スゥ">
            <h2 className="font-display text-sm tracking-widest mb-1 text-center">knowledge</h2>
            <p className="font-mono text-xs text-white/80 text-center">
              linear algebra done right · option volatility & pricing · leetcode grind daily · guitar ultimate guitar pro
            </p>
          </MangaPanel>

        </div>

        {/* Center title + text */}
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4" style={{ zIndex: 5, pointerEvents: 'none' }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{ pointerEvents: 'auto' }}
          >
            <img
              src="/other/nameTitleFinal.png"
              alt="John Sang"
              className="name-hover"
              style={{ width: 420, objectFit: 'contain', display: 'block' }}
            />
          </motion.div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'grey', letterSpacing: '0.1em' }}>
            what is 1000-7?
          </p>
        </div>

        {/* Floating ichigo mask — independently centered */}
        <motion.img
          src="/other/ichigoMaskNoBG.png"
          alt="ichigo mask"
          className="fixed pointer-events-none"
          style={{ width: 160, height: 160, objectFit: 'contain', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 6 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />

        {/* Image — fixed to right edge */}
        <div className="fixed top-0 right-0 h-screen w-auto pointer-events-none">
          <img
            src="/background/selfieTYPSESHIT.png"
            alt="selfie"
            style={{ height: '55%', width: 'auto', objectFit: 'contain', objectPosition: 'right center', display: 'block' }}
          />
        </div>

      </main>
    </>
  )
}
