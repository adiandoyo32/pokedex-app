import { useEffect, useRef } from 'react'

export default function UpscaledSprite() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif'

    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const scale = 2 // 4x upscale
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      ctx.imageSmoothingEnabled = false // nearest neighbor
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }, [])

  return <canvas ref={canvasRef} />
}
