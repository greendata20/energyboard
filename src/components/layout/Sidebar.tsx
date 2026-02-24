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
        'flex flex-col h-full bg-bg-base border-r border-border-subtle transition-all duration-300 overflow-hidden',
        open ? 'w-56' : 'w-0 md:w-14'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border-subtle min-h-[56px] shrink-0">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Leaf size={14} className="text-white" />
        </div>
        {open && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-text-primary whitespace-nowrap">GreenOS</div>
            <div className="text-[10px] text-text-secondary whitespace-nowrap">Intelligence</div>
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
                    ? 'bg-primary-muted text-primary-hover'
                    : 'text-text-secondary hover:bg-bg-card hover:text-text-primary'
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
                    ? 'bg-bg-card text-text-primary'
                    : 'text-text-secondary hover:bg-bg-card hover:text-text-primary'
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
                          'block px-2.5 py-1.5 rounded-md text-xs transition-colors border-l border-border-subtle pl-3',
                          a
                            ? 'text-primary-hover border-primary bg-bg-base'
                            : 'text-text-muted hover:text-text-primary hover:border-border'
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
        <div className="px-3 py-3 border-t border-border-subtle shrink-0">
          <div className="text-[10px] text-text-muted">GreenOS Intelligence v1.0</div>
          <div className="text-[10px] text-text-muted">내부 전용 · 2024년 데이터</div>
        </div>
      )}
    </aside>
  )
}
