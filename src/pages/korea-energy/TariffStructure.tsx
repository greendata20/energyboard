import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { kepcoTariffs, peakTimeSchedule, tariffHistory } from '@/data/mock/kepcoTariff'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS } from '@/components/charts/darkTheme'
import { formatNumber, formatKRW } from '@/utils/formatters'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap, DollarSign, TrendingUp, Calculator } from 'lucide-react'

export default function TariffStructure() {
  const [kwhInput, setKwhInput] = useState('50000')
  const [tariffTypeIdx, setTariffTypeIdx] = useState(0)
  const [season, setSeason] = useState<'low' | 'mid' | 'peak'>('mid')

  const selectedTariff = kepcoTariffs[tariffTypeIdx]
  const kwh = Number(kwhInput) || 0
  const kw = Math.round(kwh / 720 * 1.3)

  const energyRate = season === 'low' ? selectedTariff.energy_rate_low
    : season === 'mid' ? selectedTariff.energy_rate_mid
    : selectedTariff.energy_rate_peak

  const baseCost = kw * selectedTariff.base_rate_kw
  const energyCost = kwh * (energyRate + selectedTariff.fuel_adj_rate)
  const subtotal = baseCost + energyCost
  const vat = Math.round(subtotal * 0.1)
  const powerFund = Math.round(subtotal * 0.037)
  const total = subtotal + vat + powerFund

  return (
    <div className="space-y-6">
      <PageHeader title="한전 전기요금 체계" description="2024년 KEPCO 요금 구조 및 요금 계산기" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="산업용(을) 기본요금" value="6,630" unit="원/kW" icon={DollarSign} iconColor="var(--color-electric)" />
        <KPICard title="최대부하 단가 (산업을)" value="116.7" unit="원/kWh" icon={Zap} iconColor="var(--color-danger)" />
        <KPICard title="연료비 조정액" value="+5.0" unit="원/kWh" icon={TrendingUp} iconColor="var(--color-amber)" />
        <KPICard title="누적 요금 인상률" value="+31.5" unit="% (2021→2024)" icon={TrendingUp} iconColor="#A371F7" />
      </div>

      <Tabs defaultValue="structure">
        <TabsList>
          <TabsTrigger value="structure">요금 체계</TabsTrigger>
          <TabsTrigger value="calculator">요금 계산기</TabsTrigger>
          <TabsTrigger value="history">변동 이력</TabsTrigger>
          <TabsTrigger value="peak">시간대별 단가</TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <div className="overflow-x-auto bg-bg-card border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['요금 종류', '전압', '기본요금 (원/kW)', '경부하 (원/kWh)', '중간부하', '최대부하'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-text-secondary font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kepcoTariffs.map((t, i) => (
                  <tr key={i} className="border-b border-border-subtle hover:bg-bg-elevated">
                    <td className="px-3 py-2.5 text-text-primary font-medium whitespace-nowrap">{t.category} {t.subcategory}</td>
                    <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">{t.voltage}</td>
                    <td className="px-3 py-2.5 text-right text-text-primary">{formatNumber(t.base_rate_kw)}</td>
                    <td className="px-3 py-2.5 text-right text-electric">{t.energy_rate_low}</td>
                    <td className="px-3 py-2.5 text-right text-amber">{t.energy_rate_mid}</td>
                    <td className="px-3 py-2.5 text-right text-danger">{t.energy_rate_peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted mt-2 px-1">※ 연료비조정액 +5.0원/kWh 별도 부과. 2024년 기준.</p>
        </TabsContent>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Calculator size={16} className="text-electric" /> 요금 계산기
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-text-secondary block mb-1">요금 유형</label>
                  <select
                    value={tariffTypeIdx}
                    onChange={e => setTariffTypeIdx(Number(e.target.value))}
                    className="w-full bg-bg-card border border-border text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:border-electric"
                  >
                    {kepcoTariffs.map((t, i) => (
                      <option key={i} value={i}>{t.category} - {t.subcategory}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1">월 사용량 (kWh)</label>
                  <input
                    type="number"
                    value={kwhInput}
                    onChange={e => setKwhInput(e.target.value)}
                    className="w-full bg-bg-card border border-border text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:border-electric"
                    placeholder="예: 50000"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1">부하 시간대</label>
                  <div className="flex gap-2">
                    {(['low', 'mid', 'peak'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          season === s
                            ? s === 'low' ? 'bg-electric text-white'
                              : s === 'mid' ? 'bg-amber text-black'
                              : 'bg-danger text-white'
                            : 'bg-bg-elevated text-text-secondary hover:bg-border'
                        }`}
                      >
                        {s === 'low' ? '경부하' : s === 'mid' ? '중간부하' : '최대부하'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-base rounded-lg p-4 border border-border">
              <h4 className="text-xs font-semibold text-text-secondary mb-4 uppercase tracking-wide">청구서 미리보기</h4>
              <div className="space-y-2.5">
                {[
                  { label: '기본요금', val: `${formatNumber(kw)} kW × ${formatNumber(selectedTariff.base_rate_kw)}원`, amount: baseCost },
                  { label: '전력량요금', val: `${formatNumber(kwh)} kWh × ${energyRate + selectedTariff.fuel_adj_rate}원`, amount: energyCost },
                  { label: '부가가치세(10%)', val: '', amount: vat },
                  { label: '전력산업기반기금(3.7%)', val: '', amount: powerFund },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{row.label}</span>
                    <div className="text-right">
                      {row.val && <div className="text-[10px] text-text-muted">{row.val}</div>}
                      <div className="text-text-primary">{formatKRW(row.amount)}</div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-text-primary">청구 합계</span>
                    <span className="text-xl font-bold text-primary">{formatKRW(total)}</span>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    단가 평균: {kwh > 0 ? (total / kwh).toFixed(1) : '0'}원/kWh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ChartWrapper title="전기요금 누적 단가 변동" subtitle="원/kWh, 2021~2024">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={tariffHistory}>
                <CartesianGrid {...DARK_GRID} />
                <XAxis dataKey="date" {...DARK_AXIS} />
                <YAxis {...DARK_AXIS} domain={[100, 150]} />
                <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} 원/kWh`, '기준단가']} />
                <Area type="stepAfter" dataKey="cumulative" stroke="#388BFD" fill="#388BFD30" strokeWidth={2} name="누적 단가" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </TabsContent>

        <TabsContent value="peak">
          <div className="space-y-3">
            {peakTimeSchedule.map((p, i) => (
              <div key={i} className="bg-bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.season === '여름' ? 'bg-danger-muted text-danger-hover'
                      : p.season === '겨울' ? 'bg-electric-muted text-electric-hover'
                      : 'bg-primary-muted text-primary-hover'
                  }`}>{p.season}</div>
                  <span className="text-sm text-text-secondary">{p.period}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-danger font-medium mb-1">최대부하</div>
                    <div className="text-text-secondary">{p.peak}</div>
                  </div>
                  <div>
                    <div className="text-amber font-medium mb-1">중간부하</div>
                    <div className="text-text-secondary">{p.mid}</div>
                  </div>
                  <div>
                    <div className="text-electric font-medium mb-1">경부하</div>
                    <div className="text-text-secondary">{p.low}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
