"use client"

import { useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  vx: number
  vy: number
  animDuration: number
}

const COLORS = [
  "#f97316", // orange
  "#1e3a5f", // navy
  "#22c55e", // green
  "#eab308", // yellow
  "#ef4444", // red
  "#3b82f6", // blue
]

// rerender-lazy-state-init: compute particles once at mount via lazy initializer
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
      vx: (Math.random() - 0.5) * 2,
      vy: 2 + Math.random() * 3,
      animDuration: 2 + Math.random(),
    })
  }
  return particles
}

export function Confetti() {
  const [particles] = useState<Particle[]>(generateParticles)

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute h-3 w-2 animate-confetti"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animationDelay: `${particle.id * 20}ms`,
            animationDuration: `${particle.animDuration}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
