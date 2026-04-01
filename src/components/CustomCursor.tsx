import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const TRAIL_MAX = 80

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const rafRef = useRef<number>(0)
  const hasMovedRef = useRef(false)
  const frameRef = useRef(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      hasMovedRef.current = true
      setPos({ x: e.clientX, y: e.clientY })

      const target = e.target as Element
      setIsPointer(
        !!target.closest(
          'a, button, [role="button"], [data-clickable], p, span, h1, h2, h3, h4, h5, h6, li, dt, dd'
        )
      )

      trailRef.current.unshift({ x: e.clientX, y: e.clientY })
      if (trailRef.current.length > TRAIL_MAX) trailRef.current.length = TRAIL_MAX
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const draw = () => {
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current
      if (!hasMovedRef.current || trail.length < 2) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }


      for (let i = 1; i < trail.length - 1; i++) {
        const t = i / trail.length
        const alpha = (1 - t) * 0.9

        const prev = trail[i - 1]
        const curr = trail[i]
        const next = trail[i + 1]

        const width = (1 - t) * 10 + 1

        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.quadraticCurveTo(curr.x, curr.y, (curr.x + next.x) / 2, (curr.y + next.y) / 2)
        const lightness = Math.round(t * 100)
        ctx.strokeStyle = `hsla(0, 0%, ${lightness}%, ${alpha})`
        ctx.lineWidth = width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = `rgba(255,255,255,${alpha * 0.4})`
        ctx.shadowBlur = 6
        ctx.stroke()
      }

      // Shrink trail every 3 frames so it fades gradually when mouse stops
      frameRef.current += 1
      if (frameRef.current % 3 === 0 && trailRef.current.length > 0) {
        trailRef.current = trailRef.current.slice(0, trailRef.current.length - 1)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

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
