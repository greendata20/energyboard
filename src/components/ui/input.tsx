import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-md px-3 py-1.5 text-sm w-full',
        'placeholder:text-[#6E7681] focus:outline-none focus:border-[#388BFD] transition-colors',
        className
      )}
      {...props}
    />
  )
}
