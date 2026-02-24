import { Menu, Bell, Search, Calendar, Sun, Moon } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { Select } from '@/components/ui/select'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/utils/constants'

function getPageTitle(pathname: string): string {
  if (pathname === '/') return '대시보드 개요'
  for (const item of NAV_ITEMS) {
    for (const child of item.children) {
      if (child.path === pathname) return child.label
    }
    if (pathname.startsWith(item.path) && item.path !== '/') return item.label
  }
  return 'GreenOS Intelligence'
}

export function Topbar() {
  const { toggleSidebar, selectedYear, setSelectedYear, theme, toggleTheme } = useAppStore()
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)
  const isDark = theme === 'dark'

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-bg-card shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-md hover:bg-bg-elevated"
        >
          <Menu size={18} />
        </button>
        <h2 className="text-sm font-semibold text-text-primary">{pageTitle}</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 bg-bg-elevated border border-border rounded-md px-2.5 py-1.5">
          <Search size={13} className="text-text-muted" />
          <input
            type="text"
            placeholder="검색..."
            className="bg-transparent text-xs text-text-primary placeholder:text-text-muted outline-none w-36"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-text-secondary" />
          <Select
            value={String(selectedYear)}
            onChange={e => setSelectedYear(Number(e.target.value))}
            className="text-xs py-1 px-2"
          >
            <option value="2025">2025년</option>
            <option value="2024">2024년</option>
            <option value="2023">2023년</option>
            <option value="2022">2022년</option>
          </Select>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-elevated"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="relative text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-elevated">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          G
        </div>
      </div>
    </header>
  )
}
