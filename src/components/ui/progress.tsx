import { cn } from '@/utils/cn'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
}

export function Progress({ value, max = 100, className, barClassName }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('w-full bg-[#21262D] rounded-full h-2 overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', barClassName ?? 'bg-[#2EA043]')}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
