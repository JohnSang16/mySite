import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import MangaPanel from '@/components/MangaPanel'
import BrutalistNoise from '@/components/BrutalistNoise'
import Intro from '@/components/Intro'
import { useAlphaHover } from '@/hooks/useAlphaHover'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleIntroDone = () => {
    audioRef.current?.play()
    setIsPlaying(true)
    setShowIntro(false)
  }
  const { imgRef: nameRef, hovered: nameHovered } = useAlphaHover()
  const { imgRef: d4Ref, hovered: d4Hovered } = useAlphaHover()
  const { imgRef: ulquiorraRef, hovered: ulquiorraHovered } = useAlphaHover()
  const { imgRef: selfieRef, hovered: selfieHovered } = useAlphaHover()

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}
      <audio ref={audioRef} src="/sfx/Nightcore - Angel With A Shotgun.mp3" loop />
      <CustomCursor />
      <BrutalistNoise />
      <main className="relative min-h-screen" style={{ zIndex: 2 }}>

        {/* Panels — fixed horizontal row at bottom right */}
        <div className="fixed bottom-0 right-0 flex flex-row gap-2 px-4 pb-4" style={{ zIndex: 10 }}>

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
              grokking algorithms · competitive programmer’s handbook 
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
              ref={nameRef}
              src="/other/finalNamept2 (1).png"
              alt="John Sang"
              style={{
                width: 420,
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.3s ease',
                transform: nameHovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          </motion.div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'grey', letterSpacing: '0.1em' }}>

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

        {/* Reminder column — behind name, overlapping selfie */}
        <div
          className="fixed pointer-events-auto select-none flex flex-col items-start gap-1"
          style={{ zIndex: 4, left: '72%', top: '60%', transform: 'translate(-50%, -50%)', maxWidth: '28%', textAlign: 'left' }}
        >
          <h3 className="font-display text-sm tracking-widest text-white reminder-hover" style={{ pointerEvents: 'auto' }}>reminders:</h3>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>stay goated</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>leet code daily</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>do exciting shit</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>aurafarm</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>give more than you get</p>
        </div>

        {/* d4 background — below centipede */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }}>
          <img
            ref={d4Ref}
            src="/background/d4imgCropped.png"
            alt=""
            style={{
              width: 200,
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'left bottom',
              display: 'block',
              position: 'absolute',
              bottom: 180,
              left: 100,
              pointerEvents: 'auto',
              transition: 'transform 0.3s ease',
              transformOrigin: 'left bottom',
              transform: d4Hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>

        {/* Images — fixed to right edge */}
        <div className="fixed top-0 right-0 h-screen flex items-center gap-4" style={{ padding: '20px', paddingBottom: '140px' }}>
          {/* Ulquiorra image */}
          <div style={{
            padding: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.03), 0 0 30px rgba(100,100,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(2px)',
            marginTop: '-30vh',
            transition: 'transform 0.3s ease',
            transform: ulquiorraHovered ? 'rotate(-3deg) scale(1.02)' : 'rotate(0deg) scale(1)',
            pointerEvents: 'auto'
          }}>
            <img
              ref={ulquiorraRef}
              src="/characters/† Ulquiorra Cifer.jpg"
              alt="Ulquiorra Cifer"
              style={{ height: '35vh', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Selfie image */}
          <div style={{
            padding: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.03), 0 0 30px rgba(100,100,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(2px)',
            transition: 'transform 0.3s ease',
            transform: selfieHovered ? 'rotate(3deg) scale(1.02)' : 'rotate(0deg) scale(1)',
            pointerEvents: 'auto'
          }}>
            <img
              ref={selfieRef}
              src="/background/selfieTYPSESHIT.png"
              alt="selfie"
              style={{ height: '65vh', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

      </main>

      {/* Stop music text control — appears after intro ends */}
      {!showIntro && (
        <div className="fixed z-[5000] pointer-events-auto" style={{ left: '32%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <button
            data-clickable
            onClick={() => {
              const audio = (audioRef.current as HTMLMediaElement) ?? (document.querySelector('audio') as HTMLMediaElement | null)
              if (audio) {
                if (audio.paused) {
                  audio.play().catch(() => {})
                  setIsPlaying(true)
                } else {
                  audio.pause()
                  setIsPlaying(false)
                }
              } else {
                // eslint-disable-next-line no-console
                console.warn('stop/start music: audio element not found')
              }
            }}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.35rem 0.8rem',
              margin: 0,
              color: '#fff',
              fontSize: '0.95rem',
              fontFamily: "'Noto Serif', serif",
              pointerEvents: 'auto',
              userSelect: 'none',
              outline: 'none',
              boxShadow: '0 0 0 0 transparent',
            }}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Stop music' : 'Start music'}
          >
            {isPlaying ? 'stop music' : 'start music'}
          </button>
        </div>
      )}

    </>
  )
}
