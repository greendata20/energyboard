import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { NAV_ITEMS } from '@/utils/constants'
import {
  LayoutDashboard, Zap, Target, Globe, Sun, FileText,
  ChevronDown, ChevronRight, Leaf
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Zap, Target, Globe, Sun, FileText,
}

interface SidebarProps {
  open: boolean
}

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    NAV_ITEMS.forEach(item => {
      if (item.children.some(c => location.pathname.startsWith(c.path))) {
        initial.add(item.path)
      }
    })
    return initial
  })

  const toggleSection = (path: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-[#0D1117] border-r border-[#21262D] transition-all duration-300 overflow-hidden',
        open ? 'w-56' : 'w-0 md:w-14'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#21262D] min-h-[56px] shrink-0">
        <div className="w-7 h-7 rounded-lg bg-[#2EA043] flex items-center justify-center shrink-0">
          <Leaf size={14} className="text-white" />
        </div>
        {open && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-[#E6EDF3] whitespace-nowrap">GreenOS</div>
            <div className="text-[10px] text-[#8B949E] whitespace-nowrap">Intelligence</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2 px-1.5">
        {NAV_ITEMS.map(item => {
          const Icon = ICON_MAP[item.icon] ?? LayoutDashboard
          const isExpanded = expandedSections.has(item.path)
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)

          if (!item.children.length) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors mb-0.5',
                  isActive
                    ? 'bg-[#1A3F24] text-[#3FB950]'
                    : 'text-[#8B949E] hover:bg-[#161B22] hover:text-[#E6EDF3]'
                )}
              >
                <Icon size={15} className="shrink-0" />
                {open && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          }

          return (
            <div key={item.path} className="mb-0.5">
              <button
                onClick={() => toggleSection(item.path)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-[#161B22] text-[#E6EDF3]'
                    : 'text-[#8B949E] hover:bg-[#161B22] hover:text-[#E6EDF3]'
                )}
              >
                <Icon size={15} className="shrink-0" />
                {open && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </>
                )}
              </button>

              {open && isExpanded && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {item.children.map(child => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive: a }) =>
                        cn(
                          'block px-2.5 py-1.5 rounded-md text-xs transition-colors border-l border-[#21262D] pl-3',
                          a
                            ? 'text-[#3FB950] border-[#2EA043] bg-[#0D1117]'
                            : 'text-[#6E7681] hover:text-[#E6EDF3] hover:border-[#30363D]'
                        )
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {open && (
        <div className="px-3 py-3 border-t border-[#21262D] shrink-0">
          <div className="text-[10px] text-[#6E7681]">GreenOS Intelligence v1.0</div>
          <div className="text-[10px] text-[#6E7681]">내부 전용 · 2024년 데이터</div>
        </div>
      )}
    </aside>
  )
}
