import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { DataTable } from '@/components/shared/DataTable'
import { ExportButton } from '@/components/shared/ExportButton'
import { buildingEnergyByType, buildingIntensityTrend } from '@/data/mock/buildingEnergyByType'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts'
import { Building2, Zap, BarChart2, TrendingDown } from 'lucide-react'

export default function BuildingTypeBreakdown() {
  const total = buildingEnergyByType.reduce((s, b) => s + b.consumption_gwh, 0)
  const mostIntense = [...buildingEnergyByType].sort((a, b) => b.intensity_kwh_m2 - a.intensity_kwh_m2)[0]
  const avgIntensity = Math.round(buildingEnergyByType.reduce((s, b) => s + b.intensity_kwh_m2, 0) / buildingEnergyByType.length)

  const pieData = buildingEnergyByType.map((b, i) => ({
    name: b.type,
    value: b.consumption_gwh,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const barData = buildingEnergyByType.map((b, i) => ({
    name: b.type,
    강도: b.intensity_kwh_m2,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const columns = [
    { key: 'type', label: '건물 유형', sortable: true },
    {
      key: 'consumption_gwh', label: '소비량 (GWh)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
    {
      key: 'intensity_kwh_m2', label: '에너지원단위 (kWh/m²)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
    {
      key: 'count', label: '건물 수', sortable: true, align: 'right' as const,
      render: (v: unknown) => `${formatNumber(v as number)}동`,
    },
    {
      key: 'avg_size_m2', label: '평균 규모 (m²)', sortable: true, align: 'right' as const,
      render: (v: unknown) => formatNumber(v as number),
    },
  ]

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx?: number; cy?: number; midAngle?: number; innerRadius?: number; outerRadius?: number; percent?: number
  }) => {
    const RADIAN = Math.PI / 180
    const r = ((innerRadius ?? 0) + ((outerRadius ?? 0) - (innerRadius ?? 0)) * 0.5)
    const x = (cx ?? 0) + r * Math.cos(-(midAngle ?? 0) * RADIAN)
    const y = (cy ?? 0) + r * Math.sin(-(midAngle ?? 0) * RADIAN)
    if ((percent ?? 0) <= 0.08) return null
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11}>
        {`${((percent ?? 0) * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="건물유형별 에너지 사용량"
        description="건물 유형별 전력소비 현황 및 에너지원단위 분석"
        actions={<ExportButton data={buildingEnergyByType as unknown as Record<string, unknown>[]} filename="building_energy_2024" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="건물부문 총 소비" value={formatNumber(total)} unit="GWh" icon={Building2} iconColor="var(--color-electric)" />
        <KPICard title="최고 에너지원단위" value={mostIntense.type} unit={`${mostIntense.intensity_kwh_m2} kWh/m²`} icon={Zap} iconColor="var(--color-danger)" />
        <KPICard title="평균 에너지원단위" value={avgIntensity} unit="kWh/m²" icon={BarChart2} iconColor="var(--color-amber)" />
        <KPICard title="원단위 개선 추세" value="-5.7" unit="% (4년)" change={-5.7} changeLabel="2020→2024" icon={TrendingDown} iconColor="var(--color-primary)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="건물 유형별 전력소비 비율">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData} cx="50%" cy="50%" outerRadius={110} innerRadius={55}
                dataKey="value" labelLine={false} label={CustomLabel}
              >
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} GWh`, '소비량']} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="건물 유형별 에너지원단위 (kWh/m²)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid {...DARK_GRID} horizontal={false} />
              <XAxis type="number" {...DARK_AXIS} />
              <YAxis type="category" dataKey="name" {...DARK_AXIS} width={70} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} kWh/m²`]} />
              <Bar dataKey="강도" radius={[0, 4, 4, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      <ChartWrapper title="주요 건물유형 에너지원단위 추이" subtitle="kWh/m², 연도별">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={buildingIntensityTrend}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="year" {...DARK_AXIS} />
            <YAxis {...DARK_AXIS} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} kWh/m²`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <Line type="monotone" dataKey="office" name="업무" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="retail" name="판매" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="hospital" name="의료" stroke={CHART_COLORS[3]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="school" name="교육" stroke={CHART_COLORS[2]} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-text-primary">건물유형별 상세 데이터</h3>
        </div>
        <DataTable
          data={buildingEnergyByType as unknown as Record<string, unknown>[]}
          columns={columns as Parameters<typeof DataTable>[0]['columns']}
          rowKey={r => String(r.type)}
        />
      </div>
    </div>
  )
}
