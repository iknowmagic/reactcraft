import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { IoColorPalette } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useThemeStore,
  THEME_DARK,
  THEME_LIGHT,
  THEME_SYSTEM,
  Theme,
} from '@/store/themeStore'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore()
  const [_resolved, setResolved] = useState<Theme>(THEME_LIGHT)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const resolve = () => (media.matches ? THEME_DARK : THEME_LIGHT)

    if (theme === THEME_SYSTEM) {
      setResolved(resolve())
    } else {
      setResolved(theme)
    }

    const handleChange = () => {
      if (theme === THEME_SYSTEM) {
        setResolved(resolve())
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [theme])

  const cycleTheme = () => {
    const order: Theme[] = [THEME_LIGHT, THEME_DARK, THEME_SYSTEM]
    const next = order[(order.indexOf(theme) + 1) % order.length]
    setTheme(next)
  }

  const icon = () => {
    if (theme === THEME_SYSTEM)
      return <IoColorPalette key="system" className="w-6 h-6" />
    if (theme === THEME_DARK) return <FaMoon key="dark" className="w-6 h-6" />
    return <FaSun key="light" className="w-6 h-6" />
  }

  return (
    <button
      onClick={cycleTheme}
      className="btn btn-ghost btn-square"
      data-testid="theme-toggle"
      title={`Theme: ${theme}`}
    >
      <div className="relative flex justify-center items-center w-6 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            {icon()}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  )
}

export default ThemeToggle
