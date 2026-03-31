import StatusScreen from '@/components/StatusScreen'
import MangaPanel from '@/components/MangaPanel'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative min-h-screen flex gap-8 p-8 justify-center items-start" style={{ zIndex: 2 }}>

      {/* Center — all panels stacked */}
      <div className="flex flex-col gap-3 w-80 items-center">

        <StatusScreen />

        <MangaPanel sfx="ドン！">
          <h2 className="font-display text-2xl tracking-widest mb-2 text-center">POWER LEVEL</h2>
          <ul className="font-mono text-xs space-y-1 text-white/80 text-center">
            <li><span className="text-accent">WPM</span> — 195</li>
            <li><span className="text-accent">GAME</span> — LoL · Mid · Challenger</li>
            <li><span className="text-accent">EDU</span> — GSU → Georgia Tech</li>
            <li><span className="text-accent">EXP</span> — Search Quality Rater</li>
          </ul>
        </MangaPanel>

        <MangaPanel sfx="バン！">
          <h2 className="font-display text-2xl tracking-widest mb-2 text-center">TRAINING ARC</h2>
          <ul className="font-mono text-xs space-y-1 text-white/80 text-center">
            <li>☐ Land a SWE Internship</li>
            <li>☐ Complete PitchPulse MVP</li>
            <li>☐ Master C++ (Demon-rank)</li>
            <li>☐ Financial Literacy arc</li>
          </ul>
        </MangaPanel>

        <MangaPanel sfx="ザワ">
          <h2 className="font-display text-2xl tracking-widest mb-2 text-center">INVENTORY</h2>
          <ul className="font-mono text-xs space-y-2 text-white/80 text-center">
            <li><span className="text-accent">PitchPulse</span> — Soccer analytics</li>
            <li><span className="text-accent">DSA Quest</span> — Gamified DSA platform</li>
            <li><span className="text-accent">CounterStack</span> — Cyber poker/RPG</li>
          </ul>
        </MangaPanel>

        <MangaPanel sfx="スゥ">
          <h2 className="font-display text-2xl tracking-widest mb-2 text-center">THE LIBRARY</h2>
          <ul className="font-mono text-xs space-y-1 text-white/80 text-center">
            <li>📖 Linear Algebra Done Right</li>
            <li>📖 Option Volatility &amp; Pricing</li>
            <li>⚔️ LeetCode Grind (daily)</li>
            <li>🎸 Guitar — Ultimate Guitar PRO</li>
          </ul>
        </MangaPanel>

      </div>

      {/* Right — manga image */}
      <div className="flex items-start pt-2">
        <div className="panel-bordered relative overflow-hidden" style={{ width: 420, height: 600 }}>
          <Image
            src="/manga/ichigoatSavingRukia.jpg"
            alt="Ichigo saving Rukia"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
          />
        </div>
      </div>

    </main>
  )
}
