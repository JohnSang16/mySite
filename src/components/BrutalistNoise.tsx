import { useEffect, useRef } from 'react'

const COMMENTS = [
  { text: 'lock in bro',          x: '8%',  y: '18%', rotate: -12, href: 'https://www.youtube.com/watch?v=nmcmx2sLa-4' },
  { text: '1000-7?',              x: '14%', y: '72%', rotate: 8,   href: 'https://www.youtube.com/watch?v=oPMoUP09RPQ' },
  { text: 'midbeast',             x: '72%', y: '82%', rotate: -6,  href: 'https://www.youtube.com/channel/UC6mWuX4R9Yn5y0fWCwzqiSg' },
  { text: 'faker what was that!?',x: '72%', y: '14%', rotate: 10,  href: 'https://www.youtube.com/watch?v=ZPCfoCVCx3U' },
  { text: 'focus.',               x: '38%', y: '88%', rotate: -9,  href: undefined },
  { text: 'cracked dev type shi', x: '62%', y: '28%', rotate: -8,  href: 'https://www.linkedin.com/in/johnsang-/' },
  { text: 'liam elison',          x: '20%', y: '35%', rotate: -4,  href: 'https://www.linkedin.com/in/liam-ellison/' },
  { text: 'diff player',          x: '55%', y: '12%', rotate: 11,  href: 'https://op.gg/lol/summoners/na/ZeroadTV-NA1' },
  { text: 'stay locked',          x: '30%', y: '60%', rotate: -14, href: undefined },
  { text: 'touch grass?',         x: '88%', y: '68%', rotate: 6,   href: undefined },
  { text: 'jared beresford',      x: '55%', y: '75%', rotate: -5,  href: 'https://www.linkedin.com/in/jaredberesford/' },
  { text: 'progsuhq',             x: '65%', y: '52%', rotate: 7,   href: 'https://www.linkedin.com/company/progsu/posts/?feedView=all' },
]

const COORDS = [
  { text: '[33.74, -84.38]', corner: 'bottom-left'  },
  { text: 'BUILD_v2.0.4',    corner: 'top-left'     },
  { text: 'built 3.31.2026 3am',    corner: 'top-right'    },
  { text: 'LAT 33° N',       corner: 'bottom-right' },
]

const WIREFRAMES = [
  // skewed box top-left area
  { x: 60,  y: 120, w: 90, h: 55,  skew: 8  },
  // skewed box bottom center
  { x: 420, y: 500, w: 70, h: 40,  skew: -6 },
]

export default function BrutalistNoise({ sm = false }: { sm?: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = layerRef.current
      if (!el) return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx   // -1 to 1
      const dy = (e.clientY - cy) / cy
      // move opposite direction for depth
      el.style.transform = `translate(${-dx * 8}px, ${-dy * 8}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Parallax layer */}
      <div
        ref={layerRef}
        className="fixed inset-0 pointer-events-none select-none"
        style={{ zIndex: 9990, transition: 'transform 0.1s linear' }}
      >

        {/* Geometric wireframe SVGs */}
        {WIREFRAMES.map((w, i) => (
          <svg
            key={i}
            className="absolute overflow-visible"
            style={{
              left: w.x, top: w.y,
              width: w.w, height: w.h,
              zIndex: -1,
              mixBlendMode: 'overlay',
            }}
            viewBox={`0 0 ${w.w} ${w.h}`}
            fill="none"
          >
            <rect
              x="1" y="1"
              width={w.w - 2} height={w.h - 2}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.75"
              transform={`skewX(${w.skew})`}
            />
          </svg>
        ))}

        {/* Crosshair */}
        <svg
          className="absolute"
          style={{ left: '22%', top: '38%', width: 28, height: 28, mixBlendMode: 'overlay' }}
          viewBox="0 0 28 28" fill="none"
        >
          <line x1="14" y1="0"  x2="14" y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75"/>
          <line x1="0"  y1="14" x2="28" y2="14" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75"/>
          <circle cx="14" cy="14" r="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75"/>
        </svg>

        {/* Floating toxic comments */}
        {COMMENTS.map((c, i) => {
          if (sm && c.text === 'cracked dev type shi') return null
          const x = sm && c.text === '1000-7?' ? '5%'
                  : sm && c.text === 'diff player' ? '72%'
                  : sm && c.text === 'progsuhq' ? '18%'
                  : sm && c.text === 'midbeast' ? '8%'
                  : c.x
          const y = sm && c.text === '1000-7?' ? '88%'
                  : sm && c.text === 'diff player' ? '88%'
                  : sm && c.text === 'progsuhq' ? '70%'
                  : c.y
          const style: React.CSSProperties = {
            left: x, top: y,
            transform: `rotate(${c.rotate}deg)`,
            color: 'rgba(255,255,255,0.45)',
            position: 'absolute',
          }
          return c.href ? (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs"
              style={{ ...style, textDecoration: 'none', pointerEvents: 'auto', cursor: 'none', outline: 'none' }}
            >{c.text}</a>
          ) : (
            <span key={i} className="font-mono text-xs" style={style}>{c.text}</span>
          )
        })}

      </div>

      {/* Corner coordinates — fixed, not in parallax layer */}
      {/* Terminal block — bottom left */}
      <div
        className="fixed pointer-events-none select-none"
        style={{ bottom: 32, right: '60%', zIndex: 20, opacity: 0.35, filter: 'blur(0.4px)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', lineHeight: 1.6, color: '#39FF14' }}
      >
        <div>#include &lt;stdio.h&gt;</div>
        <div>int main() {'{'}</div>
        <div>&nbsp;&nbsp;int aura = 9999;</div>
        <div>&nbsp;&nbsp;while(locked_in) grind();</div>
        <div>&nbsp;&nbsp;return "deez nuts";</div>
        <div>{'}'}</div>
      </div>

      {COORDS.map((c, i) => {
        const pos: React.CSSProperties =
          c.corner === 'top-left'     ? { top: 12,    left: 14  } :
          c.corner === 'top-right'    ? { top: 12,    right: 14 } :
          c.corner === 'bottom-left'  ? { bottom: 12, left: 14  } :
                                        { bottom: 12, right: 14 }
        return (
          <span
            key={i}
            className="fixed font-mono text-white/40 pointer-events-none select-none"
            style={{ fontSize: '0.6rem', letterSpacing: '0.08em', zIndex: 20, ...pos }}
          >
            {c.text}
          </span>
        )
      })}
    </>
  )
}
