"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Initialization after hydration to avoid mismatch
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true)
      setIsDark(document.documentElement.classList.contains("dark"))
    })
  }, [])

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.colorScheme = "light"
      localStorage.theme = "light"
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.style.colorScheme = "dark"
      localStorage.theme = "dark"
      setIsDark(true)
    }
  }

  if (!mounted) {
    return <div className="w-10 h-10" /> // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors shadow-sm"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
