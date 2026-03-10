"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Users, Sparkles, Calendar, HelpCircle, MapPin, Type, Hash, CheckCircle, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CURPSegment, RFCSegment } from "@/lib/curp-rfc-decoder"

const iconMap: Record<string, React.ReactNode> = {
  "user": <User className="w-5 h-5 text-icon-active" />,
  "users": <Users className="w-5 h-5 text-icon-active" />,
  "sparkles": <Sparkles className="w-5 h-5 text-icon-active" />,
  "calendar": <Calendar className="w-5 h-5 text-icon-active" />,
  "help-circle": <HelpCircle className="w-5 h-5 text-icon-inactive" />,
  "map-pin": <MapPin className="w-5 h-5 text-icon-active" />,
  "type": <Type className="w-5 h-5 text-icon-active" />,
  "hash": <Hash className="w-5 h-5 text-icon-active" />,
  "check-circle": <CheckCircle className="w-5 h-5 text-icon-active" />,
  "building": <Building className="w-5 h-5 text-icon-active" />,
}

interface DecoderDisplayProps {
  value: string
  segments: (CURPSegment | RFCSegment)[]
  type: "curp" | "rfc"
}

export function DecoderDisplay({ value, segments }: DecoderDisplayProps) {
  const [visibleSegments, setVisibleSegments] = useState<number>(0)
  const upperValue = value.toUpperCase()

  useEffect(() => {
    // Reset and animate when segments change
    // Schedule reset outside synchronous effect body
    const resetTimer = setTimeout(() => setVisibleSegments(0), 0)
    let animTimer: ReturnType<typeof setInterval> | undefined
    if (segments.length > 0) {
      animTimer = setInterval(() => {
        setVisibleSegments((prev) => {
          if (prev >= segments.length) {
            clearInterval(animTimer)
            return prev
          }
          return prev + 1
        })
      }, 100)
    }
    return () => {
      clearTimeout(resetTimer)
      if (animTimer) clearInterval(animTimer)
    }
  }, [segments.length, value])

  if (!value) return null

  return (
    <div className="w-full space-y-10" aria-live="polite">
      {/* Character Display */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {upperValue.split("").map((char, index) => {
          const segment = segments.find(
            (s) => index >= s.startIndex && index <= s.endIndex
          )
          const segmentIndex = segment ? segments.indexOf(segment) : -1
          const isVisible = segmentIndex < visibleSegments

          return (
            <motion.div
              key={`${index}-${char}`} // Force re-animation if char changes
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ 
                scale: isVisible && segment ? 1.05 : 1, 
                opacity: isVisible && segment ? 1 : 0.6,
                y: 0,
                backgroundColor: isVisible && segment ? segment.color : "transparent"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                delay: isVisible && segment ? (index % 4) * 0.05 : 0 // Small cascade delay
              }}
              className={cn(
                "relative flex h-12 w-8 sm:h-16 sm:w-11 items-center justify-center rounded-sm text-xl sm:text-2xl font-mono tabular-nums border transition-colors duration-200",
                isVisible && segment
                  ? "text-foreground font-medium border-transparent shrink-0 shadow-sm"
                  : "bg-transparent text-muted-foreground border-border text-sm sm:text-base"
              )}
            >
              {char}
            </motion.div>
          )
        })}
      </div>

      {/* Segment Cards */}
      <motion.div 
        className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {segments.map((segment, index) => (
          <motion.div
            key={`${segment.type}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.98 },
              show: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 24 }
              }
            }}
            className={cn(
              "rounded-lg p-5 bg-card border border-border shadow-sm transition-colors",
              index < visibleSegments ? "opacity-100" : "opacity-50 grayscale"
            )}
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card-alt"
                style={{ borderColor: segment.color }}
              >
                {iconMap[segment.icon] || <HelpCircle className="w-5 h-5 text-foreground" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2 pb-2">
                  <span
                    className="rounded-sm px-2 py-0.5 text-xs font-mono font-medium text-foreground border border-border"
                    style={{ backgroundColor: segment.color }}
                  >
                    {segment.chars}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate pl-1">
                    {segment.label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
