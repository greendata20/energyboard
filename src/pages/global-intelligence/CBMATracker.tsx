import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Badge } from '@/components/ui/badge'
import { cbamData } from '@/data/mock/globalEnergyData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { AlertTriangle, DollarSign, Globe, TrendingUp } from 'lucide-react'

function formatNumber(v: number, d = 0) {
  return v.toLocaleString('ko-KR', { maximumFractionDigits: d })
}

export default function CBMATracker() {
  const totalExposure = cbamData.reduce((s, d) => s + d.cbam_exposure_m_eur, 0)
  const steelExposure = cbamData.find(d => d.sector === '철강')?.cbam_exposure_m_eur ?? 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="EU CBAM 탄소국경조정 트래커"
        description="한국 수출 업종별 EU CBAM 예상 부담액 분석"
      />

      <div className="bg-[#3F1515] border border-[#DA3633] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-[#F85149] shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-[#F85149] mb-1">CBAM 주요 일정</div>
            <div className="text-xs text-[#E6EDF3] space-y-1">
              <div>✓ 2023년 10월 — 전환기간 시작 (보고 의무만, 비용 없음)</div>
              <div>⚠ 2026년 1월 — 본격 시행: 실제 탄소비용 부과 시작</div>
              <div>→ 대상: 철강, 알루미늄, 시멘트, 비료, 전력, 수소 6개 품목</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="총 CBAM 노출액" value={totalExposure} unit="백만 EUR/년" icon={DollarSign} iconColor="#DA3633" />
        <KPICard title="철강 부담 비중" value={((steelExposure / totalExposure) * 100).toFixed(0)} unit="%" icon={Globe} iconColor="#D29922" />
        <KPICard title="EU ETS 탄소가격" value={65} unit="EUR/tCO₂" icon={TrendingUp} iconColor="#388BFD" />
        <KPICard title="K-ETS 탄소가격" value="8,500" unit="원/tCO₂" icon={AlertTriangle} iconColor="#A371F7" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="업종별 CBAM 예상 부담액" subtitle="백만 EUR/년, 2026년 본격 시행 시">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cbamData}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="sector" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`€${v}M`, 'CBAM 부담액']} />
              <Bar dataKey="cbam_exposure_m_eur" name="CBAM 부담액" radius={[3, 3, 0, 0]}>
                {cbamData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="K-ETS vs EU ETS 탄소가격 비교">
          <div className="space-y-4 mt-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8B949E]">K-ETS (한국)</span>
                <span className="text-[#E6EDF3] font-bold">8,500원/tCO₂ ≈ €6/tCO₂</span>
              </div>
              <div className="w-full bg-[#21262D] rounded-full h-3">
                <div className="h-3 rounded-full bg-[#388BFD]" style={{ width: `${(6 / 65) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8B949E]">EU ETS (유럽)</span>
                <span className="text-[#E6EDF3] font-bold">€65/tCO₂</span>
              </div>
              <div className="w-full bg-[#21262D] rounded-full h-3">
                <div className="h-3 rounded-full bg-[#DA3633]" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="bg-[#0D1117] rounded-lg p-3">
              <div className="text-xs text-[#8B949E] mb-1">탄소가격 격차 (CBAM 조정 필요)</div>
              <div className="text-2xl font-bold text-[#DA3633]">€59/tCO₂</div>
              <div className="text-xs text-[#8B949E] mt-1">한국 기업이 EU 수출 시 추가 부담해야 할 탄소 비용</div>
            </div>
            <div className="space-y-1.5">
              {cbamData.map(d => (
                <div key={d.sector} className="flex items-center justify-between bg-[#0D1117] rounded-md px-3 py-1.5">
                  <span className="text-xs text-[#E6EDF3]">{d.sector}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8B949E]">{d.carbon_intensity} tCO₂/t</span>
                    <span className="text-xs text-[#8B949E]">{formatNumber(d.export_kt)} kt</span>
                    <Badge variant={d.cbam_exposure_m_eur > 100 ? 'danger' : d.cbam_exposure_m_eur > 50 ? 'amber' : 'electric'}>
                      €{d.cbam_exposure_m_eur}M
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartWrapper>
      </div>
    </div>
  )
}
