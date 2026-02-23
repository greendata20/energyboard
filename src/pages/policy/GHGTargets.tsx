import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Progress } from '@/components/ui/progress'
import { ghgTargets } from '@/data/mock/policyData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts'
import { Target, TrendingDown, Wind, Factory } from 'lucide-react'

export default function GHGTargets() {
  const totalBaseline = ghgTargets.reduce((s, g) => s + g.baseline_mtco2, 0)
  const totalTarget = ghgTargets.reduce((s, g) => s + g.target_mtco2, 0)
  const totalCurrent = ghgTargets.reduce((s, g) => s + g.current_mtco2, 0)
  const overallReduction = ((totalBaseline - totalTarget) / totalBaseline * 100)

  const chartData = ghgTargets.map((g, i) => ({
    sector: g.sector,
    '2018 기준': g.baseline_mtco2,
    '2024 현재': g.current_mtco2,
    '2030 목표': g.target_mtco2,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="온실가스 감축목표"
        description="부문별 2030 NDC 목표 및 현재 진척 현황"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="2018 기준 총배출" value={totalBaseline.toFixed(0)} unit="MtCO₂" icon={Factory} iconColor="#DA3633" />
        <KPICard title="2024 현재 배출" value={totalCurrent.toFixed(0)} unit="MtCO₂" icon={Wind} iconColor="#D29922" />
        <KPICard title="2030 NDC 목표" value={totalTarget.toFixed(0)} unit="MtCO₂" icon={Target} iconColor="#2EA043" />
        <KPICard title="필요 감축량" value={overallReduction.toFixed(1)} unit="%" change={-overallReduction} changeLabel="2018 대비" icon={TrendingDown} iconColor="#388BFD" />
      </div>

      <ChartWrapper title="부문별 온실가스 감축 목표 비교" subtitle="MtCO₂eq, 2018 기준~2030 목표">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ bottom: 0 }}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="sector" {...DARK_AXIS} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <YAxis {...DARK_AXIS} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${(v as number).toFixed(1)} MtCO₂`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
            <Bar dataKey="2018 기준" fill={CHART_COLORS[3]} fillOpacity={0.6} />
            <Bar dataKey="2024 현재" fill={CHART_COLORS[2]} />
            <Bar dataKey="2030 목표" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="space-y-3">
        {ghgTargets.map((g, i) => {
          const achievedFromBaseline = ((g.baseline_mtco2 - g.current_mtco2) / (g.baseline_mtco2 - g.target_mtco2)) * 100
          const clampedPct = Math.max(0, Math.min(100, achievedFromBaseline))
          return (
            <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-sm font-semibold text-[#E6EDF3]">{g.sector}</span>
                </div>
                <div className="text-xs text-[#8B949E]">
                  목표 감축: <span className="text-[#E6EDF3] font-semibold">{g.reduction_pct}%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3 text-xs">
                <div className="text-center">
                  <div className="text-[#6E7681]">2018 기준</div>
                  <div className="font-bold text-[#DA3633]">{g.baseline_mtco2} MtCO₂</div>
                </div>
                <div className="text-center">
                  <div className="text-[#6E7681]">2024 현재</div>
                  <div className="font-bold text-[#D29922]">{g.current_mtco2} MtCO₂</div>
                </div>
                <div className="text-center">
                  <div className="text-[#6E7681]">2030 목표</div>
                  <div className="font-bold text-[#2EA043]">{g.target_mtco2} MtCO₂</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={clampedPct}
                  className="flex-1 h-2"
                  barClassName={clampedPct >= 60 ? 'bg-[#2EA043]' : clampedPct >= 30 ? 'bg-[#D29922]' : 'bg-[#DA3633]'}
                />
                <span className="text-xs font-bold text-[#E6EDF3] w-12 text-right">
                  {clampedPct.toFixed(0)}%
                </span>
              </div>
              <div className="text-[10px] text-[#6E7681] mt-1">목표 달성 진척도</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
