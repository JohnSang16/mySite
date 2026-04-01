import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
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
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(207, 226, 171, 0.15) 0%, transparent 70%)',
            filter: 'blur(15px)',
            transition: 'left 0.0s ease, top 0.0s ease',
          }}
        />
      )}

      {/* Main cursor */}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
      >
        <motion.img
          src="/cursor/lol-cursor.png"
          alt=""
          width={120}
          height={120}
          animate={{ scale: isPointer ? 1.08 : 1 }}
          transition={{ duration: 0.05 }}
          style={{ transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          draggable={false}
        />
      </div>
    </>
  )
}
