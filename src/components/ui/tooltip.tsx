import { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousemove', handleMouseMove)
    }
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [visible])

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {visible && (
        <div
          className={cn(
            'fixed z-50 pointer-events-none px-2 py-1.5 text-xs rounded-md',
            'bg-[#21262D] border border-[#30363D] text-[#E6EDF3] shadow-lg',
            'transform -translate-x-1/2 -translate-y-full -mt-2',
            className
          )}
          style={{ left: pos.x, top: pos.y - 8 }}
        >
          {content}
        </div>
      )}
    </>
  )
}
