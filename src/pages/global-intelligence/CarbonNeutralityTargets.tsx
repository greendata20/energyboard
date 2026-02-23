import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { carbonNeutralityTargets } from '@/data/mock/globalEnergyData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { CheckCircle2, AlertTriangle, Clock, Globe } from 'lucide-react'

const STATUS_CONFIG = {
  on_track: { label: '순항 중', variant: 'primary' as const, color: '#2EA043' },
  at_risk: { label: '위험', variant: 'amber' as const, color: '#D29922' },
  in_progress: { label: '진행 중', variant: 'electric' as const, color: '#388BFD' },
}

export default function CarbonNeutralityTargets() {
  const onTrack = carbonNeutralityTargets.filter(c => c.status === 'on_track').length
  const atRisk = carbonNeutralityTargets.filter(c => c.status === 'at_risk').length
  const inProgress = carbonNeutralityTargets.filter(c => c.status === 'in_progress').length
  const korea = carbonNeutralityTargets.find(c => c.country === '한국')

  const barData = [...carbonNeutralityTargets].sort((a, b) => b.current_reduction_pct - a.current_reduction_pct)

  const radarData = [
    { subject: '현재 감축율', 한국: korea?.current_reduction_pct ?? 0, OECD평균: 25 },
    { subject: '2030 목표', 한국: korea?.ndc_2030 ?? 0, OECD평균: 55 },
    { subject: '정책 완성도', 한국: 65, OECD평균: 70 },
    { subject: '재생에너지 비중', 한국: 22, OECD평균: 35 },
    { subject: '탄소가격제', 한국: 30, OECD평균: 55 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="탄소중립 목표 현황"
        description="주요국 탄소중립 목표 및 NDC 진척도 비교 분석"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="목표 순항 국가" value={onTrack} unit="개국" icon={CheckCircle2} iconColor="#2EA043" />
        <KPICard title="위험 신호 국가" value={atRisk} unit="개국" icon={AlertTriangle} iconColor="#D29922" />
        <KPICard title="진행 중" value={inProgress} unit="개국" icon={Clock} iconColor="#388BFD" />
        <KPICard title="한국 NDC 감축 목표" value={korea?.ndc_2030 ?? 40} unit="% (2030)" icon={Globe} iconColor="#A371F7" />
      </div>

      <ChartWrapper title="국가별 현재 감축률 vs 2030 NDC 목표" subtitle="2018년 대비 감축%, 막대 = 현재 / 점선 = 목표">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData} margin={{ bottom: 0 }}>
            <CartesianGrid {...DARK_GRID} />
            <XAxis dataKey="country" {...DARK_AXIS} tick={{ fill: '#8B949E', fontSize: 11 }} />
            <YAxis {...DARK_AXIS} unit="%" />
            <Tooltip
              {...DARK_TOOLTIP_STYLE}
              formatter={(v: number | undefined, name: string | undefined) => [`${v ?? 0}%`, name ?? '']}
            />
            <Bar dataKey="current_reduction_pct" name="현재 감축률" radius={[3, 3, 0, 0]}>
              {barData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.country === '한국' ? '#388BFD'
                    : entry.status === 'on_track' ? CHART_COLORS[0]
                    : entry.status === 'at_risk' ? CHART_COLORS[2]
                    : CHART_COLORS[1]
                  }
                />
              ))}
            </Bar>
            <Bar dataKey="ndc_2030" name="2030 NDC 목표" fill="transparent" stroke="#8B949E" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper title="한국 vs OECD 평균 기후대응 역량">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#30363D" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar name="한국" dataKey="한국" stroke="#388BFD" fill="#388BFD" fillOpacity={0.2} />
              <Radar name="OECD평균" dataKey="OECD평균" stroke="#2EA043" fill="#2EA043" fillOpacity={0.2} />
              <Tooltip {...DARK_TOOLTIP_STYLE} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <div className="space-y-3">
          {carbonNeutralityTargets.map((country, i) => {
            const cfg = STATUS_CONFIG[country.status as keyof typeof STATUS_CONFIG]
            const progressPct = (country.current_reduction_pct / country.ndc_2030) * 100
            return (
              <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${country.country === '한국' ? 'text-[#388BFD]' : 'text-[#E6EDF3]'}`}>
                      {country.country}
                    </span>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>
                  <span className="text-xs text-[#6E7681]">{country.target_year}년 목표</span>
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#8B949E]">2030 NDC 진척</span>
                  <span className="text-[#E6EDF3]">{country.current_reduction_pct}% / {country.ndc_2030}%</span>
                </div>
                <Progress
                  value={progressPct}
                  barClassName={`bg-[${cfg.color}]`}
                  className="h-1.5"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
