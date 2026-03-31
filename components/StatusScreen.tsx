'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'NAME',   value: 'JOHN SANG' },
  { label: 'CLASS',  value: 'SOFTWARE ENGINEER' },
  { label: 'LEVEL',  value: 'soph → GT transfer' },
  { label: 'ARC',    value: 'SWE Internship Hunt' },
  { label: 'SKILLS', value: 'React · C++ · LoL Mid' },
]

export default function StatusScreen() {
  return (
    <motion.div
      className="panel p-4 w-full text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="font-display text-3xl tracking-widest mb-3 glow-hover">
        STATUS SCREEN
      </h1>

      <div className="flex flex-col gap-1.5 font-mono text-xs items-center">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex gap-2 items-baseline w-full justify-center">
            <span className="text-accent tracking-widest shrink-0">{label}</span>
            <span className="text-white/90">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
