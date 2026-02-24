import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { DataTable } from '@/components/shared/DataTable'
import { ExportButton } from '@/components/shared/ExportButton'
import { FilterBar } from '@/components/shared/FilterBar'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { publicOrgEnergy } from '@/data/mock/publicOrgEnergy'
import type { PublicOrgData } from '@/types'
import { formatNumber, formatTCO2 } from '@/utils/formatters'
import { Building2, Zap, Wind, Target } from 'lucide-react'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function PublicOrgRankings() {
  const [search, setSearch] = useState('')
  const [ministryFilter, setMinistryFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [selected, setSelected] = useState<PublicOrgData | null>(null)

  const ministries = ['all', ...new Set(publicOrgEnergy.map(o => o.ministry))]
  const regions = ['all', ...new Set(publicOrgEnergy.map(o => o.region))]

  const filtered = useMemo(() => publicOrgEnergy.filter(o => {
    const matchSearch = !search || o.org_name.includes(search) || o.ministry.includes(search)
    const matchMinistry = ministryFilter === 'all' || o.ministry === ministryFilter
    const matchRegion = regionFilter === 'all' || o.region === regionFilter
    return matchSearch && matchMinistry && matchRegion
  }), [search, ministryFilter, regionFilter])

  const totalConsumption = publicOrgEnergy.reduce((s, o) => s + o.consumption_toe, 0)
  const noBems = publicOrgEnergy.filter(o => !o.bems_installed).length
  const avgOppScore = Math.round(publicOrgEnergy.reduce((s, o) => s + o.opportunity_score, 0) / publicOrgEnergy.length)
  const highPriority = publicOrgEnergy.filter(o => o.opportunity_score >= 80).length

  const top10Chart = publicOrgEnergy.slice(0, 10).map(o => ({
    name: o.org_name.length > 10 ? o.org_name.slice(0, 10) + '…' : o.org_name,
    toe: o.consumption_toe,
    score: o.opportunity_score,
  }))

  const columns = [
    { key: 'rank' as keyof PublicOrgData, label: '순위', sortable: true, align: 'center' as const,
      render: (v: unknown) => <span className="text-text-secondary text-xs font-bold">#{String(v)}</span> },
    { key: 'org_name' as keyof PublicOrgData, label: '기관명', sortable: true },
    { key: 'ministry' as keyof PublicOrgData, label: '주무부처', render: (v: unknown) =>
      <span className="text-xs text-text-secondary">{String(v)}</span> },
    { key: 'region' as keyof PublicOrgData, label: '지역', render: (v: unknown) =>
      <Badge variant="outline">{String(v)}</Badge> },
    { key: 'consumption_toe' as keyof PublicOrgData, label: '소비 (TOE)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number) },
    { key: 'co2_tonne' as keyof PublicOrgData, label: 'CO₂ (tonne)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number) },
    { key: 'bems_installed' as keyof PublicOrgData, label: 'BEMS',
      render: (v: unknown) => <Badge variant={v ? 'primary' : 'danger'}>{v ? '설치' : '미설치'}</Badge> },
    { key: 'yoy_change' as keyof PublicOrgData, label: '전년비', sortable: true, align: 'right' as const,
      render: (v: unknown) => {
        const n = v as number
        return <Badge variant={n > 3 ? 'danger' : n > 0 ? 'amber' : 'primary'}>{n > 0 ? '+' : ''}{n}%</Badge>
      }},
    { key: 'opportunity_score' as keyof PublicOrgData, label: 'Opp. Score', sortable: true, align: 'right' as const,
      render: (v: unknown) => {
        const score = v as number
        return (
          <span className="font-bold" style={{ color: score >= 80 ? 'var(--color-danger-hover)' : score >= 70 ? 'var(--color-amber-hover)' : 'var(--color-electric-hover)' }}>
            {score}
          </span>
        )
      }},
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="공공기관 에너지 순위"
        description="에너지 다소비 공공기관 상위 30개 목록 — GreenOS 영업 타겟 우선순위"
        actions={<ExportButton data={filtered as unknown as Record<string, unknown>[]} filename="public_org_energy" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="총 에너지 소비" value={formatNumber(totalConsumption)} unit="TOE" icon={Zap} iconColor="var(--color-electric)" />
        <KPICard title="BEMS 미설치 기관" value={noBems} unit="개 (영업대상)" icon={Building2} iconColor="var(--color-danger)" />
        <KPICard title="High Opp. 기관 (80+)" value={highPriority} unit="개" icon={Target} iconColor="var(--color-amber)" />
        <KPICard title="평균 Opp. Score" value={avgOppScore} unit="/100" icon={Wind} iconColor="var(--color-primary)" />
      </div>

      <ChartWrapper title="상위 10개 기관 에너지 소비 (TOE)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={top10Chart} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid {...DARK_GRID} horizontal={false} />
            <XAxis type="number" {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="name" {...DARK_AXIS} width={80} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} TOE`, '소비량']} />
            <Bar dataKey="toe" radius={[0, 3, 3, 0]}>
              {top10Chart.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % 2 === 0 ? 1 : 0]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="기관명·부처 검색..."
      >
        <select
          value={ministryFilter}
          onChange={e => setMinistryFilter(e.target.value)}
          className="bg-bg-card border border-border text-text-primary rounded-md px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="all">전체 부처</option>
          {ministries.filter(m => m !== 'all').map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
          className="bg-bg-card border border-border text-text-primary rounded-md px-2 py-1.5 text-sm focus:outline-none"
        >
          <option value="all">전체 지역</option>
          {regions.filter(r => r !== 'all').map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <div className="text-xs text-text-secondary ml-auto">{filtered.length}개 기관</div>
      </FilterBar>

      <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
        <DataTable
          data={filtered as unknown as Record<string, unknown>[]}
          columns={columns as Parameters<typeof DataTable>[0]['columns']}
          rowKey={r => String(r.rank)}
          onRowClick={r => setSelected(publicOrgEnergy.find(o => o.rank === r.rank) ?? null)}
        />
      </div>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.org_name}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '주무부처', value: selected.ministry },
                { label: '지역', value: selected.region },
                { label: '에너지 소비', value: `${formatNumber(selected.consumption_toe)} TOE` },
                { label: '전력소비', value: `${formatNumber(selected.consumption_gwh)} GWh` },
                { label: 'CO₂ 배출', value: formatTCO2(selected.co2_tonne) },
                { label: '전년 대비', value: `${selected.yoy_change > 0 ? '+' : ''}${selected.yoy_change}%` },
              ].map((item, i) => (
                <div key={i} className="bg-bg-base rounded-lg p-3">
                  <div className="text-xs text-text-secondary">{item.label}</div>
                  <div className="text-sm text-text-primary font-medium mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text-secondary">BEMS 현황</span>
                <Badge variant={selected.bems_installed ? 'primary' : 'danger'}>
                  {selected.bems_installed ? '설치 완료' : '미설치 ← GreenOS 영업 타겟'}
                </Badge>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text-secondary">Opportunity Score</span>
                <span className="font-bold text-danger">{selected.opportunity_score}/100</span>
              </div>
              <Progress
                value={selected.opportunity_score}
                barClassName={selected.opportunity_score >= 80 ? 'bg-danger' : 'bg-amber'}
              />
            </div>

            <div className="bg-primary-muted border border-primary rounded-lg p-3">
              <div className="text-xs text-primary-hover font-semibold mb-1">추천 영업 포인트</div>
              <ul className="text-xs text-text-primary space-y-1">
                {!selected.bems_installed && (
                  <li>• BEMS 미설치: GreenOS 에너지관리시스템 도입 제안 (연간 {Math.round(selected.consumption_toe * 0.15)}TOE 절감 기대)</li>
                )}
                {selected.yoy_change > 2 && (
                  <li>• 전년 대비 {selected.yoy_change}% 증가: 에너지 효율화 긴급 필요</li>
                )}
                <li>• 탄소배출 {formatTCO2(selected.co2_tonne)}: ESG 공시 지원 솔루션 적합</li>
              </ul>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
