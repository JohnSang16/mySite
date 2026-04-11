import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import BrutalistNoise from '@/components/BrutalistNoise'
import MangaPanel from '@/components/MangaPanel'
import Intro from '@/components/Intro'
import IPod from '@/components/IPod'
import MangaCarousel from '@/components/MangaCarousel'
import { useAlphaHover } from '@/hooks/useAlphaHover'
import { Analytics } from '@vercel/analytics/react'


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
    { src: "/sfx/Nightcore I'm Gonna Show You Crazy  Lyrics.mp3", name: "I'm Gonna Show You Crazy", art: '/background/juuzouimgonashowoyucrazyimage.jpg' },
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
      {!vastoActive && !fakerActive && !auraActive && !ulqEditActive && !ghoulActive && <BrutalistNoise sm={sm} onAura={triggerAura} />}

      {/* ── DESKTOP LAYOUT (≥768px) ── */}
      {!sm && (
      <>
      {!vastoActive && (
        <motion.span
          className="hint-gold-glow fixed font-mono pointer-events-none select-none"
          style={{ top: 'calc(70% + 2.5rem)', left: '32%', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', zIndex: 7999, whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: [0, 1, 1, 0.6, 1], x: 0, skewX: [0, -3, 0, 2, 0] }}
          transition={{ duration: 1.2, ease: 'easeOut', times: [0, 0.4, 0.6, 0.75, 1] }}
        >
          click around! you might like what you find..
        </motion.span>
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
          style={{ top: '-3%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: 15, pointerEvents: 'auto' }}
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



        {/* Reminder column */}
        <motion.div
          className="fixed pointer-events-auto select-none flex flex-col items-start gap-1"
          style={{ zIndex: 4, left: 56, top: 116, maxWidth: '28%', textAlign: 'left' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <h3 className="font-display text-sm tracking-widest text-white reminder-hover" style={{ pointerEvents: 'auto' }}>reminders:</h3>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>stay goated</p>
          <a href="https://leetcode.com/problemset/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto', textDecoration: 'none', cursor: 'none' }}>leet code daily</a>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>do exciting shit</p>
          <p className="font-mono text-xs aurafarm-text" style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s ease, text-shadow 0.2s ease' }} onClick={triggerAura}>aurafarm</p>
          <p className="font-mono text-xs text-white/70 reminder-hover" style={{ pointerEvents: 'auto' }}>give more than you get</p>
        </motion.div>

        {/* Manga recs column */}
        <motion.div
          className="fixed pointer-events-auto select-none flex flex-col items-start gap-1"
          style={{ zIndex: 4, left: 56, top: 250, maxWidth: '28%', textAlign: 'left' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <h3 className="font-display text-sm tracking-widest text-white reminder-hover" style={{ pointerEvents: 'auto' }}>manga recs:</h3>
          {[
            { label: 'vagabond',                   href: 'https://myanimelist.net/manga/656/Vagabond' },
            { label: 'tokyo ghoul',                href: 'https://myanimelist.net/manga/33327/Tokyo_Ghoul' },
            { label: 'aot',                        href: 'https://myanimelist.net/manga/23390/Shingeki_no_Kyojin' },
            { label: 'one piece',                  href: 'https://myanimelist.net/manga/13/One_Piece' },
            { label: 'bleach',                     href: 'https://myanimelist.net/manga/12/Bleach' },
            { label: 'greatest estate developer',  href: 'https://myanimelist.net/manga/147272/The_Greatest_Estate_Developer' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-white/70 reminder-hover"
              style={{ pointerEvents: 'auto', textDecoration: 'none', cursor: 'none' }}
            >{label}</a>
          ))}
        </motion.div>

        {/* abt me + training arc — top right, above skill tree */}
        <motion.div
          className="fixed flex flex-col gap-3 abt-panel"
          style={{ top: 40, right: 16, zIndex: 10, width: '220px' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <MangaPanel sfx="ドン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">abt me</h2>
            <p className="font-mono text-xs text-white/80 text-center"> lol midlane d2 · progsuhq vice president · professional larper · wpm 155</p>
          </MangaPanel>
          <MangaPanel sfx="バン！">
            <h2 className="font-display text-xs tracking-widest mb-1 text-center">training arc</h2>
            <p className="font-mono text-xs text-white/80 text-center">land a swe internship · hit 80 coffeechats · build git · credit score maxx</p>
          </MangaPanel>
        </motion.div>

        {/* skill tree + goated ppl + manga recs — top right, below abt me */}
        <motion.div
          className="fixed flex flex-col gap-3 skill-panel"
          style={{ top: 304, right: 16, zIndex: 10, width: '220px' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
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
        </motion.div>

        {/* Selfie + Ulquiorra — shared container */}
        <div className="fixed" style={{ top: '38%', left: '33%', transform: 'translate(-50%, -50%)', zIndex: 5, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
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
          {/* Social links — left-aligned under selfie */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', pointerEvents: 'auto' }}>
            <a href="https://www.linkedin.com/in/johnsang-/" target="_blank" rel="noreferrer" className="font-mono text-white/50 reminder-hover" style={{ textDecoration: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>linkedin ↗</a>
            <a href="https://github.com/JohnSang16" target="_blank" rel="noreferrer" className="font-mono text-white/50 reminder-hover" style={{ textDecoration: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>github ↗</a>
            <a href="https://www.instagram.com/john.sang0/" target="_blank" rel="noreferrer" className="font-mono text-white/50 reminder-hover" style={{ textDecoration: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>instagram ↗</a>
            <a href="https://www.tiktok.com/@john.sang0" target="_blank" rel="noreferrer" className="font-mono text-white/50 reminder-hover" style={{ textDecoration: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>tiktok ↗</a>
          </div>
          </div>
        </div>

      </main>

      {/* Flower background elements */}
      {[
        { src: '/background/flower1.jpg', top: '2%',  left: '2%',  size: 'clamp(120px, 14vw, 200px)' },
        { src: '/background/flower2.jpg', top: '2%',  left: '44%', size: 'clamp(120px, 14vw, 200px)' },
        { src: '/background/flower3.jpg', bottom: '2%', left: '2%', size: 'clamp(120px, 14vw, 200px)' },
        { src: '/background/flower3.jpg', bottom: '2%', left: '6%', size: 'clamp(120px, 14vw, 200px)' },
      ].map(({ src, size, ...pos }) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'fixed',
            ...pos,
            width: size,
            height: 'auto',
            opacity: 0.35,
            zIndex: 1,
            pointerEvents: 'none',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            filter: 'invert(1)',
          }}
        />
      ))}

      {/* Ambient background images */}
      <img
        src="/background/cybersigil 1.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'clamp(220px, 24vw, 360px)',
          height: 'auto',
          opacity: 0.35,
          zIndex: 1,
          pointerEvents: 'none',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          filter: 'grayscale(30%)',
        }}
      />
      <img
        src="/background/cybersigil2.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '45%',
          left: '24%',
          width: 'clamp(160px, 18vw, 260px)',
          height: 'auto',
          opacity: 0.35,
          zIndex: 20,
          pointerEvents: 'none',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          filter: 'grayscale(30%)',
        }}
      />
      <img
        src="/background/cgangel.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '30%',
          left: '48%',
          width: 'clamp(200px, 22vw, 340px)',
          height: 'auto',
          opacity: 0.3,
          zIndex: 1,
          pointerEvents: 'none',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          filter: 'grayscale(20%)',
        }}
      />

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

      {/* Flower4 cluster — replaces red lily */}
      {[
        { bottom: '-8%',  left: '38%', rotate: '-32deg' },
        { bottom: '-5%',  left: '41%', rotate: '-22deg' },
        { bottom: '-3%',  left: '44%', rotate: '-12deg' },
        { bottom: '-1%',  left: '47%', rotate: '-4deg'  },
        { bottom: '0%',   left: '50%', rotate: '4deg'   },
        { bottom: '-1%',  left: '53%', rotate: '12deg'  },
        { bottom: '-3%',  left: '56%', rotate: '20deg'  },
        { bottom: '-5%',  left: '59%', rotate: '28deg'  },
        { bottom: '-8%',  left: '62%', rotate: '36deg'  },
      ].map(({ bottom, left, rotate }, i) => (
        <div
          key={i}
          className="fixed pointer-events-auto"
          style={{ bottom, left, zIndex: 10, cursor: 'none', mixBlendMode: 'screen' }}
          onClick={() => {
            setGhoulActive(true)
            setGhoulIndex(0)
            setShowIpod(false)
            setTimeout(() => {
              const videos = ghoulScrollRef.current?.querySelectorAll('video')
              const first = videos?.[0] as HTMLVideoElement | undefined
              first?.play().catch(() => {})
            }, 150)
          }}
        >
          <img
            src="/background/flower4.jpg"
            alt=""
            className="flower-cluster-img"
            style={{
              width: 'clamp(120px, 14vw, 200px)',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              cursor: 'none',
              transform: `rotate(${rotate})`,
              opacity: 0.35,
              mixBlendMode: 'screen',
            }}
          />
        </div>
      ))}

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
              padding: '0.6rem 2.2rem',
              margin: 0,
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1rem',
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

      {/* Cyber sigil 1 — mobile top right, outside main to avoid stacking context issues */}
      {sm && !vastoActive && !ulqEditActive && !ghoulActive && !fakerActive && !auraActive && <img src="/background/cybersigil 1.jpg" alt="" style={{ position: 'fixed', top: 12, right: 12, width: '120px', height: 'auto', opacity: 0.9, mixBlendMode: 'screen', zIndex: 9999, pointerEvents: 'none' }} />}
      {/* cgangel — mobile bottom left */}
      {sm && <img src="/background/cgangel.jpg" alt="" aria-hidden="true" style={{ position: 'fixed', bottom: '0%', left: '0%', width: 'clamp(140px, 42vw, 220px)', height: 'auto', opacity: 0.3, zIndex: 1, pointerEvents: 'none', objectFit: 'contain', mixBlendMode: 'screen', filter: 'grayscale(20%)' }} />}
      {/* flower1 — mobile top left */}
      {sm && <img src="/background/flower1.jpg" alt="" aria-hidden="true" style={{ position: 'fixed', top: '2%', left: '2%', width: 'clamp(80px, 22vw, 140px)', height: 'auto', opacity: 0.35, zIndex: 1, pointerEvents: 'none', objectFit: 'contain', mixBlendMode: 'screen', filter: 'invert(1)' }} />}
      {/* flower2 — mobile top center */}
      {sm && <img src="/background/flower2.jpg" alt="" aria-hidden="true" style={{ position: 'fixed', top: '2%', left: '44%', width: 'clamp(80px, 22vw, 140px)', height: 'auto', opacity: 0.35, zIndex: 1, pointerEvents: 'none', objectFit: 'contain', mixBlendMode: 'screen', filter: 'invert(1)' }} />}

      {/* ── MOBILE LAYOUT (<768px) ── */}
      {sm && (
        <main style={{ height: '100dvh', overflow: 'hidden', padding: '0 0.25rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', zIndex: 2, position: 'relative' }}>

          {/* Hero + socials — outer wrapper so socials left-align with selfie */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0, alignSelf: 'flex-start', paddingLeft: '0', marginTop: '3rem' }}>

            {/* Selfie container — single source of truth for all overlay sizing */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'clamp(160px, 52vw, 260px)' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Name — absolute, just above selfie */}
              <img src="/other/finalNamept2-1.png" alt="John Sang"
                onTouchStart={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1.06)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')}
                style={{ position: 'absolute', top: '-22%', left: '50%', transform: 'translateX(-50%)', width: '95%', transition: 'transform 0.3s ease', zIndex: 2 }} />
              {/* Selfie */}
              <img src="/background/selfieTYPSESHIT.png" alt="selfie" style={{ width: '100%', height: 'auto', display: 'block', border: '2px solid rgba(255,255,255,0.85)' }} />
              {/* Ulquiorra — 58% of selfie width, pushed right */}
              <div style={{ position: 'absolute', top: '15%', left: '88%', width: '78%', border: '2px solid rgba(250,243,243,0.85)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(2px)', transform: 'rotate(4deg)' }} onClick={() => setUlqEditActive(true)}>
                <img src="/characters/ulquiorra-cifer.jpg" alt="Ulquiorra Cifer" className="gold-glow" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              {/* Mask — bottom right, 36% of selfie width */}
              <motion.img src="/other/ichigoMaskNoBG.png" alt="ichigo mask" className="gold-glow" style={{ position: 'absolute', bottom: '-6%', right: '-55%', width: '66%', height: 'auto' }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} onClick={triggerVasto} />
              {/* d4 — below mask, pulsing, 30% of selfie width */}
              <motion.img src="/background/d4imgCropped.png" alt="" className="gold-glow" style={{ position: 'absolute', bottom: '-44%', left: '50%', width: '60%', height: 'auto', zIndex: 50 }} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} onClick={triggerFaker} />
            </div>
            </div>

            {/* Social links — row, left edge aligned with selfie */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[['linkedin', 'https://www.linkedin.com/in/johnsang-/'], ['github', 'https://github.com/JohnSang16'], ['instagram', 'https://www.instagram.com/john.sang0/'], ['tiktok', 'https://www.tiktok.com/@john.sang0']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.05em' }}>{label}</a>
              ))}
            </div>
          </div>

          {/* Reminders (left) + Panels (right) */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1rem', width: '100%', flex: 1, minHeight: 0, marginTop: '-0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem', minWidth: '28%', flexShrink: 0, zIndex: 60, position: 'relative', opacity: 0.85 }}>
              <h3 className="font-display text-xs tracking-widest text-white" style={{ marginTop: '0.75rem' }}>reminders:</h3>
              {['stay goated', 'leet code daily', 'do exciting shit', 'give more than you get'].map(r => (
                <p key={r} className="font-mono text-white/70" style={{ fontSize: '0.6rem' }}>{r}</p>
              ))}
              <p className="font-mono aurafarm-text" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s ease, text-shadow 0.2s ease' }} onClick={triggerAura}>aurafarm</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', flex: 1, overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%', paddingRight: '0.25rem', scrollbarWidth: 'none', zIndex: 60, position: 'relative', opacity: 0.85 }}>
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
                <h2 className="font-display text-xs tracking-widest mt-2 mb-1 text-center">manga recs</h2>
                <div className="flex flex-col gap-0.5">
                  {[
                    { label: 'vagabond',                  href: 'https://myanimelist.net/manga/656/Vagabond' },
                    { label: 'tokyo ghoul',               href: 'https://myanimelist.net/manga/33327/Tokyo_Ghoul' },
                    { label: 'aot',                       href: 'https://myanimelist.net/manga/23390/Shingeki_no_Kyojin' },
                    { label: 'one piece',                 href: 'https://myanimelist.net/manga/13/One_Piece' },
                    { label: 'bleach',                    href: 'https://myanimelist.net/manga/12/Bleach' },
                    { label: 'greatest estate developer', href: 'https://myanimelist.net/manga/147272/The_Greatest_Estate_Developer' },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-white/70 text-center reminder-hover"
                      style={{ fontSize: '0.6rem', textDecoration: 'none' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </MangaPanel>
            </div>
          </div>

          {/* iPod + hint */}
          {!showIntro && (
            <>
              <div style={{ position: 'fixed', bottom: '32%', left: '50%', transform: 'translateX(-50%)', zIndex: 200 }}>
                <button className="ipod-btn" onClick={() => setShowIpod(v => !v)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '2rem', padding: '0.2rem 0.9rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em', outline: 'none' }} aria-pressed={showIpod}>
                  ipod
                </button>
              </div>
              {!vastoActive && (
                <span className="hint-gold-glow" style={{ position: 'fixed', top: '76%', left: '3%', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', zIndex: 200 }}>
                  click around! you might like what you find..
                </span>
              )}
            </>
          )}

          {/* Flower4 cluster — mobile */}
          {[
            { bottom: '-4%',  left: '20%', rotate: '-32deg' },
            { bottom: '-2%',  left: '27%', rotate: '-22deg' },
            { bottom: '0%',   left: '34%', rotate: '-10deg' },
            { bottom: '0%',   left: '41%', rotate: '2deg'   },
            { bottom: '0%',   left: '48%', rotate: '12deg'  },
            { bottom: '-2%',  left: '55%', rotate: '22deg'  },
            { bottom: '-4%',  left: '62%', rotate: '32deg'  },
          ].map(({ bottom, left, rotate }, i) => (
            <div
              key={i}
              className="fixed pointer-events-auto"
              style={{ bottom, left, zIndex: 10, cursor: 'none', mixBlendMode: 'screen' }}
              onClick={() => { setGhoulActive(true); setGhoulIndex(0); setShowIpod(false); setTimeout(() => { const videos = ghoulScrollRef.current?.querySelectorAll('video'); const first = videos?.[0] as HTMLVideoElement | undefined; first?.play().catch(() => {}) }, 150) }}
            >
              <img
                src="/background/flower4.jpg"
                alt=""
                className="flower-cluster-img"
                style={{
                  width: 'clamp(70px, 16vw, 110px)',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  cursor: 'none',
                  transform: `rotate(${rotate})`,
                  opacity: 0.35,
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          ))}
        </main>
      )}

      {!sm && <MangaCarousel />}

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
      <Analytics />
    </>
  )
}
