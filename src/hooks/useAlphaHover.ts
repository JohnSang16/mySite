import { useEffect, useRef, useState } from 'react'

export function useAlphaHover(threshold = 10) {
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const buildCanvas = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvasRef.current = canvas
    }

    if (img.complete) buildCanvas()
    else img.addEventListener('load', buildCanvas)

    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = img.getBoundingClientRect()
      const scaleX = img.naturalWidth / rect.width
      const scaleY = img.naturalHeight / rect.height
      const x = Math.floor((e.clientX - rect.left) * scaleX)
      const y = Math.floor((e.clientY - rect.top) * scaleY)
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        setHovered(false)
        return
      }
      const alpha = canvas.getContext('2d')!.getImageData(x, y, 1, 1).data[3]
      setHovered(alpha > threshold)
    }

    const onLeave = () => setHovered(false)

    img.addEventListener('mousemove', onMove)
    img.addEventListener('mouseleave', onLeave)
    return () => {
      img.removeEventListener('mousemove', onMove)
      img.removeEventListener('mouseleave', onLeave)
    }
  }, [threshold])

  return { imgRef, hovered }
}
