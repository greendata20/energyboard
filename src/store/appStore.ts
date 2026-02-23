import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  selectedYear: number
  selectedRegion: string | null
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSelectedYear: (year: number) => void
  setSelectedRegion: (region: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  selectedYear: 2024,
  selectedRegion: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}))
