import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  iconColor?: string
  className?: string
  onClick?: () => void
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: Icon,
  iconColor = '#388BFD',
  className,
  onClick,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  return (
    <div
      className={cn(
        'bg-bg-card border border-border rounded-lg p-4',
        'transition-colors',
        onClick && 'cursor-pointer hover:border-electric',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-text-secondary">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${iconColor}20` }}>
            <Icon size={16} style={{ color: iconColor }} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        {unit && <span className="text-sm text-text-secondary">{unit}</span>}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {isPositive ? (
            <TrendingUp size={13} className="text-danger-hover" />
          ) : isNegative ? (
            <TrendingDown size={13} className="text-primary" />
          ) : (
            <Minus size={13} className="text-text-secondary" />
          )}
          <span
            className={cn(
              'text-xs',
              isPositive ? 'text-danger-hover' : isNegative ? 'text-primary' : 'text-text-secondary'
            )}
          >
            {change > 0 ? '+' : ''}{change.toFixed(1)}%
          </span>
          {changeLabel && <span className="text-xs text-text-muted">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}
