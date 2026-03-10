"use client"

import { useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  animDuration: number
  delay: number
}

const COLORS = [
  "#f97316", // orange
  "#1e3a5f", // navy
  "#22c55e", // green
  "#eab308", // yellow
  "#ef4444", // red
  "#3b82f6", // blue
]

function generateParticles(): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < 50; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      animDuration: 2 + Math.random(),
      delay: i * 20,
    })
  }
  return particles
}

export function Confetti() {
  const [particles] = useState<Particle[]>(generateParticles)

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute h-3 w-2 rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
            animation: `confetti-fall ${particle.animDuration}s ease-out ${particle.delay}ms forwards`,
          }}
        />
      ))}
    </div>
  )
}
