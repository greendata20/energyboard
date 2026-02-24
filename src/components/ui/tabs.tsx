import { createContext, useContext, useState } from 'react'
import { cn } from '@/utils/cn'

interface TabsContextValue {
  value: string
  onChange: (v: string) => void
}

const TabsContext = createContext<TabsContextValue>({ value: '', onChange: () => {} })

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children: React.ReactNode
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, className, children }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const value = controlledValue ?? internalValue
  const onChange = onValueChange ?? setInternalValue

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('inline-flex items-center rounded-lg bg-bg-card border border-border p-1 gap-1', className)}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const ctx = useContext(TabsContext)
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={cn(
        'px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer',
        active
          ? 'bg-bg-elevated text-text-primary font-medium'
          : 'text-text-secondary hover:text-text-primary',
        className
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null
  return <div className={cn('mt-4', className)}>{children}</div>
}
