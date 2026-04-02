import { useEffect, useState } from 'react'

const SIZE = 120
const OFFSET_X = 58
const OFFSET_Y = 28

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setHasMoved(true)

      const target = e.target as Element
      setIsPointer(
        !!target.closest(
          'a, button, [role="button"], [data-clickable], p, span, h1, h2, h3, h4, h5, h6, li, dt, dd'
        )
      )
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Glow orb */}
      {hasMoved && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: 0,
            top: 0,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(207, 226, 171, 0.15) 0%, transparent 70%)',
            filter: 'blur(15px)',
            transform: `translate(${pos.x - OFFSET_X}px, ${pos.y - OFFSET_Y}px)`,
            willChange: 'transform',
          }}
        />
      )}

      {/* Main cursor */}
      <div className="fixed z-[999999] pointer-events-none" style={{ left: 0, top: 0, transform: `translate(${pos.x - OFFSET_X}px, ${pos.y - OFFSET_Y}px)`, willChange: 'transform' }}>
        <img
          src="/cursor/lol-cursor.png"
          alt=""
          width={SIZE}
          height={SIZE}
          style={{
            pointerEvents: 'none',
            display: 'block',
            transform: isPointer ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.05s',
          }}
          draggable={false}
        />
      </div>
    </>
  )
}
