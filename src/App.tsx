import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import BrutalistNoise from '@/components/BrutalistNoise'
import MangaPanel from '@/components/MangaPanel'
import Intro from '@/components/Intro'
import IPod from '@/components/IPod'
import { useAlphaHover } from '@/hooks/useAlphaHover'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [winW, setWinW] = useState(window.innerWidth)
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const sm = winW < 768
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIpod, setShowIpod] = useState(false)
  const [auraActive, setAuraActive] = useState(false)
  const [fakerActive, setFakerActive] = useState(false)
  const [vastoActive, setVastoActive] = useState(false)
  const [vastoKey, setVastoKey] = useState(0)
  const [ulqEditActive, setUlqEditActive] = useState(false)
  const [ghoulActive, setGhoulActive] = useState(false)
  const [ghoulIndex, setGhoulIndex] = useState(0)
  const ghoulScrollRef = useRef<HTMLDivElement>(null)

  const GHOUL_VIDEOS = [
    '/videos/tokyoghoul/bghoul1.mp4',
    '/videos/tokyoghoul/bghoul2.mp4',
    '/videos/tokyoghoul/bghoul3.mp4',
    '/videos/tokyoghoul/bghoul4.mp4',
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
    setShowIpod(false)

    const bgAudio = audioRef.current
    const wasPlaying = bgAudio && !bgAudio.paused
    if (wasPlaying) bgAudio!.pause()

    const sfx = new Audio('/sfx/phone-ringing.mp3')
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
    setShowIpod(false)
    const sfx = new Audio('/sfx/oui-parody.mp3')
    sfx.play().catch(() => {})
    setTimeout(() => {
      setAuraActive(false)
      sfx.pause()
    }, 4800)
  }

  const triggerVasto = () => {
    if (vastoActive) return
    setVastoActive(true)
    setShowIpod(false)
    setVastoKey(k => k + 1)
    const bgAudio = audioRef.current
    const wasPlaying = bgAudio && !bgAudio.paused
    if (wasPlaying) bgAudio!.pause()
    const sfx = new Audio('/videos/Bleach Vasto Lorde Scream (English Dub).mp3')
    sfx.currentTime = 1.1
    sfx.play().catch(() => {})
    setTimeout(() => {
      setVastoActive(false)
      sfx.pause()
      if (wasPlaying) bgAudio!.play().catch(() => {})
    }, 6810)
  }
  const audioRef = useRef<HTMLAudioElement>(null)
  const [trackIndex, setTrackIndex] = useState(0)

  const PLAYLIST = [
    { src: '/sfx/Nightcore - Angel With A Shotgun.mp3', name: 'Angel With A Shotgun', art: '/background/angelwithashotgunIMG.png' },
    { src: '/sfx/Nightcore - Clarity.mp3',              name: 'Clarity',              art: '/background/clarityIMG.png'       },
    { src: '/sfx/Nightcore - Just A Dream.mp3',         name: 'Just A Dream',         art: '/background/justadreamIMG.png'    },
    { src: '/sfx/Nightcore - Take A Hint.mp3',          name: 'Take A Hint',          art: '/background/takeahitIMG.png'      },
  ]

  const handleTrackEnded = () => {
    const next = (trackIndex + 1) % PLAYLIST.length
    setTrackIndex(next)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
  }

  const handlePlayPause = () => {
    const audio = audioRef.current
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
      <audio ref={audioRef} src={PLAYLIST[trackIndex].src} onEnded={handleTrackEnded} />
      {!sm && <CustomCursor />}
      {!vastoActive && !fakerActive && !auraActive && !ulqEditActive && !ghoulActive && <BrutalistNoise sm={sm} />}

      {/* ── DESKTOP LAYOUT (≥768px) ── */}
      {!sm && (
      <>
      {!vastoActive && (
        <span className="hint-gold-glow fixed font-mono pointer-events-none select-none" style={{ top: 'calc(70% + 2.5rem)', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', zIndex: 7999, whiteSpace: 'nowrap' }}>
          hint: click the golden icons & bg comments~
        </span>
      )}
      {/* Floating ichigo mask — outside main to avoid stacking context conflicts */}
      <motion.img
        src="/other/ichigoMaskNoBG.png"
        alt="ichigo mask"
        className="fixed gold-glow img-mask ichigo-pos"
        style={{ width: 160, height: 160, objectFit: 'contain', top: '55%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: 5100, pointerEvents: 'auto', cursor: 'none' }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        onClick={triggerVasto}
      />
      <main className="relative min-h-screen" style={{ zIndex: 2 }}>

        {/* Name — overlaying selfie */}
        <motion.div
          className="fixed"
          style={{ top: '-10%', left: '20%', transform: 'translate(-50%, -50%)', zIndex: 15, pointerEvents: 'auto' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <img
            ref={nameRef}
            src="/other/finalNamept2-1.png"
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


        {/* Social links — bottom left */}
        <div className="fixed flex flex-col gap-1" style={{ zIndex: 10, top: '55%', left: '27%', transform: 'translateX(-50%)' }}>
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
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>stay </p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>leet code daily</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>do exciting shit</p>
          <p className="font-mono text-xs aurafarm-text" style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s ease, text-shadow 0.2s ease' }} onClick={triggerAura}>aurafarm</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>give more than you get</p>
        </div>

        {/* abt me + training arc — top right, above skill tree */}
        <div className="fixed flex flex-col gap-3 abt-panel" style={{ top: 16, right: 16, zIndex: 10, width: '220px' }}>
          <MangaPanel sfx="ドン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">abt me</h2>
            <p className="font-mono text-xs text-white/80 text-center"> lol midlane d2 · progsuhq vice president · professional larper · wpm 155</p>
          </MangaPanel>
          <MangaPanel sfx="バン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">training arc</h2>
            <p className="font-mono text-xs text-white/80 text-center">land a swe internship · hit 80 coffeechats · build git · credit score maxx</p>
          </MangaPanel>
        </div>

        {/* skill tree + goated ppl — top right, below abt me */}
        <div className="fixed flex flex-col gap-3 skill-panel" style={{ top: 200, right: 16, zIndex: 10, width: '220px' }}>
          <MangaPanel sfx="スゥ">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">skill tree</h2>
            <p className="font-mono text-xs text-white/80 text-center">python · c · react · next.js · vercel · claude</p>
          </MangaPanel>
          <MangaPanel sfx="ドン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">goated ppl</h2>
            <p className="font-mono text-xs text-white/80 text-center">
              <a href="https://www.linkedin.com/in/joeyzhangdev/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }}>yaohui zhang</a> · ichigo kurosaki · faker · beifeng
            </p>
          </MangaPanel>
        </div>

        {/* Selfie + Ulquiorra — shared container */}
        <div className="fixed" style={{ top: '32%', left: '33%', transform: 'translate(-50%, -50%)', zIndex: 5, pointerEvents: 'none' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src="/background/selfieTYPSESHIT.png"
              alt="selfie"
              className="img-selfie"
              style={{ height: '45vh', width: 'auto', objectFit: 'contain', display: 'block', border: '2px solid rgba(255,255,255,0.85)' }}
            />
            {/* Ulquiorra overlapping bottom-right of selfie */}
            <div style={{
              position: 'absolute',
              bottom: '60px',
              right: '-210px',
              border: '2px solid rgba(250,243,243,0.85)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.03)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(2px)',
              transition: 'transform 0.3s ease',
              transform: ulquiorraHovered ? 'rotate(1deg) scale(1.02)' : 'rotate(4deg) scale(1)',
              pointerEvents: 'auto',
            }}>
              <img
                ref={ulquiorraRef}
                src="/characters/ulquiorra-cifer.jpg"
                alt="Ulquiorra Cifer"
                className="gold-glow img-ulq"
                style={{ height: '30vh', width: 'auto', objectFit: 'contain', display: 'block', cursor: 'none' }}
                onClick={() => setUlqEditActive(true)}
              />
            </div>
          </div>
        </div>

      </main>

      {/* d4 background */}
      <img
        ref={d4Ref}
        src="/background/d4imgCropped.png"
        alt=""
        className="gold-glow img-d4"
        style={{
          width: 200,
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          position: 'fixed',
          bottom: '43%',
          left: '39%',
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
      <div className="fixed pointer-events-auto" style={{ bottom: 0, left: '60%', transform: 'translateX(-50%)', zIndex: 10 }} onClick={() => {
  setGhoulActive(true)
  setGhoulIndex(0)
  setShowIpod(false)
  setTimeout(() => {
    const videos = ghoulScrollRef.current?.querySelectorAll('video')
    const first = videos?.[0] as HTMLVideoElement | undefined
    first?.play().catch(() => {})
  }, 150)
}}>
        <img
          src="/background/redlily.png"
          alt="red lily"
          className="gold-glow"
          style={{ height: '28vh', width: 'auto', objectFit: 'contain', display: 'block', cursor: 'none' }}
        />
      </div>

      {/* Stop music text control */}
      {!showIntro && (
        <div className="fixed z-[4900] pointer-events-auto" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <button
            data-clickable
            onClick={() => setShowIpod(v => !v)}
            className="ipod-btn"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '2rem',
              padding: '0.4rem 1.4rem',
              margin: 0,
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.75rem',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.18em',
              pointerEvents: 'auto',
              userSelect: 'none',
              outline: 'none',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 12px rgba(255,255,255,0.04)',
              transition: 'all 0.2s ease',
            }}
            aria-pressed={showIpod}
            aria-label={showIpod ? 'Hide iPod' : 'Show iPod'}
          >
            ipod
          </button>
        </div>
      )}
      </>
      )}

      {/* ── MOBILE LAYOUT (<768px) ── */}
      {sm && (
        <main style={{ height: '100dvh', overflow: 'hidden', padding: '2.5rem 0.25rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', zIndex: 2, position: 'relative' }}>

          {/* Hero + socials — outer wrapper so socials left-align with selfie */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0, alignSelf: 'flex-start', paddingLeft: '0' }}>

            {/* Selfie container — single source of truth for all overlay sizing */}
            <div style={{ position: 'relative', width: 'clamp(160px, 52vw, 260px)' }}>
              {/* Selfie */}
              <img src="/background/selfieTYPSESHIT.png" alt="selfie" style={{ width: '100%', height: 'auto', display: 'block', border: '2px solid rgba(255,255,255,0.85)' }} />
              {/* Name — overlaid above face */}
              <img src="/other/finalNamept2-1.png" alt="John Sang"
                onTouchStart={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1.06)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')}
                style={{ position: 'absolute', top: '-22%', left: '50%', transform: 'translateX(-50%)', width: '95%', transition: 'transform 0.3s ease' }} />
              {/* Ulquiorra — 58% of selfie width, pushed right */}
              <div style={{ position: 'absolute', top: '15%', left: '88%', width: '78%', border: '2px solid rgba(250,243,243,0.85)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(2px)', transform: 'rotate(4deg)' }} onClick={() => setUlqEditActive(true)}>
                <img src="/characters/ulquiorra-cifer.jpg" alt="Ulquiorra Cifer" className="gold-glow" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              {/* Mask — bottom right, 36% of selfie width */}
              <motion.img src="/other/ichigoMaskNoBG.png" alt="ichigo mask" className="gold-glow" style={{ position: 'absolute', bottom: '-14%', right: '-55%', width: '66%', height: 'auto' }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} onClick={triggerVasto} />
              {/* d4 — below mask, pulsing, 30% of selfie width */}
              <motion.img src="/background/d4imgCropped.png" alt="" className="gold-glow" style={{ position: 'absolute', bottom: '-38%', left: '50%', width: '60%', height: 'auto', zIndex: 50 }} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} onClick={triggerFaker} />
            </div>

            {/* Social links — row, left edge aligned with selfie */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[['linkedin', 'https://www.linkedin.com/in/johnsang-/'], ['github', 'https://github.com/JohnSang16'], ['instagram', 'https://www.instagram.com/john.sang0/'], ['tiktok', 'https://www.tiktok.com/@john.sang0']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.05em' }}>{label}</a>
              ))}
            </div>
          </div>

          {/* Reminders (left) + Panels (right) */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1rem', width: '100%', flex: 1, minHeight: 0, marginTop: '-0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem', minWidth: '28%', flexShrink: 0, zIndex: 60, position: 'relative', opacity: 0.85 }}>
              <h3 className="font-display text-xs tracking-widest text-white">reminders:</h3>
              {['stay goated', 'leet code daily', 'do exciting shit', 'give more than you get'].map(r => (
                <p key={r} className="font-mono text-white/70" style={{ fontSize: '0.6rem' }}>{r}</p>
              ))}
              <p className="font-mono aurafarm-text" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s ease, text-shadow 0.2s ease' }} onClick={triggerAura}>aurafarm</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', flex: 1, overflowY: 'auto', paddingRight: '0.25rem', scrollbarWidth: 'none', zIndex: 60, position: 'relative', opacity: 0.85 }}>
              <MangaPanel sfx="ドン！">
                <h2 className="font-display text-xs tracking-widest mb-1 text-center">abt me</h2>
                <p className="font-mono text-white/70 text-center" style={{ fontSize: '0.6rem' }}>lol midlane d2 · progsuhq vice president · professional larper · wpm 155</p>
              </MangaPanel>
              <MangaPanel sfx="バン！">
                <h2 className="font-display text-xs tracking-widest mb-1 text-center">training arc</h2>
                <p className="font-mono text-white/70 text-center" style={{ fontSize: '0.6rem' }}>land a swe internship · hit 80 coffeechats · build git · credit score maxx</p>
              </MangaPanel>
              <MangaPanel sfx="スゥ">
                <h2 className="font-display text-xs tracking-widest mb-1 text-center">skill tree</h2>
                <p className="font-mono text-white/70 text-center" style={{ fontSize: '0.6rem' }}>python · c · react · next.js · vercel · claude</p>
              </MangaPanel>
              <MangaPanel sfx="ドン！">
                <h2 className="font-display text-xs tracking-widest mb-1 text-center">goated ppl</h2>
                <p className="font-mono text-white/70 text-center" style={{ fontSize: '0.6rem' }}>
                  <a href="https://www.linkedin.com/in/joeyzhangdev/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>yaohui zhang</a> · ichigo kurosaki · faker · beifeng
                </p>
              </MangaPanel>
            </div>
          </div>

          {/* iPod + hint */}
          {!showIntro && (
            <>
              <div style={{ position: 'fixed', bottom: '28%', left: '50%', transform: 'translateX(-50%)', zIndex: 200 }}>
                <button className="ipod-btn" onClick={() => setShowIpod(v => !v)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '2rem', padding: '0.2rem 0.9rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em', outline: 'none' }} aria-pressed={showIpod}>
                  ipod
                </button>
              </div>
              {!vastoActive && (
                <span className="hint-gold-glow" style={{ position: 'fixed', top: '76%', left: '3%', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', zIndex: 200 }}>
                  hint: tap the gold items~
                </span>
              )}
            </>
          )}

          {/* Red lily — fixed bottom center */}
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10, lineHeight: 0, fontSize: 0 }} onClick={() => { setGhoulActive(true); setGhoulIndex(0); setShowIpod(false); setTimeout(() => { const videos = ghoulScrollRef.current?.querySelectorAll('video'); const first = videos?.[0] as HTMLVideoElement | undefined; first?.play().catch(() => {}) }, 150) }}>
            <img src="/background/redlily.png" alt="red lily" className="gold-glow" style={{ height: '18vh', width: 'auto', display: 'block', margin: 0, padding: 0 }} />
          </div>
        </main>
      )}

      <IPod
        visible={showIpod}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        trackName={PLAYLIST[trackIndex].name}
        albumArt={PLAYLIST[trackIndex].art}
        onSkipNext={() => {
          const next = (trackIndex + 1) % PLAYLIST.length
          setTrackIndex(next)
          setIsPlaying(true)
          setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
        }}
        onSkipPrev={() => {
          const prev = (trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length
          setTrackIndex(prev)
          setIsPlaying(true)
          setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
        }}
        onSeekForward={() => {
          if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 15)
        }}
        onSeekBack={() => {
          if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15)
        }}
      />


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
              src="/videos/ulquiorra-edit.mp4"
              autoPlay
              playsInline
              onEnded={() => setUlqEditActive(false)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: '60% center' }}
            />
            <span className="fixed pointer-events-none select-none" style={{ bottom: 24, left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', fontFamily: "'JetBrains Mono', monospace", zIndex: 8001 }}>
              credit: in7fv on tiktok
            </span>
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

      {/* Vasto Lorde gif overlay */}
      <AnimatePresence>
        {vastoActive && (
          <motion.div
            key="vasto-overlay"
            className="fixed inset-0 pointer-events-none flex items-center justify-center"
            style={{ zIndex: 8000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              key={vastoKey}
              src={`/videos/ichigo-vasto-lorde.gif?k=${vastoKey}`}
              alt="ichigo vasto lorde"
              style={{ height: '100%', width: 'auto' }}
            />
            <span style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.7rem, 2vw, 1rem)', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.08em', whiteSpace: 'nowrap', textShadow: '0 0 12px rgba(0,0,0,0.9)', zIndex: 8001 }}>
              POV: mom forgot to buy chicken nuggies
            </span>
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
                    <span style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>
                      credit: {credits[i]}
                    </span>
                    <video
                      src={src}
                      playsInline
                      muted
                      autoPlay={i === 0}
                      style={{ width: 'auto', maxWidth: '70%', height: 'auto', maxHeight: '85vh', display: 'block', borderRadius: 4, cursor: 'none' }}
                      onEnded={() => handleGhoulEnded(i)}
                      onClick={(e) => { const v = e.currentTarget; v.paused ? v.play().catch(() => {}) : v.pause() }}
                    />
                    {/* Arrows to the right of video */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                      {i > 0 && (
                        <button onClick={() => { const items = ghoulScrollRef.current?.children; (items?.[i - 1] as HTMLElement)?.scrollIntoView({ behavior: 'smooth' }) }}
                          className="ghoul-arrow"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1rem', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
                        >↑</button>
                      )}
                      {i < GHOUL_VIDEOS.length - 1 && (
                        <button onClick={() => { const items = ghoulScrollRef.current?.children; (items?.[i + 1] as HTMLElement)?.scrollIntoView({ behavior: 'smooth' }) }}
                          className="ghoul-arrow"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: '1rem', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
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
