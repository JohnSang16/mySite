import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [auraActive, setAuraActive] = useState(false)
  const [fakerActive, setFakerActive] = useState(false)
  const [vastoActive, setVastoActive] = useState(false)
  const [ulqEditActive, setUlqEditActive] = useState(false)
  const [ghoulActive, setGhoulActive] = useState(false)
  const [ghoulIndex, setGhoulIndex] = useState(0)
  const ghoulScrollRef = useRef<HTMLDivElement>(null)

  const GHOUL_VIDEOS = [
    '/videos/tokyoghoul/ghoul1.mp4',
    '/videos/tokyoghoul/ghoul2.mp4',
    '/videos/tokyoghoul/ghoul3.mp4',
    '/videos/tokyoghoul/ghoul4.mp4',
  ]

  const handleGhoulEnded = (idx: number) => {
    const next = (idx + 1) % GHOUL_VIDEOS.length
    setGhoulIndex(next)
    setTimeout(() => {
      const videos = ghoulScrollRef.current?.querySelectorAll('video')
      const el = videos?.[next] as HTMLVideoElement | undefined
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const setupGhoulObserver = (container: HTMLDivElement | null) => {
    if (!container) return
    const videos = container.querySelectorAll('video')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visible = entry.target as HTMLVideoElement
            videos.forEach((v) => { if (v !== visible) v.pause() })
            visible.play().catch(() => {})
            setGhoulIndex(Array.from(videos).indexOf(visible))
          }
        })
      },
      { root: container, threshold: 0.6 }
    )
    videos.forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }

  const triggerFaker = () => {
    if (fakerActive) return
    setFakerActive(true)

    const bgAudio = audioRef.current
    const wasPlaying = bgAudio && !bgAudio.paused
    if (wasPlaying) bgAudio!.pause()

    const sfx = new Audio('/sfx/YOUR PHONE LINGING sound effect.mp3')
    sfx.play().catch(() => {})

    setTimeout(() => {
      setFakerActive(false)
      sfx.pause()
      if (wasPlaying) bgAudio!.play().catch(() => {})
    }, 6500)
  }

  const triggerAura = () => {
    if (auraActive) return
    setAuraActive(true)
    const sfx = new Audio('/sfx/oui parody.mp3')
    sfx.play().catch(() => {})
    setTimeout(() => {
      setAuraActive(false)
      sfx.pause()
    }, 4800)
  }

  const triggerVasto = () => {
    if (vastoActive) return
    setVastoActive(true)
    const bgAudio = audioRef.current
    const wasPlaying = bgAudio && !bgAudio.paused
    if (wasPlaying) bgAudio!.pause()
    const sfx = new Audio('/sfx/Bleach Vasto Lorde Scream (English Dub).mp3')
    sfx.currentTime = 1.1
    sfx.play().catch(() => {})
    setTimeout(() => {
      setVastoActive(false)
      sfx.pause()
      if (wasPlaying) bgAudio!.play().catch(() => {})
    }, 6810)
  }
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
      {!vastoActive && !fakerActive && !auraActive && !ulqEditActive && !ghoulActive && <BrutalistNoise />}
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
          className="fixed gold-glow"
          style={{ width: 160, height: 160, objectFit: 'contain', top: '65%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: 6, pointerEvents: 'auto', cursor: 'none' }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          onClick={triggerVasto}
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
          <p className="font-mono text-xs aurafarm-text" style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s ease, text-shadow 0.2s ease' }} onClick={triggerAura}>aurafarm</p>
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
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">skill tree</h2>
            <p className="font-mono text-xs text-white/80 text-center">python · c · react · next.js · vercel </p>
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
              className="gold-glow"
              style={{ height: '25vh', width: 'auto', objectFit: 'contain', display: 'block', cursor: 'none' }}
              onClick={() => setUlqEditActive(true)}
            />
          </div>
        </div>

      </main>

      {/* d4 background */}
      <img
        ref={d4Ref}
        src="/background/d4imgCropped.png"
        alt=""
        className="gold-glow"
        style={{
          width: 180,
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          position: 'fixed',
          bottom: '55%',
          left: '52%',
          zIndex: 12,
          pointerEvents: 'auto',
          transition: 'transform 0.3s ease',
          transformOrigin: 'left bottom',
          transform: d4Hovered ? 'scale(1.08)' : 'scale(1)',
          cursor: 'none',
        }}
        onClick={triggerFaker}
      />

      {/* Red lily — bottom center */}
      <div className="fixed pointer-events-auto" style={{ bottom: 0, left: '60%', transform: 'translateX(-50%)', zIndex: 10 }} onClick={() => { setGhoulActive(true); setGhoulIndex(0) }}>
        <img
          src="/background/redlily.png"
          alt="red lily"
          className="gold-glow"
          style={{ height: '28vh', width: 'auto', objectFit: 'contain', display: 'block', cursor: 'none' }}
        />
      </div>

      {/* Stop music text control */}
      {!showIntro && (
        <div className="fixed z-[5000] pointer-events-auto" style={{ bottom: 48, right: 16 }}>
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


      {/* Ulquiorra edit overlay */}
      <AnimatePresence>
        {ulqEditActive && (
          <motion.div
            key="ulq-edit-overlay"
            className="fixed inset-0 pointer-events-auto"
            style={{ zIndex: 8000, background: '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setUlqEditActive(false)}
          >
            <video
              src="/videos/ulquiorra edit (2).mp4"
              autoPlay
              playsInline
              onEnded={() => setUlqEditActive(false)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <span className="fixed pointer-events-none select-none font-mono" style={{ bottom: 12, right: 14, fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', zIndex: 8001 }}>
              credit: in7fv on tiktok
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vasto Lorde overlay */}
      <AnimatePresence>
        {vastoActive && (
          <motion.div
            key="vasto-overlay"
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 8000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/videos/ichigo-vasto-lorde.gif"
              alt="vasto lorde"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '100%', width: 'auto' }}
            />
            <motion.p
              style={{ position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#020202', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}
            >
              POV: MOM FORGOT TO BUY CHICKEN NUGGIES
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Faker calling overlay */}
      <AnimatePresence>
        {fakerActive && (
          <motion.div
            key="faker-overlay"
            className="fixed inset-0 pointer-events-none flex items-center justify-center"
            style={{ zIndex: 8000, padding: '2rem' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <img
              src="/videos/faker-calling.gif"
              alt="faker calling"
              style={{ height: 'auto', width: '280px', borderRadius: '12px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aura effect overlay */}
      <AnimatePresence>
        {auraActive && (
          <motion.div
            key="aura-overlay"
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 8000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/videos/solo-leveling-sung-jin-woo.gif"
              alt="aura"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '100%', width: 'auto' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tokyo Ghoul scroll overlay */}
      <AnimatePresence>
        {ghoulActive && (
          <motion.div
            key="ghoul-overlay"
            className="fixed inset-0 pointer-events-auto"
            style={{ zIndex: 8000, background: '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8002, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em' }}>scroll break~</span>
              <button
                onClick={() => setGhoulActive(false)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.25rem', padding: '0.3rem 0.8rem', color: '#fff', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', cursor: 'none' }}
              >
                close
              </button>
            </div>

            <div
              ref={(el) => { (ghoulScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el; setupGhoulObserver(el) }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', scrollbarWidth: 'none', scrollSnapType: 'y mandatory' }}
            >
              {GHOUL_VIDEOS.map((src, i) => {
                const credits = ['kuzaro__', 'lxzzzsss', 'switch_nt', 'shx.editz']
                return (
                  <div key={src} style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', flexShrink: 0, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 'calc(50% - 420px)', bottom: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      credit: {credits[i]}
                    </span>
                    <video
                      src={src}
                      playsInline
                      style={{ width: 'auto', maxWidth: '70%', height: 'auto', maxHeight: '85vh', display: 'block', borderRadius: 4, cursor: 'none' }}
                      onEnded={() => handleGhoulEnded(i)}
                      onClick={(e) => { const v = e.currentTarget; v.paused ? v.play().catch(() => {}) : v.pause() }}
                    />
                    {/* Arrows to the right of video */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                      {i > 0 && (
                        <button onClick={() => { const items = ghoulScrollRef.current?.children; (items?.[i - 1] as HTMLElement)?.scrollIntoView({ behavior: 'smooth' }) }}
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1rem', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >↑</button>
                      )}
                      {i < GHOUL_VIDEOS.length - 1 && (
                        <button onClick={() => { const items = ghoulScrollRef.current?.children; (items?.[i + 1] as HTMLElement)?.scrollIntoView({ behavior: 'smooth' }) }}
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1rem', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >↓</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
