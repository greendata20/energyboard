import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'primary' | 'electric' | 'amber' | 'danger' | 'outline' | 'high' | 'medium' | 'low'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated text-text-secondary border border-border',
  primary: 'bg-primary-muted text-primary-hover border border-primary',
  electric: 'bg-electric-muted text-electric-hover border border-electric',
  amber: 'bg-amber-muted text-amber-hover border border-amber',
  danger: 'bg-danger-muted text-danger-hover border border-danger',
  outline: 'bg-transparent text-text-secondary border border-border',
  high: 'bg-danger-muted text-danger-hover border border-danger',
  medium: 'bg-amber-muted text-amber-hover border border-amber',
  low: 'bg-electric-muted text-electric-hover border border-electric',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
