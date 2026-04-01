import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import BrutalistNoise from '@/components/BrutalistNoise'
import MangaPanel from '@/components/MangaPanel'
import Intro from '@/components/Intro'
import IPod from '@/components/IPod'
import { useAlphaHover } from '@/hooks/useAlphaHover'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIpod, setShowIpod] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    const audio = (audioRef.current as HTMLMediaElement) ?? (document.querySelector('audio') as HTMLMediaElement | null)
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleIntroDone = () => {
    setShowIntro(false)
  }
  const { imgRef: nameRef, hovered: nameHovered } = useAlphaHover()
  const { imgRef: d4Ref, hovered: d4Hovered } = useAlphaHover()
  const { imgRef: ulquiorraRef, hovered: ulquiorraHovered } = useAlphaHover()

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}
      <audio ref={audioRef} src="/sfx/Nightcore - Angel With A Shotgun.mp3" loop />
      <CustomCursor />
      <BrutalistNoise />
      <main className="relative min-h-screen" style={{ zIndex: 2 }}>

        {/* Name — overlaying selfie */}
        <motion.div
          className="fixed"
          style={{ top: '-10%', left: '20%', transform: 'translate(-50%, -50%)', zIndex: 5, pointerEvents: 'auto' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <img
            ref={nameRef}
            src="/other/finalNamept2 (1).png"
            alt="John Sang"
            style={{
              width: 280,
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.3s ease',
              transform: nameHovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        </motion.div>

        {/* Floating ichigo mask — independently centered */}
        <motion.img
          src="/other/ichigoMaskNoBG.png"
          alt="ichigo mask"
          className="fixed pointer-events-none"
          style={{ width: 160, height: 160, objectFit: 'contain', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 6 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />

        {/* Social links — bottom left */}
        <div className="fixed flex flex-col gap-1" style={{ zIndex: 10, top: '58%', left: '32%', transform: 'translateX(-50%)' }}>
          <a href="https://www.linkedin.com/in/johnsang-/" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/50 reminder-hover" style={{ pointerEvents: 'auto', textDecoration: 'none', letterSpacing: '0.1em' }}>linkedin ↗</a>
          <a href="https://github.com/JohnSang16" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/50 reminder-hover" style={{ pointerEvents: 'auto', textDecoration: 'none', letterSpacing: '0.1em' }}>github ↗</a>
          <a href="https://www.instagram.com/john.sang0/" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/50 reminder-hover" style={{ pointerEvents: 'auto', textDecoration: 'none', letterSpacing: '0.1em' }}>instagram ↗</a>
          <a href="https://www.tiktok.com/@john.sang0" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/50 reminder-hover" style={{ pointerEvents: 'auto', textDecoration: 'none', letterSpacing: '0.1em' }}>tiktok ↗</a>
        </div>

        {/* Reminder column */}
        <div
          className="fixed pointer-events-auto select-none flex flex-col items-start gap-1"
          style={{ zIndex: 4, left: 56, top: 116, maxWidth: '28%', textAlign: 'left' }}
        >
          <h3 className="font-display text-sm tracking-widest text-white reminder-hover" style={{ pointerEvents: 'auto' }}>reminders:</h3>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>stay goated</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>leet code daily</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>do exciting shit</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>aurafarm</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>give more than you get</p>
        </div>

        {/* 3 panels — top right */}
        <div className="fixed top-4 right-4 flex flex-col gap-3" style={{ zIndex: 10, width: '220px' }}>
          <MangaPanel sfx="ドン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">abt me</h2>
            <p className="font-mono text-xs text-white/80 text-center"> lol midlane d2 · progsuhq director · professional larper · wpm 155</p>
          </MangaPanel>
          <MangaPanel sfx="バン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">training arc</h2>
            <p className="font-mono text-xs text-white/80 text-center">land a swe internship · hit 80 coffeechats · build git · credit score maxx</p>
          </MangaPanel>
          <MangaPanel sfx="スゥ">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">knowledge</h2>
            <p className="font-mono text-xs text-white/80 text-center">grokking algorithms · competitive programmer's handbook</p>
          </MangaPanel>
        </div>

        {/* Selfie — centered */}
        <div className="fixed pointer-events-none" style={{ top: '32%', left: '33%', transform: 'translate(-50%, -50%)', zIndex: -100 }}>
          <img
            src="/background/selfieTYPSESHIT.png"
            alt="selfie"
            style={{ height: '45vh', width: 'auto', objectFit: 'contain', display: 'block', border: '2px solid rgba(255,255,255,0.85)' }}
          />
        </div>

        {/* d4 background */}
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
              bottom: 100,
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
          <div style={{
            padding: '0px',
            border: '2px solid rgba(250, 243, 243, 0.85)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.03), 0 0 30px rgba(100,100,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(2px)',
            marginRight: '510px',
            marginTop: '-30vh',
            transition: 'transform 0.3s ease',
            transform: ulquiorraHovered ? 'rotate(-3deg) scale(1.02)' : 'rotate(0deg) scale(1)',
            pointerEvents: 'auto'
          }}>
            <img
              ref={ulquiorraRef}
              src="/characters/† Ulquiorra Cifer.jpg"
              alt="Ulquiorra Cifer"
              style={{ height: '25vh', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

      </main>

      {/* Stop music text control */}
      {!showIntro && (
        <div className="fixed z-[5000] pointer-events-auto" style={{ bottom: 16, right: 16 }}>
          <button
            data-clickable
            onClick={() => setShowIpod(v => !v)}
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
            aria-pressed={showIpod}
            aria-label={showIpod ? 'Hide iPod' : 'Show iPod'}
          >
            ipod
          </button>
        </div>
      )}

      <IPod visible={showIpod} isPlaying={isPlaying} onPlayPause={handlePlayPause} />
    </>
  )
}
