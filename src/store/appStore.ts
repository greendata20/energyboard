import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface AppState {
  sidebarOpen: boolean
  selectedYear: number
  selectedRegion: string | null
  theme: Theme
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSelectedYear: (year: number) => void
  setSelectedRegion: (region: string | null) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  selectedYear: 2025,
  selectedRegion: null,
  theme: 'light',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return { theme: next }
    }),
}))
