import React, { useEffect, useState } from 'react'
import { useThemeStore, THEME_DARK, THEME_LIGHT } from '@/store/themeStore'
import { FaSun, FaMoon } from 'react-icons/fa'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDarkTheme } = useThemeStore()
  const [isDark, setIsDark] = useState<boolean>(isDarkTheme())

  useEffect(() => {
    setIsDark(isDarkTheme())
  }, [theme, isDarkTheme])

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked ? THEME_DARK : THEME_LIGHT
    setTheme(newTheme)
  }

  return (
    <div className="flex items-center gap-2" data-testid="theme-toggle">
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          checked={isDark}
          onChange={handleToggle}
        />

        {/* Sun icon from react-icons */}
        <FaSun className="w-6 h-6 swap-off" />

        {/* Moon icon from react-icons */}
        <FaMoon className="w-6 h-6 swap-on" />
      </label>

      {theme !== THEME_LIGHT && theme !== THEME_DARK && (
        <div className="badge badge-accent">{theme}</div>
      )}
    </div>
  )
}

export default ThemeToggle
