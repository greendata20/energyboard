import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { recPrices } from '@/data/mock/renewablesData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber, formatKRW } from '@/utils/formatters'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { TrendingUp, DollarSign, BarChart2, Zap } from 'lucide-react'

export default function RECPrices() {
  const latest = recPrices[recPrices.length - 1]
  const first = recPrices[0]
  const avgPrice = Math.round(recPrices.reduce((s, r) => s + r.price_krw, 0) / recPrices.length)
  const totalVolume = recPrices.reduce((s, r) => s + r.volume_rec, 0)
  const priceChange = ((latest.price_krw - first.price_krw) / first.price_krw) * 100

  const chartData = recPrices.map(r => ({
    month: r.month.slice(5) + '월',
    가격: r.price_krw,
    거래량: r.volume_rec,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="REC 가격 현황"
        description="신재생에너지 공급인증서(REC) 현물 가격 및 거래량 (2024년)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="최근 REC 단가" value={formatNumber(latest.price_krw)} unit="원/REC" icon={DollarSign} iconColor="#2EA043" />
        <KPICard title="연평균 단가" value={formatNumber(avgPrice)} unit="원/REC" icon={BarChart2} iconColor="#388BFD" />
        <KPICard title="연간 총 거래량" value={formatNumber(totalVolume)} unit="REC" icon={Zap} iconColor="#D29922" />
        <KPICard title="연간 가격 변동" value={priceChange.toFixed(1)} unit="%" change={priceChange} changeLabel="1~12월" icon={TrendingUp} iconColor="#A371F7" />
      </div>

      <ChartWrapper title="월별 REC 현물가격 및 거래량" subtitle="좌축: 원/REC, 우축: 거래량(REC)">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={chartData}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="month" {...DARK_AXIS} />
            <YAxis yAxisId="left" {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              {...DARK_TOOLTIP_STYLE}
              formatter={(v: number | undefined, name: string | undefined) =>
                name === '가격' ? [`${formatNumber((v ?? 0) as number)}원/REC`, name ?? ''] : [`${formatNumber((v ?? 0) as number)} REC`, name ?? '']
              }
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
            <Bar yAxisId="right" dataKey="거래량" fill="#388BFD30" stroke="#388BFD" strokeWidth={1} name="거래량" />
            <Line yAxisId="left" type="monotone" dataKey="가격" stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ fill: CHART_COLORS[0], r: 4 }} name="가격" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">REC 가중치 주요 기준</h3>
          <div className="space-y-2">
            {[
              { source: '육상풍력 (일반)', weight: '1.0', color: '#2EA043' },
              { source: '태양광 (100kW 미만)', weight: '1.2', color: '#388BFD' },
              { source: '수상태양광', weight: '1.5', color: '#D29922' },
              { source: '해상풍력 (연계거리 5km↑)', weight: '3.5', color: '#A371F7' },
              { source: '연료전지', weight: '2.0', color: '#39C5CF' },
              { source: 'ESS 연계 태양광 (야간)', weight: '5.0', color: '#DA3633' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#21262D]">
                <span className="text-xs text-[#8B949E]">{item.source}</span>
                <span className="text-sm font-bold" style={{ color: item.color }}>×{item.weight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">RPS 의무 이행 현황 (2024)</h3>
          <div className="space-y-3">
            {[
              { supplier: '한국전력(KEPCO)', obligation_pct: 13.0, achieved_pct: 12.1, deficit: false },
              { supplier: '한국수력원자력', obligation_pct: 13.0, achieved_pct: 14.2, deficit: false },
              { supplier: '남동발전', obligation_pct: 13.0, achieved_pct: 11.8, deficit: true },
              { supplier: '중부발전', obligation_pct: 13.0, achieved_pct: 12.4, deficit: false },
              { supplier: '서부발전', obligation_pct: 13.0, achieved_pct: 10.9, deficit: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8B949E]">{item.supplier}</span>
                  <span className={item.deficit ? 'text-[#F85149]' : 'text-[#3FB950]'}>
                    {item.achieved_pct}% / {item.obligation_pct}%
                    {item.deficit ? ' ⚠' : ' ✓'}
                  </span>
                </div>
                <div className="w-full bg-[#21262D] rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(item.achieved_pct / item.obligation_pct) * 100}%`,
                      backgroundColor: item.deficit ? '#DA3633' : '#2EA043',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6E7681] mt-3">* 2024년 RPS 의무비율: 13%</p>
        </div>
      </div>
    </div>
  )
}
