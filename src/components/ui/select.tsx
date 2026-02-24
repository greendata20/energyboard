import { cn } from '@/utils/cn'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'bg-bg-card border border-border text-text-primary rounded-md px-3 py-1.5 text-sm',
        'focus:outline-none focus:border-electric transition-colors cursor-pointer',
        'appearance-none pr-8',
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B949E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1rem',
      }}
      {...props}
    >
      {children}
    </select>
  )
}
