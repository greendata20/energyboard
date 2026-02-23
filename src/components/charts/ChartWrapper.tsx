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
    <div className={cn('bg-[#161B22] border border-[#30363D] rounded-lg p-4', className)}>
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-[#E6EDF3]">{title}</h3>}
            {subtitle && <p className="text-xs text-[#8B949E] mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
