import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { DataTable } from '@/components/shared/DataTable'
import { ExportButton } from '@/components/shared/ExportButton'
import { Badge } from '@/components/ui/badge'
import { regionalConsumption2024, regionalConsumption2025, topSidoTrend } from '@/data/mock/kepcoRegionalConsumption'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber, formatGWh } from '@/utils/formatters'
import { useAppStore } from '@/store/appStore'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from 'recharts'
import { Zap, TrendingUp, Building2, MapPin } from 'lucide-react'

const YEAR_DATA: Record<number, typeof regionalConsumption2024> = {
  2024: regionalConsumption2024,
  2025: regionalConsumption2025,
}

export default function RegionalConsumption() {
  const [selectedSido, setSelectedSido] = useState<string | null>(null)
  const { selectedYear, setSelectedYear } = useAppStore()
  const year = selectedYear in YEAR_DATA ? selectedYear : 2024
  const regionData = YEAR_DATA[year]

  const totalGwh = regionData.reduce((s, r) => s + r.consumption_gwh, 0)
  const topRegion = [...regionData].sort((a, b) => b.consumption_gwh - a.consumption_gwh)[0]
  const avgPerCapita = Math.round(regionData.reduce((s, r) => s + r.per_capita_kwh, 0) / regionData.length)
  const avgYoy = (regionData.reduce((s, r) => s + r.yoy_change, 0) / regionData.length).toFixed(1)
  const selected = selectedSido ? regionData.find(r => r.sido === selectedSido) : null

  const chartData = [...regionData]
    .sort((a, b) => b.consumption_gwh - a.consumption_gwh)
    .map(r => ({
      sido: r.sido,
      산업: Math.round(r.consumption_gwh * r.industrial_pct / 100),
      상업: Math.round(r.consumption_gwh * r.commercial_pct / 100),
      주거: Math.round(r.consumption_gwh * r.residential_pct / 100),
    }))

  const columns = [
    { key: 'sido', label: '시도', sortable: true },
    {
      key: 'consumption_gwh', label: '전력소비 (GWh)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
    {
      key: 'per_capita_kwh', label: '1인당 (kWh)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
    { key: 'industrial_pct', label: '산업', align: 'right' as const, render: (v: unknown) => `${v}%` },
    { key: 'commercial_pct', label: '상업', align: 'right' as const, render: (v: unknown) => `${v}%` },
    {
      key: 'yoy_change', label: '전년비', sortable: true, align: 'right' as const,
      render: (v: unknown) => {
        const n = v as number
        return <Badge variant={n > 2 ? 'danger' : n > 0 ? 'amber' : 'primary'}>{n > 0 ? '+' : ''}{n}%</Badge>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="시도별 전력소비"
        description={`${year}년 17개 시도 전력소비 현황 (KEPCO 통계)`}
        actions={<ExportButton data={regionData as unknown as Record<string, unknown>[]} filename={`regional_consumption_${year}`} />}
      />

      {/* Year selector */}
      <div className="flex items-center gap-2">
        {Object.keys(YEAR_DATA).map(y => (
          <button
            key={y}
            onClick={() => { setSelectedYear(Number(y)); setSelectedSido(null) }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              year === Number(y)
                ? 'bg-[#388BFD] text-white'
                : 'bg-[#21262D] text-[#8B949E] hover:text-[#E6EDF3]'
            }`}
          >
            {y}년
          </button>
        ))}
        {year === 2025 && (
          <span className="text-xs text-[#D29922]">※ 2025년 데이터는 추세 기반 추정치</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="전국 총 소비" value={formatNumber(totalGwh)} unit="GWh" icon={Zap} iconColor="#388BFD" />
        <KPICard title="최대 소비 지역" value={topRegion.sido} unit={`${formatNumber(topRegion.consumption_gwh)}GWh`} icon={MapPin} iconColor="#2EA043" />
        <KPICard title="전국 평균 전년비" value={`${Number(avgYoy) > 0 ? '+' : ''}${avgYoy}`} unit="%" change={Number(avgYoy)} changeLabel="전년 대비" icon={TrendingUp} iconColor="#D29922" />
        <KPICard title="1인당 평균" value={formatNumber(avgPerCapita)} unit="kWh" icon={Building2} iconColor="#A371F7" />
      </div>

      <ChartWrapper title="시도별 전력소비 현황 (용도별 분류)" subtitle={`단위: GWh, ${year}년 기준`}>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={chartData} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="sido" {...DARK_AXIS} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <YAxis {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} GWh`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
            <Bar dataKey="산업" stackId="a" fill={CHART_COLORS[0]} />
            <Bar dataKey="상업" stackId="a" fill={CHART_COLORS[1]} />
            <Bar dataKey="주거" stackId="a" fill={CHART_COLORS[2]} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <ChartWrapper title="전국 전력소비 추이" subtitle="단위: GWh, 연도별">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={topSidoTrend}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="year" {...DARK_AXIS} />
            <YAxis {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} GWh`, '전국 소비']} />
            <Area type="monotone" dataKey="gwh" stroke={CHART_COLORS[1]} fill={`${CHART_COLORS[1]}30`} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#30363D]">
          <h3 className="text-sm font-semibold text-[#E6EDF3]">시도별 상세 데이터</h3>
        </div>
        <DataTable
          data={regionData as unknown as Record<string, unknown>[]}
          columns={columns as Parameters<typeof DataTable>[0]['columns']}
          rowKey={r => String(r.sido)}
          onRowClick={r => setSelectedSido(prev => prev === r.sido ? null : r.sido as string)}
        />
      </div>

      {selected && (
        <div className="bg-[#161B22] border border-[#2EA043] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#E6EDF3]">{selected.sido} 상세</h3>
            <button onClick={() => setSelectedSido(null)} className="text-xs text-[#8B949E] hover:text-[#E6EDF3]">닫기 ×</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#0D1117] rounded-md p-3">
              <div className="text-xs text-[#8B949E]">총 소비</div>
              <div className="text-lg font-bold text-[#E6EDF3]">{formatGWh(selected.consumption_gwh)}</div>
            </div>
            <div className="bg-[#0D1117] rounded-md p-3">
              <div className="text-xs text-[#8B949E]">1인당</div>
              <div className="text-lg font-bold text-[#E6EDF3]">{formatNumber(selected.per_capita_kwh)} kWh</div>
            </div>
            <div className="bg-[#0D1117] rounded-md p-3">
              <div className="text-xs text-[#8B949E]">산업용 비율</div>
              <div className="text-lg font-bold text-[#2EA043]">{selected.industrial_pct}%</div>
            </div>
            <div className="bg-[#0D1117] rounded-md p-3">
              <div className="text-xs text-[#8B949E]">전년비 변화</div>
              <div className={`text-lg font-bold ${selected.yoy_change > 0 ? 'text-[#F85149]' : 'text-[#2EA043]'}`}>
                {selected.yoy_change > 0 ? '+' : ''}{selected.yoy_change}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
