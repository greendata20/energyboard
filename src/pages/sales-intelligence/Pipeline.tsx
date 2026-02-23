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
  잠재: '#30363D',
  접촉: '#388BFD',
  제안: '#D29922',
  협상: '#A371F7',
  완료: '#2EA043',
}

export default function Pipeline() {
  const [items, setItems] = useState<PipelineItem[]>(() => {
    const saved = localStorage.getItem('greenos_pipeline')
    if (saved) {
      try { return JSON.parse(saved) as PipelineItem[] } catch { /* ignore */ }
    }
    return salesProspects.map(p => ({ ...p, stage: (p.stage ?? '잠재') as PipelineStage }))
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
        <KPICard title="파이프라인 총계" value={items.length} unit="건" icon={KanbanSquare} iconColor="#388BFD" />
        <KPICard title="협상 중" value={byStage('협상').length} unit="건" icon={Clock} iconColor="#A371F7" />
        <KPICard title="완료" value={byStage('완료').length} unit="건" icon={CheckCircle2} iconColor="#2EA043" />
        <KPICard title="예상 매출" value={formatNumber(totalValue / 10000)} unit="만원" icon={DollarSign} iconColor="#D29922" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {pipelineStages.map(stage => {
          const stageItems = byStage(stage)
          return (
            <div
              key={stage}
              className="flex flex-col min-h-80 bg-[#0D1117] rounded-lg border border-[#30363D] overflow-hidden"
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault()
                if (dragId) moveItem(dragId, stage)
                setDragId(null)
              }}
            >
              <div
                className="flex items-center justify-between px-3 py-2.5 border-b border-[#30363D]"
                style={{ borderLeftWidth: 3, borderLeftColor: STAGE_COLORS[stage] }}
              >
                <span className="text-xs font-semibold text-[#E6EDF3]">{stage}</span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: STAGE_COLORS[stage] + '30', color: STAGE_COLORS[stage] }}
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
                    className="bg-[#161B22] border border-[#30363D] rounded-lg p-2.5 cursor-grab active:cursor-grabbing hover:border-[#484F58] transition-colors"
                  >
                    <div className="text-xs font-medium text-[#E6EDF3] mb-1.5 leading-snug">{item.name}</div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant="outline" className="text-[10px]">{item.region}</Badge>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: item.priority === 'high' ? '#F85149' : item.priority === 'medium' ? '#E3B341' : '#58A6FF' }}
                      >
                        {item.opportunity_score}점
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6E7681]">{formatNumber(item.consumption_toe)} TOE</div>
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {pipelineStages.filter(s => s !== stage).map(s => (
                        <button
                          key={s}
                          onClick={() => moveItem(item.id, s)}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {stageItems.length === 0 && (
                  <div className="flex items-center justify-center h-16 text-xs text-[#6E7681] border border-dashed border-[#30363D] rounded-lg">
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
