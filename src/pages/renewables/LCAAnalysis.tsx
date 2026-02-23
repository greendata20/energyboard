import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Leaf, Wind, Sun, Zap } from 'lucide-react'

const lcaData = [
  { source: '석탄', lifecycle_gco2_kwh: 820, water_l_kwh: 1.5, land_m2_gwh: 1.5 },
  { source: '천연가스', lifecycle_gco2_kwh: 490, water_l_kwh: 0.8, land_m2_gwh: 0.5 },
  { source: '원자력', lifecycle_gco2_kwh: 12, water_l_kwh: 2.3, land_m2_gwh: 0.1 },
  { source: '수력', lifecycle_gco2_kwh: 24, water_l_kwh: 5.5, land_m2_gwh: 14.0 },
  { source: '태양광(지상)', lifecycle_gco2_kwh: 41, water_l_kwh: 0.02, land_m2_gwh: 5.6 },
  { source: '태양광(옥상)', lifecycle_gco2_kwh: 38, water_l_kwh: 0.02, land_m2_gwh: 0.0 },
  { source: '육상풍력', lifecycle_gco2_kwh: 11, water_l_kwh: 0.01, land_m2_gwh: 0.3 },
  { source: '해상풍력', lifecycle_gco2_kwh: 14, water_l_kwh: 0.01, land_m2_gwh: 0.1 },
]

const radarData = [
  { subject: '탄소 저감', 태양광: 85, 풍력: 98, 원자력: 97 },
  { subject: '용수 효율', 태양광: 99, 풍력: 100, 원자력: 70 },
  { subject: '토지 효율', 태양광: 55, 풍력: 90, 원자력: 96 },
  { subject: '에너지밀도', 태양광: 60, 풍력: 40, 원자력: 98 },
  { subject: '수명주기', 태양광: 75, 풍력: 80, 원자력: 90 },
  { subject: '경제성', 태양광: 90, 풍력: 88, 원자력: 65 },
]

export default function LCAAnalysis() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="LCA 전과정평가"
        description="발전원별 생애주기 탄소 발자국 및 환경 영향 비교 (IPCC AR6 기반)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="육상풍력 LCA" value="11" unit="gCO₂/kWh" icon={Wind} iconColor="#2EA043" />
        <KPICard title="태양광(옥상) LCA" value="38" unit="gCO₂/kWh" icon={Sun} iconColor="#D29922" />
        <KPICard title="원자력 LCA" value="12" unit="gCO₂/kWh" icon={Zap} iconColor="#388BFD" />
        <KPICard title="석탄 대비 풍력 절감" value="98.7" unit="%" icon={Leaf} iconColor="#A371F7" />
      </div>

      <ChartWrapper title="발전원별 전과정 탄소배출 비교" subtitle="gCO₂eq/kWh, IPCC AR6 중간값 기준">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={lcaData} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid {...DARK_GRID} horizontal={false} />
            <XAxis type="number" {...DARK_AXIS} unit=" gCO₂" />
            <YAxis type="category" dataKey="source" {...DARK_AXIS} width={72} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} gCO₂/kWh`, '전과정 배출']} />
            <Bar dataKey="lifecycle_gco2_kwh" name="전과정 탄소배출" radius={[0, 3, 3, 0]}>
              {lcaData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.lifecycle_gco2_kwh > 400 ? CHART_COLORS[3]
                    : entry.lifecycle_gco2_kwh > 100 ? CHART_COLORS[2]
                    : CHART_COLORS[0]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="재생에너지 환경성 종합 비교">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#30363D" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar name="태양광" dataKey="태양광" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.2} />
              <Radar name="풍력" dataKey="풍력" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
              <Radar name="원자력" dataKey="원자력" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.2} />
              <Tooltip {...DARK_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B949E' }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">LCA 발전원별 상세 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#30363D]">
                  <th className="px-2 py-2 text-left text-[#8B949E]">발전원</th>
                  <th className="px-2 py-2 text-right text-[#8B949E]">탄소 gCO₂/kWh</th>
                  <th className="px-2 py-2 text-right text-[#8B949E]">용수 L/kWh</th>
                  <th className="px-2 py-2 text-right text-[#8B949E]">토지 m²/GWh</th>
                </tr>
              </thead>
              <tbody>
                {lcaData.map((row, i) => (
                  <tr key={i} className="border-b border-[#21262D]">
                    <td className="px-2 py-2 text-[#E6EDF3]">{row.source}</td>
                    <td className={`px-2 py-2 text-right font-bold ${row.lifecycle_gco2_kwh > 400 ? 'text-[#F85149]' : row.lifecycle_gco2_kwh < 50 ? 'text-[#3FB950]' : 'text-[#D29922]'}`}>
                      {row.lifecycle_gco2_kwh}
                    </td>
                    <td className="px-2 py-2 text-right text-[#8B949E]">{row.water_l_kwh}</td>
                    <td className="px-2 py-2 text-right text-[#8B949E]">{row.land_m2_gwh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#6E7681] mt-2">출처: IPCC AR6 WG3 Annex III, 2022</p>
        </div>
      </div>
    </div>
  )
}
