import { cn } from '@/utils/cn'
import { Search } from 'lucide-react'

interface FilterBarProps {
  search?: string
  onSearchChange?: (v: string) => void
  searchPlaceholder?: string
  className?: string
  children?: React.ReactNode
}

export function FilterBar({ search, onSearchChange, searchPlaceholder = '검색...', className, children }: FilterBarProps) {
  return (
    <div className={cn('flex items-center flex-wrap gap-3', className)}>
      {onSearchChange !== undefined && (
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-bg-card border border-border rounded-md pl-8 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-electric"
          />
        </div>
      )}
      {children}
    </div>
  )
}
