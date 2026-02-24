import { cn } from '@/utils/cn'

interface ChartWrapperProps {
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function ChartWrapper({ title, subtitle, className, children, actions }: ChartWrapperProps) {
  return (
    <div className={cn('bg-bg-card border border-border rounded-lg p-4', className)}>
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
