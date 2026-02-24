import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { esgDisclosureStatus } from '@/data/mock/globalEnergyData'
import { CheckCircle2, Clock, AlertTriangle, Globe } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  mandatory: '의무화',
  in_progress: '추진 중',
  voluntary: '자율 공시',
  none: '미추진',
}

const STATUS_VARIANTS: Record<string, 'primary' | 'electric' | 'amber' | 'danger'> = {
  mandatory: 'primary',
  in_progress: 'electric',
  voluntary: 'amber',
  none: 'danger',
}

export default function ESGDisclosureStatus() {
  const [selected, setSelected] = useState<typeof esgDisclosureStatus[0] | null>(null)

  const mandatory = esgDisclosureStatus.filter(e => e.status === 'mandatory').length
  const inProgress = esgDisclosureStatus.filter(e => e.status === 'in_progress').length
  const voluntary = esgDisclosureStatus.filter(e => e.status === 'voluntary').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="ESG 공시 의무화 현황"
        description="주요국 ESG 공시 의무화 현황 및 프레임워크 비교"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="의무화 완료" value={mandatory} unit="개국" icon={CheckCircle2} iconColor="var(--color-primary)" />
        <KPICard title="추진 중" value={inProgress} unit="개국" icon={Clock} iconColor="var(--color-electric)" />
        <KPICard title="자율 공시" value={voluntary} unit="개국" icon={AlertTriangle} iconColor="var(--color-amber)" />
        <KPICard title="추적 대상" value={esgDisclosureStatus.length} unit="개국/지역" icon={Globe} iconColor="#A371F7" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {esgDisclosureStatus.map(item => (
          <div
            key={item.country_code}
            className="bg-bg-card border border-border hover:border-border rounded-lg p-4 cursor-pointer transition-colors"
            onClick={() => setSelected(item)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">{item.country}</span>
                <Badge variant={STATUS_VARIANTS[item.status]}>{STATUS_LABELS[item.status]}</Badge>
              </div>
              {item.effective_year && (
                <span className="text-xs text-text-muted">{item.effective_year}년</span>
              )}
            </div>
            <div className="text-xs text-electric font-medium mb-1">{item.framework}</div>
            <div className="text-xs text-text-secondary line-clamp-2">{item.notes}</div>
          </div>
        ))}
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} title={`${selected?.country} ESG 공시 상세`}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant={STATUS_VARIANTS[selected.status]} className="text-sm px-3 py-1">{STATUS_LABELS[selected.status]}</Badge>
              {selected.effective_year && <span className="text-sm text-text-secondary">시행: {selected.effective_year}년</span>}
            </div>
            <div className="bg-bg-base rounded-lg p-3">
              <div className="text-xs text-text-secondary mb-1">적용 프레임워크</div>
              <div className="text-sm text-electric font-semibold">{selected.framework}</div>
            </div>
            <div className="bg-bg-base rounded-lg p-3">
              <div className="text-xs text-text-secondary mb-1">세부 내용</div>
              <div className="text-sm text-text-primary">{selected.notes}</div>
            </div>
            <div className="bg-electric-muted border border-electric rounded-lg p-3">
              <div className="text-xs text-electric mb-1">GreenOS 인사이트</div>
              <div className="text-xs text-text-primary">
                {selected.status === 'mandatory'
                  ? '이미 의무화된 시장입니다. ESG 공시 솔루션 사업 기회가 있습니다.'
                  : selected.status === 'in_progress'
                  ? '의무화 전환 단계입니다. 선제적 도입 기업 대상 영업 기회가 있습니다.'
                  : '자발적 공시 단계입니다. 선도 기업 대상 조기 도입 솔루션이 효과적입니다.'}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
