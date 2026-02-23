import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, className, actions }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-6', className)}>
      <div>
        <h1 className="text-xl font-bold text-[#E6EDF3]">{title}</h1>
        {description && <p className="text-sm text-[#8B949E] mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 ml-4">{actions}</div>}
    </div>
  )
}
