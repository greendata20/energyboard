import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { DataTable } from '@/components/shared/DataTable'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { re100Companies } from '@/data/mock/policyData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { CheckCircle2, Calendar, TrendingUp, Building2 } from 'lucide-react'

export default function RE100Korea() {
  const [sortBy, setSortBy] = useState<'pct' | 'year'>('pct')

  const avgProgress = Math.round(re100Companies.reduce((s, c) => s + c.current_pct, 0) / re100Companies.length)
  const above50 = re100Companies.filter(c => c.current_pct >= 50).length

  const sorted = [...re100Companies].sort((a, b) =>
    sortBy === 'pct' ? b.current_pct - a.current_pct : a.joined_year - b.joined_year
  )

  const barData = sorted.map((c, i) => ({
    company: c.company.length > 8 ? c.company.slice(0, 8) + '…' : c.company,
    달성률: c.current_pct,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const columns = [
    { key: 'company', label: '기업명', sortable: true },
    { key: 'sector', label: '업종', render: (v: unknown) => <span className="text-xs text-text-secondary">{String(v)}</span> },
    { key: 'joined_year', label: '가입년도', sortable: true, align: 'center' as const },
    { key: 'target_year', label: '목표년도', sortable: true, align: 'center' as const },
    { key: 'current_pct', label: '달성률', sortable: true, align: 'right' as const,
      render: (v: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2 justify-end">
          <Progress value={v as number} className="w-16 h-1.5" barClassName={v as number >= 50 ? 'bg-primary' : 'bg-electric'} />
          <span className="text-xs font-bold text-text-primary">{String(v)}%</span>
        </div>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="RE100 한국 기업 현황"
        description="RE100 가입 한국 기업 재생에너지 달성률 추적"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="RE100 가입 기업" value={re100Companies.length} unit="개사" icon={Building2} iconColor="var(--color-primary)" />
        <KPICard title="평균 달성률" value={avgProgress} unit="%" icon={TrendingUp} iconColor="var(--color-electric)" />
        <KPICard title="50% 이상 달성" value={above50} unit="개사" icon={CheckCircle2} iconColor="var(--color-amber)" />
        <KPICard title="2023년 신규 가입" value={3} unit="개사 (삼성·현대·POSCO)" icon={Calendar} iconColor="#A371F7" />
      </div>

      <ChartWrapper
        title="기업별 RE100 달성률 (%)"
        actions={
          <div className="flex gap-2">
            <button onClick={() => setSortBy('pct')} className={`text-xs px-2 py-0.5 rounded ${sortBy === 'pct' ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary'}`}>달성률순</button>
            <button onClick={() => setSortBy('year')} className={`text-xs px-2 py-0.5 rounded ${sortBy === 'year' ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary'}`}>가입순</button>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="company" {...DARK_AXIS} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} />
            <YAxis {...DARK_AXIS} unit="%" domain={[0, 100]} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v}%`, 'RE100 달성률']} />
            <Bar dataKey="달성률" radius={[3, 3, 0, 0]}>
              {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">RE100 가입 기업 상세</h3>
          <Badge variant="primary">{re100Companies.length}개사</Badge>
        </div>
        <DataTable
          data={re100Companies as unknown as Record<string, unknown>[]}
          columns={columns as Parameters<typeof DataTable>[0]['columns']}
          rowKey={r => String(r.company)}
        />
      </div>

      <div className="bg-bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">RE100 이행 수단 (한국)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { title: '재생에너지 구매계약(PPA)', desc: '발전사업자와 직접 계약. 비용 절감 + RE100 인정', color: 'var(--color-primary)', pct: 45 },
            { title: 'REC 구매', desc: 'REC 현물·계약시장 거래. 유연성 높음', color: 'var(--color-electric)', pct: 30 },
            { title: '한국형 PPA (제3자)', desc: '중간 플랫폼 통한 간접 PPA. 2023년 도입', color: 'var(--color-amber)', pct: 15 },
            { title: '자가 발전', desc: '공장·건물 옥상 태양광 자체 설치', color: '#A371F7', pct: 7 },
            { title: '녹색 프리미엄', desc: '한전 재생에너지 요금제 가입', color: '#39C5CF', pct: 3 },
          ].map((item, i) => (
            <div key={i} className="bg-bg-base rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-text-primary">{item.title}</span>
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.pct}%</span>
              </div>
              <Progress value={item.pct} barClassName={`bg-[${item.color}]`} className="h-1 mb-2" />
              <p className="text-[10px] text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
