import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Badge } from '@/components/ui/badge'
import { carbonByRegion } from '@/data/mock/carbonEmissions'
import { salesProspects } from '@/data/mock/salesProspects'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import { useAppStore } from '@/store/appStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MapPin, AlertTriangle, TrendingUp, Target } from 'lucide-react'

const YEARS = [2024, 2025]

export default function CarbonIntensityMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const { selectedYear, setSelectedYear } = useAppStore()

  const yearData = carbonByRegion.filter(r => r.year === selectedYear)
  const sorted = [...yearData].sort((a, b) => b.per_capita - a.per_capita)
  const maxIntensity = sorted[0]?.per_capita ?? 1
  const avgIntensity = yearData.reduce((s, r) => s + r.per_capita, 0) / (yearData.length || 1)
  const regionProspects = selectedRegion ? salesProspects.filter(p => p.region === selectedRegion) : []

  const getColor = (val: number) =>
    val / maxIntensity > 0.7 ? '#DA3633' : val / maxIntensity > 0.4 ? '#D29922' : '#388BFD'

  return (
    <div className="space-y-6">
      <PageHeader
        title="탄소집약도 지도"
        description="지역별 1인당 탄소 배출 강도 및 영업 기회 분석"
      />

      {/* Year selector */}
      <div className="flex items-center gap-2">
        {YEARS.map(y => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              selectedYear === y
                ? 'bg-electric text-white'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
            }`}
          >
            {y}년
          </button>
        ))}
        {selectedYear === 2025 && (
          <span className="text-xs text-amber">※ 2025년 데이터는 추세 기반 추정치</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="최고 탄소집약도" value={sorted[0]?.sido ?? '-'} unit={`${sorted[0]?.per_capita} tCO₂/인`} icon={AlertTriangle} iconColor="var(--color-danger)" />
        <KPICard title="전국 평균" value={avgIntensity.toFixed(1)} unit="tCO₂/인" icon={MapPin} iconColor="var(--color-amber)" />
        <KPICard title="평균 초과 지역" value={sorted.filter(r => r.per_capita > avgIntensity).length} unit="개 지역" icon={TrendingUp} iconColor="#A371F7" />
        <KPICard title="매핑된 영업 기회" value={salesProspects.length} unit="건" icon={Target} iconColor="var(--color-primary)" />
      </div>

      <ChartWrapper title="지역별 탄소집약도 (tCO₂/인)" subtitle="막대 클릭 시 해당 지역 영업 기회 표시">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={sorted}
            margin={{ bottom: 10 }}
            onClick={(data: unknown) => {
              const d = data as { activePayload?: { payload?: { sido?: string } }[] } | null
              if (d?.activePayload) {
                const region = d.activePayload[0]?.payload?.sido as string
                setSelectedRegion(prev => prev === region ? null : region)
              }
            }}
          >
            <CartesianGrid {...DARK_GRID} />
            <XAxis
              dataKey="sido"
              {...DARK_AXIS}
              interval={0}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
              angle={-40}
              textAnchor="end"
              height={65}
            />
            <YAxis {...DARK_AXIS} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} tCO₂/인`, '탄소집약도']} />
            <Bar dataKey="per_capita" name="탄소집약도" radius={[3, 3, 0, 0]} cursor="pointer">
              {sorted.map((entry, i) => (
                <Cell key={i} fill={entry.sido === selectedRegion ? '#A371F7' : getColor(entry.per_capita)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {selectedRegion && (
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">
              {selectedRegion} 영업 기회 ({regionProspects.length}건)
            </h3>
            <button onClick={() => setSelectedRegion(null)} className="text-xs text-text-secondary hover:text-text-primary">닫기 ×</button>
          </div>
          {regionProspects.length > 0 ? (
            <div className="space-y-2">
              {regionProspects.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-bg-base rounded-md px-3 py-2">
                  <div>
                    <div className="text-sm text-text-primary">{p.name}</div>
                    <div className="text-xs text-text-secondary">{p.type} · {formatNumber(p.consumption_toe)} TOE</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={p.priority as 'high' | 'medium' | 'low'}>{p.priority === 'high' ? '고' : '중'}</Badge>
                    <span className="text-sm font-bold text-danger">{p.opportunity_score}점</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-text-secondary">해당 지역 데이터가 없습니다.</div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: '고강도 (>20 tCO₂/인)', color: 'var(--color-danger)', regions: sorted.filter(r => r.per_capita > 20) },
          { label: '중강도 (10~20 tCO₂/인)', color: 'var(--color-amber)', regions: sorted.filter(r => r.per_capita >= 10 && r.per_capita <= 20) },
          { label: '저강도 (<10 tCO₂/인)', color: 'var(--color-electric)', regions: sorted.filter(r => r.per_capita < 10) },
        ].map(group => (
          <div key={group.label} className="bg-bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-xs font-medium text-text-primary">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.regions.map(r => (
                <button
                  key={r.sido}
                  onClick={() => setSelectedRegion(prev => prev === r.sido ? null : r.sido)}
                  className="text-xs px-2 py-0.5 rounded-full bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors"
                >
                  {r.sido}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
