import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Progress } from '@/components/ui/progress'
import { carbonBySector, carbonTrend, carbonByRegion } from '@/data/mock/carbonEmissions'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import { useAppStore } from '@/store/appStore'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, ReferenceLine, Area, Line
} from 'recharts'
import { Wind, TrendingDown, Factory, Leaf } from 'lucide-react'

const YEARS = [2024, 2025]

export default function CarbonEmissions() {
  const { selectedYear, setSelectedYear } = useAppStore()
  const year = YEARS.includes(selectedYear) ? selectedYear : 2024

  const sectorForYear = carbonBySector.filter(c => c.year === year)
  const regionForYear = carbonByRegion.filter(r => r.year === year)

  const totalScope1 = sectorForYear.reduce((s, c) => s + c.scope1_mtco2, 0)
  const totalScope2 = sectorForYear.reduce((s, c) => s + c.scope2_mtco2, 0)
  const target2030 = 436.6
  const trendEntry = carbonTrend.find(d => d.year === year)
  const current = trendEntry?.total_mtco2 ?? (year === 2025 ? 583.1 : 598.1)

  const sectorData = sectorForYear.map(c => ({
    sector: c.sector,
    'Scope 1': c.scope1_mtco2,
    'Scope 2': c.scope2_mtco2,
    목표: c.target_2030,
  }))

  const trendActual = carbonTrend.filter(d => d.total_mtco2 !== null)
  const trendTarget = carbonTrend.filter(d => d.target !== null)

  return (
    <div className="space-y-6">
      <PageHeader
        title="탄소배출 현황"
        description="부문별 온실가스(GHG) 배출 현황 및 2030 NDC 목표 대비 진척도"
      />

      {/* Year selector */}
      <div className="flex items-center gap-2">
        {YEARS.map(y => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              year === y
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
        <KPICard title="총 배출량 (Scope 1)" value={formatNumber(totalScope1, 1)} unit="MtCO₂" icon={Factory} iconColor="#DA3633" />
        <KPICard title="간접배출 (Scope 2)" value={formatNumber(totalScope2, 1)} unit="MtCO₂" icon={Leaf} iconColor="#D29922" />
        <KPICard title="2030 NDC 목표" value={formatNumber(target2030, 1)} unit="MtCO₂" icon={Wind} iconColor="#2EA043" />
        <KPICard title="필요 추가 감축량" value={formatNumber(current - target2030, 1)} unit="MtCO₂" change={-((current - target2030) / current * 100)} changeLabel="필요감축" icon={TrendingDown} iconColor="#388BFD" />
      </div>

      <ChartWrapper title="부문별 Scope 1/2 배출량" subtitle={`단위: MtCO₂, ${year}년 기준`}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sectorData}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="sector" {...DARK_AXIS} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <YAxis {...DARK_AXIS} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${(v as number).toFixed(1)} MtCO₂`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
            <Bar dataKey="Scope 1" stackId="a" fill={CHART_COLORS[3]} />
            <Bar dataKey="Scope 2" stackId="a" fill={CHART_COLORS[2]} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="온실가스 배출 추이 및 NDC 목표" subtitle="MtCO₂, 2030년 목표 436.6">
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="year" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} domain={[400, 750]} />
              <Tooltip {...DARK_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
              <Area
                data={trendActual} type="monotone" dataKey="total_mtco2"
                stroke={CHART_COLORS[3]} fill={`${CHART_COLORS[3]}25`} strokeWidth={2} name="실제 배출량"
              />
              <Line
                data={trendTarget} type="monotone" dataKey="target"
                stroke={CHART_COLORS[0]} strokeWidth={2} strokeDasharray="6 3" dot={false} name="NDC 경로"
              />
              <ReferenceLine y={436.6} stroke="#2EA043" strokeDasharray="4 4"
                label={{ value: '2030 목표', fill: '#2EA043', fontSize: 11 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="부문별 2030 감축 목표 달성도">
          <div className="space-y-3 mt-2">
            {sectorForYear.map((c, i) => {
              const curr = c.scope1_mtco2 + c.scope2_mtco2
              const needed = curr - c.target_2030
              const pct = Math.max(0, Math.min(100, (needed / curr) * 100))
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#E6EDF3]">{c.sector}</span>
                    <span className="text-[#8B949E]">{curr.toFixed(1)} → {c.target_2030} MtCO₂</span>
                  </div>
                  <div className="w-full bg-[#21262D] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${100 - pct}%`, backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                    />
                  </div>
                  <div className="text-[10px] text-[#6E7681] mt-0.5">감축 필요: {Math.max(0, needed).toFixed(1)} MtCO₂</div>
                </div>
              )
            })}
          </div>
        </ChartWrapper>
      </div>

      <ChartWrapper title="지역별 1인당 탄소집약도" subtitle={`tCO₂/인, ${year}년`}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[...regionForYear].sort((a, b) => b.per_capita - a.per_capita)} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid {...DARK_GRID} horizontal={false} />
            <XAxis type="number" {...DARK_AXIS} />
            <YAxis type="category" dataKey="sido" {...DARK_AXIS} width={40} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} tCO₂/인`]} />
            <Bar dataKey="per_capita" name="1인당 탄소" radius={[0, 3, 3, 0]} fill={CHART_COLORS[3]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  )
}
