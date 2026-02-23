import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { DataTable } from '@/components/shared/DataTable'
import { ExportButton } from '@/components/shared/ExportButton'
import { FilterBar } from '@/components/shared/FilterBar'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { salesProspects } from '@/data/mock/salesProspects'
import type { ProspectData } from '@/types'
import { formatNumber } from '@/utils/formatters'
import { Target, Users, TrendingUp, Building2 } from 'lucide-react'

export default function ProspectList() {
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selected, setSelected] = useState<ProspectData | null>(null)

  const regions = ['all', ...new Set(salesProspects.map(p => p.region))]
  const types = ['all', ...new Set(salesProspects.map(p => p.type))]

  const filtered = useMemo(() => salesProspects.filter(p => {
    const matchSearch = !search || p.name.includes(search) || p.region.includes(search)
    const matchRegion = regionFilter === 'all' || p.region === regionFilter
    const matchType = typeFilter === 'all' || p.type === typeFilter
    const matchPriority = priorityFilter === 'all' || p.priority === priorityFilter
    return matchSearch && matchRegion && matchType && matchPriority
  }), [search, regionFilter, typeFilter, priorityFilter])

  const highCount = salesProspects.filter(p => p.priority === 'high').length
  const avgScore = Math.round(salesProspects.reduce((s, p) => s + p.opportunity_score, 0) / salesProspects.length)
  const noBems = salesProspects.filter(p => !p.bems_installed).length

  const scoreColor = (score: number) =>
    score >= 80 ? '#DA3633' : score >= 70 ? '#D29922' : '#388BFD'

  const columns = [
    {
      key: 'name' as keyof ProspectData, label: '기관명', sortable: true,
    },
    {
      key: 'type' as keyof ProspectData, label: '유형',
      render: (v: unknown) => <span className="text-xs text-[#8B949E]">{String(v)}</span>,
    },
    {
      key: 'region' as keyof ProspectData, label: '지역',
      render: (v: unknown) => <Badge variant="outline">{String(v)}</Badge>,
    },
    {
      key: 'consumption_toe' as keyof ProspectData, label: '소비량 (TOE)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
    {
      key: 'bems_installed' as keyof ProspectData, label: 'BEMS',
      render: (v: unknown) => <Badge variant={v ? 'primary' : 'danger'}>{v ? '설치' : '미설치'}</Badge>,
    },
    {
      key: 'priority' as keyof ProspectData, label: '우선순위',
      render: (v: unknown) => (
        <Badge variant={v as 'high' | 'medium' | 'low'}>
          {v === 'high' ? '고' : v === 'medium' ? '중' : '저'}
        </Badge>
      ),
    },
    {
      key: 'opportunity_score' as keyof ProspectData, label: 'Opp. Score', sortable: true, align: 'right' as const,
      render: (v: unknown) => (
        <span className="font-bold" style={{ color: scoreColor(v as number) }}>{String(v)}</span>
      ),
    },
    {
      key: 'stage' as keyof ProspectData, label: '영업단계',
      render: (v: unknown) => <Badge variant="default">{String(v ?? '잠재')}</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="영업 대상 목록"
        description="GreenOS Opportunity Score 기반 영업 우선순위 목록"
        actions={<ExportButton data={filtered as unknown as Record<string, unknown>[]} filename="prospects" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="전체 잠재 고객" value={salesProspects.length} unit="개 기관" icon={Building2} iconColor="#388BFD" />
        <KPICard title="High Priority" value={highCount} unit="개" icon={Target} iconColor="#DA3633" />
        <KPICard title="BEMS 미설치" value={noBems} unit="개" icon={Users} iconColor="#D29922" />
        <KPICard title="평균 Opp. Score" value={avgScore} unit="/100" icon={TrendingUp} iconColor="#2EA043" />
      </div>

      <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
        <div className="text-xs font-semibold text-[#8B949E] mb-3">Opportunity Score 알고리즘</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { label: '에너지 소비량 (40점)', desc: 'TOE 기준 상위 30% 이내 = 40점', color: '#D29922' },
            { label: 'BEMS 미설치 (35점)', desc: 'BEMS 미설치 = 35점 (GreenOS 솔루션 적합성)', color: '#DA3633' },
            { label: '탄소집약도 (25점)', desc: '업종 평균 대비 고배출 = 25점', color: '#388BFD' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0D1117] rounded-md p-3">
              <div className="font-medium mb-1" style={{ color: item.color }}>{item.label}</div>
              <div className="text-[#8B949E]">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder="기관명 검색...">
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-md px-2 py-1.5 text-sm focus:outline-none">
          <option value="all">전체 지역</option>
          {regions.filter(r => r !== 'all').map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-md px-2 py-1.5 text-sm focus:outline-none">
          <option value="all">전체 유형</option>
          {types.filter(t => t !== 'all').map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
          className="bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-md px-2 py-1.5 text-sm focus:outline-none">
          <option value="all">전체 우선순위</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <div className="text-xs text-[#8B949E] ml-auto">{filtered.length}건</div>
      </FilterBar>

      <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
        <DataTable
          data={filtered as unknown as Record<string, unknown>[]}
          columns={columns as Parameters<typeof DataTable>[0]['columns']}
          rowKey={r => String(r.id)}
          onRowClick={r => setSelected(salesProspects.find(p => p.id === r.id) ?? null)}
        />
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ''}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '유형', value: selected.type },
                { label: '지역', value: selected.region },
                { label: '에너지 소비', value: `${formatNumber(selected.consumption_toe)} TOE` },
                { label: '탄소집약도', value: `${selected.carbon_intensity} tCO₂/kWh` },
              ].map((item, i) => (
                <div key={i} className="bg-[#0D1117] rounded-lg p-3">
                  <div className="text-xs text-[#8B949E]">{item.label}</div>
                  <div className="text-sm text-[#E6EDF3] font-medium mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#8B949E]">BEMS 현황</span>
              <Badge variant={selected.bems_installed ? 'primary' : 'danger'}>
                {selected.bems_installed ? '설치 완료' : '미설치 ← 영업 타겟'}
              </Badge>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8B949E]">Opportunity Score</span>
                <span className="font-bold" style={{ color: scoreColor(selected.opportunity_score) }}>
                  {selected.opportunity_score}/100
                </span>
              </div>
              <Progress
                value={selected.opportunity_score}
                barClassName={selected.opportunity_score >= 80 ? 'bg-[#DA3633]' : selected.opportunity_score >= 70 ? 'bg-[#D29922]' : 'bg-[#388BFD]'}
              />
            </div>
            <div className="bg-[#0D1117] rounded-lg p-3">
              <div className="text-xs text-[#8B949E] mb-2">추천 솔루션</div>
              <div className="space-y-1.5 text-xs text-[#E6EDF3]">
                {!selected.bems_installed && <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2EA043]" />GreenOS BEMS 구축</div>}
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#388BFD]" />탄소 MRV 시스템</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D29922]" />ESG 공시 지원</div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
