import { cn } from '@/utils/cn'

type ButtonVariant = 'default' | 'primary' | 'ghost' | 'outline' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-bg-elevated text-text-primary border border-border hover:bg-border',
  primary: 'bg-primary text-white hover:bg-primary-hover',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
  outline: 'bg-transparent text-text-primary border border-border hover:bg-bg-elevated',
  danger: 'bg-danger text-white hover:bg-[#F85149]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-sm',
  icon: 'w-8 h-8 flex items-center justify-center',
}

export function Button({ variant = 'default', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
