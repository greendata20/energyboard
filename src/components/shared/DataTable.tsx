import { useState } from 'react'
import { cn } from '@/utils/cn'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  rowKey?: (row: T) => string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  rowKey,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey as keyof T]
        const bv = b[sortKey as keyof T]
        if (av === bv) return 0
        const cmp = String(av) < String(bv) ? -1 : 1
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-3 py-2.5 font-medium text-text-secondary whitespace-nowrap',
                  alignClass[col.align ?? 'left'],
                  col.sortable && 'cursor-pointer hover:text-text-primary select-none'
                )}
                onClick={() => col.sortable && handleSort(String(col.key))}
              >
                <div className={cn('flex items-center gap-1', col.align === 'right' && 'justify-end', col.align === 'center' && 'justify-center')}>
                  {col.label}
                  {col.sortable && (
                    <span className="text-text-muted">
                      {sortKey === col.key
                        ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        : <ChevronsUpDown size={12} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={rowKey ? rowKey(row) : i}
              className={cn(
                'border-b border-border-subtle transition-colors',
                onRowClick && 'cursor-pointer hover:bg-bg-elevated'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => {
                const val = row[col.key as keyof T]
                return (
                  <td
                    key={String(col.key)}
                    className={cn('px-3 py-2.5 text-text-primary', alignClass[col.align ?? 'left'])}
                  >
                    {col.render ? col.render(val, row) : String(val ?? '-')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <div className="py-8 text-center text-sm text-text-secondary">데이터가 없습니다.</div>
      )}
    </div>
  )
}
