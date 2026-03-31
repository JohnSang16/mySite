import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [isPointer, setIsPointer] = useState(false)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const target = e.target as Element
      setIsPointer(!!target.closest('a, button, [role="button"], [data-clickable]'))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x: springX, y: springY }}
    >
      <motion.img
        src="/cursor/lol-cursor.png"
        alt=""
        width={150}
        height={150}
        animate={{ scale: isPointer ? 1.15 : 1 }}
        transition={{ duration: 0.1 }}
        style={{ transform: 'translate(-12px, -4px)' }}
        draggable={false}
      />
    </motion.div>
  )
}
