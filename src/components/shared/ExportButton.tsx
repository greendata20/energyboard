import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExportButtonProps {
  data: Record<string, unknown>[]
  filename?: string
  className?: string
}

export function ExportButton({ data, filename = 'export', className }: ExportButtonProps) {
  const handleExport = () => {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const csv = [
      headers.join(','),
      ...data.map(row =>
        headers.map(h => {
          const v = row[h]
          const str = v === null || v === undefined ? '' : String(v)
          return str.includes(',') ? `"${str}"` : str
        }).join(',')
      ),
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className={className}>
      <Download size={14} />
      CSV 내보내기
    </Button>
  )
}
