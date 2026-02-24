import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { ppaData, ppaByType } from '@/data/mock/renewablesData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber } from '@/utils/formatters'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ReferenceLine
} from 'recharts'
import { FileCheck, TrendingUp, Zap, DollarSign } from 'lucide-react'

export default function PPAMarket() {
  const latest = ppaData[ppaData.length - 1]
  const first = ppaData[0]
  const priceDiff = latest.kepco_industrial_kwh - latest.avg_price_kwh
  const growthPct = Math.round(((latest.ppa_contracts - first.ppa_contracts) / first.ppa_contracts) * 100)

  const comparisonData = ppaData.map(d => ({
    year: d.year,
    'PPA 평균단가': d.avg_price_kwh,
    '한전 산업용(을)': d.kepco_industrial_kwh,
  }))

  const pieData = ppaByType.map((t, i) => ({
    name: t.type,
    value: t.mw,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="전력구매계약(PPA)"
        description="기업 재생에너지 직접 PPA 시장 현황 및 한전 산업용 요금 비교"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title={`${latest.year} PPA 계약 건수`} value={latest.ppa_contracts} unit="건" icon={FileCheck} iconColor="var(--color-primary)" />
        <KPICard title="총 계약용량" value={formatNumber(latest.total_mw)} unit="MW" icon={Zap} iconColor="var(--color-electric)" />
        <KPICard title="PPA vs 한전 가격차" value={priceDiff} unit="원/kWh 저렴" icon={DollarSign} iconColor="var(--color-amber)" />
        <KPICard title={`성장률 (${first.year}→${latest.year})`} value={`+${growthPct}`} unit="%" change={growthPct} icon={TrendingUp} iconColor="#A371F7" />
      </div>

      <div className="bg-primary-muted border border-primary rounded-lg p-4">
        <div className="text-sm font-semibold text-primary-hover mb-1">PPA 경제성 포인트</div>
        <div className="text-xs text-text-primary">
          {latest.year}년 기준 PPA 평균단가 {latest.avg_price_kwh}원/kWh vs 한전 산업용(을) {latest.kepco_industrial_kwh}원/kWh → <strong className="text-primary-hover">{priceDiff}원/kWh 절감</strong>,
          RE100 이행 및 ESG 공시 동시 충족 가능
        </div>
      </div>

      <ChartWrapper title="PPA vs 한전 산업용 요금 비교" subtitle="원/kWh, 연도별">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={comparisonData}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="year" {...DARK_AXIS} />
            <YAxis {...DARK_AXIS} domain={[80, 160]} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v}원/kWh`]} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            <ReferenceLine y={100} stroke="var(--color-border)" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="PPA 평균단가" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="한전 산업용(을)" stroke={CHART_COLORS[3]} strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="PPA 계약 유형별 분류 (MW)">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value"
                label={({ name, percent }: { name?: string; percent?: number }) => `${(name ?? '').slice(0, 6)} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: 'var(--color-text-secondary)' }}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} MW`]} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">연도별 PPA 시장 성장</h3>
          <div className="space-y-4">
            {ppaData.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-text-secondary">{d.year}년</span>
                  <span className="text-text-primary">{d.ppa_contracts}건 · {formatNumber(d.total_mw)} MW</span>
                </div>
                <div className="w-full bg-bg-elevated rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${(d.total_mw / ppaData[ppaData.length - 1].total_mw) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-text-secondary">
            <div className="font-semibold text-text-primary mb-2">PPA 도입 주요 RE100 한국 기업</div>
            <div className="space-y-1">
              <div>• 삼성전자 — 태양광 PPA 2.4GW 계약 (2024)</div>
              <div>• SK하이닉스 — 풍력 PPA 1.1GW (2023)</div>
              <div>• LG에너지솔루션 — 수상태양광 280MW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
