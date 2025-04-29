import { create } from 'zustand'

interface ThemeStore {
  theme: string
  setTheme: (_theme: string) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', // default
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  },
}))
