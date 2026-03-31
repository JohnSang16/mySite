import { useEffect, useRef } from 'react'

const COMMENTS = [
  { text: 'lock in bro', x: '8%',  y: '18%', rotate: -12 },
  { text: '1000-7?',     x: '14%', y: '72%', rotate: 8  },
  { text: 'ur lazy',     x: '72%', y: '82%', rotate: -6 },
  { text: 'gm.',         x: '82%', y: '14%', rotate: 10 },
  { text: 'focus.',      x: '38%', y: '88%', rotate: -9 },
  { text: 'ship it',     x: '5%',  y: '44%', rotate: 5  },
]

const COORDS = [
  { text: '[33.74, -84.38]', corner: 'bottom-left'  },
  { text: 'BUILD_v2.0.4',    corner: 'top-left'     },
  { text: 'STATUS: ONLINE',  corner: 'top-right'    },
  { text: 'LAT 33° N',       corner: 'bottom-right' },
]

const WIREFRAMES = [
  // skewed box top-left area
  { x: 60,  y: 120, w: 90, h: 55,  skew: 8  },
  // skewed box bottom center
  { x: 420, y: 500, w: 70, h: 40,  skew: -6 },
]

export default function BrutalistNoise() {
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
        style={{ zIndex: 1, transition: 'transform 0.1s linear' }}
      >

        {/* Floating toxic comments */}
        {COMMENTS.map((c, i) => (
          <span
            key={i}
            className="absolute font-mono text-white/10 text-xs"
            style={{ left: c.x, top: c.y, transform: `rotate(${c.rotate}deg)` }}
          >
            {c.text}
          </span>
        ))}

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

      </div>

      {/* Corner coordinates — fixed, not in parallax layer */}
      {COORDS.map((c, i) => {
        const pos: React.CSSProperties =
          c.corner === 'top-left'     ? { top: 12,    left: 14  } :
          c.corner === 'top-right'    ? { top: 12,    right: 14 } :
          c.corner === 'bottom-left'  ? { bottom: 12, left: 14  } :
                                        { bottom: 12, right: 14 }
        return (
          <span
            key={i}
            className="fixed font-mono text-white/20 pointer-events-none select-none"
            style={{ fontSize: '0.6rem', letterSpacing: '0.08em', zIndex: 20, ...pos }}
          >
            {c.text}
          </span>
        )
      })}
    </>
  )
}
