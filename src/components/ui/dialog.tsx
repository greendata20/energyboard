import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  className?: string
  children: React.ReactNode
}

export function Dialog({ open, onClose, title, className, children }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={cn(
          'relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto',
          'bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl',
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-[#30363D]">
            <h2 className="text-base font-semibold text-[#E6EDF3]">{title}</h2>
            <button
              onClick={onClose}
              className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
