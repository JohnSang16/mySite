import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SIZE = 120
const OFFSET_X = 58
const OFFSET_Y = 16

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

  const style = { left: pos.x, top: pos.y, transform: `translate(-${OFFSET_X}px, -${OFFSET_Y}px)` }

  return (
    <>
      {/* Glow orb */}
      {hasMoved && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            ...style,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(207, 226, 171, 0.15) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      )}

      {/* Main cursor */}
      <div className="fixed z-[999999] pointer-events-none" style={style}>
        <motion.img
          src="/cursor/lol-cursor.png"
          alt=""
          width={SIZE}
          height={SIZE}
          animate={{ scale: isPointer ? 1.08 : 1 }}
          transition={{ duration: 0.05 }}
          style={{ pointerEvents: 'none', display: 'block' }}
          draggable={false}
        />
      </div>
    </>
  )
}
