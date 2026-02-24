import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { solarData, solarByRegion } from '@/data/mock/renewablesData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import { Sun, TrendingDown, Zap, DollarSign } from 'lucide-react'

export default function SolarMarket() {
  const latest = solarData[solarData.length - 1]
  const first = solarData[0]
  const lcoeChange = ((latest.lcoe_usd_mwh - first.lcoe_usd_mwh) / first.lcoe_usd_mwh) * 100

  const capacityData = solarData.map(d => ({
    year: d.year,
    '누적 용량': d.capacity_gw,
    '신규 설치': d.new_gw,
  }))

  const lcoeData = solarData.map(d => ({ year: d.year, LCOE: d.lcoe_usd_mwh }))

  const pieData = solarByRegion.map((r, i) => ({
    name: r.region,
    value: r.capacity_mw,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="태양광 시장"
        description="국내 태양광 발전 시장 현황 및 LCOE 추이"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title={`${latest.year} 누적 설치용량`} value={latest.capacity_gw.toFixed(1)} unit="GW" icon={Sun} iconColor="var(--color-amber)" />
        <KPICard title="연간 신규 설치" value={latest.new_gw.toFixed(1)} unit="GW" icon={Zap} iconColor="var(--color-primary)" />
        <KPICard title="태양광 LCOE" value={latest.lcoe_usd_mwh} unit="USD/MWh" icon={DollarSign} iconColor="var(--color-electric)" />
        <KPICard title={`LCOE 하락 추이 (${first.year}→${latest.year})`} value={lcoeChange.toFixed(1)} unit="%" change={lcoeChange} icon={TrendingDown} iconColor="#A371F7" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="태양광 설치용량 추이" subtitle={`GW, ${first.year}-${latest.year}`}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={capacityData}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="year" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} unit=" GW" />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} GW`]} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Area type="monotone" dataKey="누적 용량" stroke={CHART_COLORS[2]} fill={`${CHART_COLORS[2]}30`} strokeWidth={2} />
              <Area type="monotone" dataKey="신규 설치" stroke={CHART_COLORS[0]} fill={`${CHART_COLORS[0]}30`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="태양광 LCOE 추이" subtitle="USD/MWh, 균등화발전비용">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lcoeData}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="year" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} domain={[30, 60]} unit=" $" />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`$${v}/MWh`, 'LCOE']} />
              <Line type="monotone" dataKey="LCOE" stroke={CHART_COLORS[1]} strokeWidth={2.5}
                dot={{ fill: CHART_COLORS[1], r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="지역별 태양광 설치 현황 (MW)">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => (percent ?? 0) > 0.06 ? `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%` : ''}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} MW`]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="지역별 설치용량 순위">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={solarByRegion} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid {...DARK_GRID} horizontal={false} />
              <XAxis type="number" {...DARK_AXIS} />
              <YAxis type="category" dataKey="region" {...DARK_AXIS} width={40} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} MW`]} />
              <Bar dataKey="capacity_mw" name="설치용량" radius={[0, 3, 3, 0]}>
                {solarByRegion.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>
    </div>
  )
}
