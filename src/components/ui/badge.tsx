import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'primary' | 'electric' | 'amber' | 'danger' | 'outline' | 'high' | 'medium' | 'low'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#21262D] text-[#8B949E] border border-[#30363D]',
  primary: 'bg-[#1A3F24] text-[#3FB950] border border-[#2EA043]',
  electric: 'bg-[#1A2F4E] text-[#58A6FF] border border-[#388BFD]',
  amber: 'bg-[#3D2E0A] text-[#E3B341] border border-[#D29922]',
  danger: 'bg-[#3F1515] text-[#F85149] border border-[#DA3633]',
  outline: 'bg-transparent text-[#8B949E] border border-[#30363D]',
  high: 'bg-[#3F1515] text-[#F85149] border border-[#DA3633]',
  medium: 'bg-[#3D2E0A] text-[#E3B341] border border-[#D29922]',
  low: 'bg-[#1A2F4E] text-[#58A6FF] border border-[#388BFD]',
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
