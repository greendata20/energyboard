import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'bg-bg-card border border-border text-text-primary rounded-md px-3 py-1.5 text-sm w-full',
        'placeholder:text-text-muted focus:outline-none focus:border-electric transition-colors',
        className
      )}
      {...props}
    />
  )
}
