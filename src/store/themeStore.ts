import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme constants - centralized in store
export const THEME_DARK = 'dark'
export const THEME_LIGHT = 'reactcraft-light'
export const AVAILABLE_THEMES = [
  'light',
  'dark',
  'retro',
  'cupcake',
  'reactcraft-light',
] as const

export type Theme = (typeof AVAILABLE_THEMES)[number]

interface ThemeStore {
  theme: Theme
  setTheme: (_theme: Theme) => void
  isDarkTheme: () => boolean
  isLightTheme: () => boolean
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: THEME_LIGHT, // default theme
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.setAttribute('data-theme', theme)
      },
      isDarkTheme: () => get().theme === THEME_DARK,
      isLightTheme: () => get().theme === THEME_LIGHT,
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme)
        }
      },
    },
  ),
)
