import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sprite, useTexture } from '@react-three/drei'
import playerImg from '../assets/player.png'

export default function Player({ position, points, ghosts, onEatPoint, onHitGhost, }) {
  const playerRef = useRef()
  const texture = useTexture(playerImg)

  const speed = 0.1

  const keys = {}
  window.addEventListener('keydown', (e) => keys[e.key] = true)
  window.addEventListener('keyup', (e) => keys[e.key] = false)

  useFrame(() => {
    if (!playerRef.current) return
    const p = playerRef.current.position
    if (keys['ArrowUp']) p.y += speed
    if (keys['ArrowDown']) p.y -= speed
    if (keys['ArrowLeft']) p.x -= speed
    if (keys['ArrowRight']) p.x += speed

    points.forEach(pt => {
      if (p.distanceTo(pt.position) < 0.5) onEatPoint(pt)
    })
    ghosts.forEach(g => {
      if (p.distanceTo(g.position) < 0.5) onHitGhost()
    })
    })

  return <Sprite ref={playerRef} position={position} scale={[1,1,1]} map={texture} />
}