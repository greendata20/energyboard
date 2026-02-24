import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { Badge } from '@/components/ui/badge'
import { salesProspects, pipelineStages } from '@/data/mock/salesProspects'
import type { ProspectData } from '@/types'
import type { PipelineStage } from '@/data/mock/salesProspects'
import { formatNumber } from '@/utils/formatters'
import { KanbanSquare, CheckCircle2, Clock, DollarSign } from 'lucide-react'

interface PipelineItem extends ProspectData {
  stage: PipelineStage
}

const STAGE_COLORS: Record<PipelineStage, string> = {
  잠재: 'var(--color-text-muted)',
  접촉: 'var(--color-electric)',
  제안: 'var(--color-amber)',
  협상: '#A371F7',
  완료: 'var(--color-primary)',
}

export default function Pipeline() {
  const [items, setItems] = useState<PipelineItem[]>(() => {
    const base = salesProspects.map(p => ({ ...p, stage: (p.stage ?? '잠재') as PipelineStage }))
    const saved = localStorage.getItem('greenos_pipeline')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PipelineItem[]
        const savedIds = new Set(parsed.map(i => i.id))
        // merge: keep saved stage info + append any new prospects not yet in storage
        const newItems = base.filter(p => !savedIds.has(p.id))
        return [...parsed, ...newItems]
      } catch { /* ignore */ }
    }
    return base
  })
  const [dragId, setDragId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('greenos_pipeline', JSON.stringify(items))
  }, [items])

  const moveItem = (id: string, stage: PipelineStage) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, stage } : i))
  }

  const byStage = (stage: PipelineStage) => items.filter(i => i.stage === stage)
  const totalValue = items.filter(i => i.stage === '완료').reduce((s, i) => s + i.consumption_toe * 100, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="영업 파이프라인"
        description="Kanban 영업 단계 관리 (드래그로 이동, 자동 저장)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="파이프라인 총계" value={items.length} unit="건" icon={KanbanSquare} iconColor="var(--color-electric)" />
        <KPICard title="협상 중" value={byStage('협상').length} unit="건" icon={Clock} iconColor="#A371F7" />
        <KPICard title="완료" value={byStage('완료').length} unit="건" icon={CheckCircle2} iconColor="var(--color-primary)" />
        <KPICard title="예상 매출" value={formatNumber(totalValue / 10000)} unit="만원" icon={DollarSign} iconColor="var(--color-amber)" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {pipelineStages.map(stage => {
          const stageItems = byStage(stage)
          return (
            <div
              key={stage}
              className="flex flex-col min-h-80 bg-bg-base rounded-lg border border-border overflow-hidden"
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault()
                if (dragId) moveItem(dragId, stage)
                setDragId(null)
              }}
            >
              <div
                className="flex items-center justify-between px-3 py-2.5 border-b border-border"
                style={{ borderLeftWidth: 3, borderLeftColor: STAGE_COLORS[stage] }}
              >
                <span className="text-xs font-semibold text-text-primary">{stage}</span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `color-mix(in srgb, ${STAGE_COLORS[stage]} 20%, transparent)`, color: STAGE_COLORS[stage] }}
                >
                  {stageItems.length}
                </span>
              </div>

              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {stageItems.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => setDragId(item.id)}
                    className="bg-bg-card border border-border rounded-lg p-2.5 cursor-grab active:cursor-grabbing hover:border-border transition-colors"
                  >
                    <div className="text-xs font-medium text-text-primary mb-1.5 leading-snug">{item.name}</div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant="outline" className="text-[10px]">{item.region}</Badge>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: item.priority === 'high' ? 'var(--color-danger-hover)' : item.priority === 'medium' ? 'var(--color-amber-hover)' : 'var(--color-electric-hover)' }}
                      >
                        {item.opportunity_score}점
                      </span>
                    </div>
                    <div className="text-[10px] text-text-muted">{formatNumber(item.consumption_toe)} TOE</div>
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {pipelineStages.filter(s => s !== stage).map(s => (
                        <button
                          key={s}
                          onClick={() => moveItem(item.id, s)}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {stageItems.length === 0 && (
                  <div className="flex items-center justify-center h-16 text-xs text-text-muted border border-dashed border-border rounded-lg">
                    여기로 드롭
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
