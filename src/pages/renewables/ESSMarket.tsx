import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { essData } from '@/data/mock/renewablesData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from 'recharts'
import { Battery, Zap, TrendingUp, Building2 } from 'lucide-react'

export default function ESSMarket() {
  const latest = essData[essData.length - 1]
  const first = essData[0]
  const growthRate = ((latest.capacity_mwh / first.capacity_mwh) ** (1 / (essData.length - 1)) - 1) * 100

  const stackedData = essData.map(d => ({
    year: d.year,
    '전력계통': d.power_system_mwh,
    '상업·산업': d.commercial_mwh,
    '재생에너지': d.renewable_mwh,
  }))

  const trendData = essData.map(d => ({ year: d.year, total: d.capacity_mwh }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="에너지저장장치(ESS) 시장"
        description="국내 ESS 설치 현황 및 용도별 분류"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title={`${latest.year} 누적 용량`} value={formatNumber(latest.capacity_mwh)} unit="MWh" icon={Battery} iconColor="var(--color-primary)" />
        <KPICard title="재생에너지 연계" value={formatNumber(latest.renewable_mwh)} unit="MWh" icon={Zap} iconColor="var(--color-electric)" />
        <KPICard title="상업·산업용" value={formatNumber(latest.commercial_mwh)} unit="MWh" icon={Building2} iconColor="var(--color-amber)" />
        <KPICard title="연평균 성장률(CAGR)" value={growthRate.toFixed(1)} unit="%" change={growthRate} icon={TrendingUp} iconColor="#A371F7" />
      </div>

      <ChartWrapper title="ESS 연도별 누적 설치용량" subtitle="MWh, 용도별">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stackedData}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="year" {...DARK_AXIS} />
            <YAxis {...DARK_AXIS} tickFormatter={v => `${v.toLocaleString()}`} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} MWh`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <Bar dataKey="전력계통" stackId="a" fill={CHART_COLORS[1]} />
            <Bar dataKey="상업·산업" stackId="a" fill={CHART_COLORS[2]} />
            <Bar dataKey="재생에너지" stackId="a" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="ESS 총 설치 추이">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="year" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} MWh`, '누적용량']} />
              <Area type="monotone" dataKey="total" stroke={CHART_COLORS[0]} fill={`${CHART_COLORS[0]}30`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-4">ESS 주요 정책 현황</h3>
          <div className="space-y-3">
            {[
              { title: 'ESS 안전 강화 기준', desc: '2023년 화재 사고 이후 ESS 안전관리 강화 고시 개정', status: '시행 중', color: 'var(--color-primary)' },
              { title: 'ESS REC 가중치', desc: '태양광 연계 ESS 야간 방전: 가중치 5.0배 (최고)', status: '유지', color: 'var(--color-electric)' },
              { title: '10차 전기본 ESS 목표', desc: '2030년까지 전력계통 ESS 5,800MWh 구축 목표', status: '추진 중', color: 'var(--color-amber)' },
              { title: '산업용 ESS 피크저감', desc: '피크 저감 인센티브 및 한전 요금제 연계', status: '확대 중', color: '#A371F7' },
            ].map((item, i) => (
              <div key={i} className="bg-bg-base rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-text-primary">{item.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: item.color + '30', color: item.color }}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
