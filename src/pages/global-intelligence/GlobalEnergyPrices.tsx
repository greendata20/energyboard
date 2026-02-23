import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Badge } from '@/components/ui/badge'
import { globalEnergyPrices } from '@/data/mock/globalEnergyData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { DollarSign, TrendingUp, Globe, Zap } from 'lucide-react'

export default function GlobalEnergyPrices() {
  const [sortBy, setSortBy] = useState<'price' | 'country'>('price')

  const sorted = [...globalEnergyPrices].sort((a, b) =>
    sortBy === 'price' ? b.price_usd_kwh - a.price_usd_kwh : a.country.localeCompare(b.country)
  )

  const koreaPrice = globalEnergyPrices.find(p => p.country_code === 'KR')?.price_usd_kwh ?? 0
  const oecdAvg = 0.19
  const maxPrice = Math.max(...globalEnergyPrices.map(p => p.price_usd_kwh))
  const cheaperThanKorea = globalEnergyPrices.filter(p => p.price_usd_kwh < koreaPrice).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="국가별 에너지가격"
        description="2024년 기준 주요국 산업용 전기요금 비교 (World Bank, IEA)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="한국 전기요금" value={koreaPrice} unit="USD/kWh" icon={Zap} iconColor="#388BFD" />
        <KPICard title="OECD 평균" value={oecdAvg} unit="USD/kWh" icon={Globe} iconColor="#2EA043" />
        <KPICard title="최고가 (독일)" value={maxPrice} unit="USD/kWh" icon={TrendingUp} iconColor="#DA3633" />
        <KPICard title="한국보다 저렴한 국가" value={cheaperThanKorea} unit="개국" icon={DollarSign} iconColor="#D29922" />
      </div>

      <ChartWrapper
        title="국가별 산업용 전기요금 (USD/kWh)"
        subtitle="OECD 평균 기준선 포함 · 파란색 = 한국"
        actions={
          <div className="flex gap-2">
            <button onClick={() => setSortBy('price')} className={`text-xs px-2 py-0.5 rounded ${sortBy === 'price' ? 'bg-[#21262D] text-[#E6EDF3]' : 'text-[#8B949E]'}`}>가격순</button>
            <button onClick={() => setSortBy('country')} className={`text-xs px-2 py-0.5 rounded ${sortBy === 'country' ? 'bg-[#21262D] text-[#E6EDF3]' : 'text-[#8B949E]'}`}>국가순</button>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid {...DARK_GRID} horizontal={false} />
            <XAxis type="number" {...DARK_AXIS} tickFormatter={v => `$${v}`} />
            <YAxis type="category" dataKey="country" {...DARK_AXIS} width={52} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`$${v} USD/kWh`, '전기요금']} />
            <ReferenceLine x={oecdAvg} stroke="#2EA043" strokeDasharray="4 4"
              label={{ value: 'OECD', fill: '#2EA043', fontSize: 10, position: 'top' }} />
            <Bar dataKey="price_usd_kwh" radius={[0, 3, 3, 0]}>
              {sorted.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.country_code === 'KR' ? '#388BFD' : entry.price_usd_kwh > oecdAvg ? '#DA3633' : CHART_COLORS[0]}
                  opacity={entry.country_code === 'KR' ? 1 : 0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: '고가 (>$0.25)', color: '#DA3633', items: globalEnergyPrices.filter(p => p.price_usd_kwh > 0.25) },
          { label: '중가 ($0.10~$0.25)', color: '#D29922', items: globalEnergyPrices.filter(p => p.price_usd_kwh >= 0.10 && p.price_usd_kwh <= 0.25) },
          { label: '저가 (<$0.10)', color: '#2EA043', items: globalEnergyPrices.filter(p => p.price_usd_kwh < 0.10) },
        ].map(group => (
          <div key={group.label} className="bg-[#161B22] border border-[#30363D] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-xs font-medium text-[#E6EDF3]">{group.label}</span>
              <Badge variant="outline" className="ml-auto">{group.items.length}개국</Badge>
            </div>
            <div className="space-y-1">
              {group.items.map(p => (
                <div key={p.country_code} className="flex justify-between text-xs">
                  <span className={p.country_code === 'KR' ? 'text-[#388BFD] font-bold' : 'text-[#8B949E]'}>{p.country}</span>
                  <span className="text-[#E6EDF3]">${p.price_usd_kwh}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
