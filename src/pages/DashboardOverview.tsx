import { useNavigate } from 'react-router-dom'
import { KPICard } from '@/components/shared/KPICard'
import { ChartWrapper } from '@/components/charts/ChartWrapper'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { regionalConsumption2024 } from '@/data/mock/kepcoRegionalConsumption'
import { carbonTrend } from '@/data/mock/carbonEmissions'
import { salesProspects } from '@/data/mock/salesProspects'
import { recPrices } from '@/data/mock/renewablesData'
import { DARK_TOOLTIP_STYLE, DARK_GRID, DARK_AXIS, CHART_COLORS } from '@/components/charts/darkTheme'
import { formatNumber, formatGWh, formatTCO2 } from '@/utils/formatters'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import {
  Zap, Wind, Target, Globe, TrendingDown, AlertTriangle,
  ArrowRight, Leaf
} from 'lucide-react'

export default function DashboardOverview() {
  const navigate = useNavigate()

  const totalGwh = regionalConsumption2024.reduce((s, r) => s + r.consumption_gwh, 0)
  const latestCarbon = carbonTrend.find(c => c.year === 2024)?.total_mtco2 ?? 598.1
  const target2030 = 436.6
  const carbonReductionNeeded = latestCarbon - target2030
  const highPriorityProspects = salesProspects.filter(p => p.priority === 'high').length
  const latestREC = recPrices[recPrices.length - 1].price_krw

  // Chart data
  const trendData = carbonTrend.filter(d => d.total_mtco2 !== null)
  const regionalTop7 = [...regionalConsumption2024]
    .sort((a, b) => b.consumption_gwh - a.consumption_gwh)
    .slice(0, 7)
    .map(r => ({ name: r.sido, value: r.consumption_gwh }))
  const recChart = recPrices.map(r => ({ month: r.month.slice(5) + '월', price: r.price_krw }))

  const kpiCards = [
    {
      title: '전국 전력소비 (2024)',
      value: formatGWh(totalGwh),
      icon: Zap,
      iconColor: 'var(--color-electric)',
      change: 1.5,
      changeLabel: 'YoY',
      path: '/korea-energy/regional',
    },
    {
      title: '온실가스 배출량 (2024)',
      value: `${formatNumber(latestCarbon, 1)} MtCO₂`,
      icon: Wind,
      iconColor: 'var(--color-danger)',
      change: -2.7,
      changeLabel: 'YoY',
      path: '/korea-energy/carbon',
    },
    {
      title: 'High Priority 영업 기회',
      value: `${highPriorityProspects}건`,
      icon: Target,
      iconColor: 'var(--color-primary)',
      path: '/sales-intelligence/prospects',
    },
    {
      title: 'REC 현물가 (최근)',
      value: `${formatNumber(latestREC)}원`,
      icon: Globe,
      iconColor: 'var(--color-amber)',
      change: 11.2,
      changeLabel: 'YTD',
      path: '/renewables/rec',
    },
    {
      title: '2030 NDC 목표',
      value: `${formatNumber(target2030, 1)} MtCO₂`,
      icon: AlertTriangle,
      iconColor: '#A371F7',
      path: '/policy/ghg-targets',
    },
    {
      title: '필요 추가 감축량',
      value: `${formatNumber(carbonReductionNeeded, 1)} MtCO₂`,
      icon: TrendingDown,
      iconColor: 'var(--color-danger)',
      path: '/korea-energy/carbon',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Leaf size={12} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-text-primary">GreenOS Intelligence Dashboard</h1>
          </div>
          <p className="text-sm text-text-secondary">한국그린데이터 영업팀 내부용 — 2024년 데이터 기준</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-text-secondary">실시간 모니터링</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kpiCards.map((card, i) => (
          <KPICard
            key={i}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconColor={card.iconColor}
            change={card.change}
            changeLabel={card.changeLabel}
            onClick={() => navigate(card.path)}
            className="cursor-pointer"
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartWrapper
          title="온실가스 배출 추이"
          subtitle="MtCO₂, 2018~2024 실적"
          actions={
            <button onClick={() => navigate('/korea-energy/carbon')} className="text-xs text-electric hover:underline flex items-center gap-1">
              상세 <ArrowRight size={12} />
            </button>
          }
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="year" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} domain={[550, 750]} tickFormatter={v => `${v}`} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${v} MtCO₂`, '배출량']} />
              <Area type="monotone" dataKey="total_mtco2" stroke={CHART_COLORS[3]} fill={`${CHART_COLORS[3]}30`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper
          title="시도별 전력소비 Top 7"
          subtitle="GWh, 2024년"
          actions={
            <button onClick={() => navigate('/korea-energy/regional')} className="text-xs text-electric hover:underline flex items-center gap-1">
              상세 <ArrowRight size={12} />
            </button>
          }
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={regionalTop7}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="name" {...DARK_AXIS} />
              <YAxis {...DARK_AXIS} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)} GWh`, '전력소비']} />
              <Bar dataKey="value" fill={CHART_COLORS[1]} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartWrapper
          title="REC 가격 동향"
          subtitle="원/REC, 2024년"
          className="lg:col-span-1"
        >
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={recChart}>
              <CartesianGrid {...DARK_GRID} />
              <XAxis dataKey="month" {...DARK_AXIS} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} />
              <YAxis {...DARK_AXIS} domain={[40000, 55000]} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip {...DARK_TOOLTIP_STYLE} formatter={(v: unknown) => [`${formatNumber(v as number)}원`, 'REC 단가']} />
              <Line type="monotone" dataKey="price" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">영업 우선순위 현황</h3>
          <div className="space-y-3">
            {[
              { label: 'High Priority', count: highPriorityProspects, color: 'var(--color-danger)', pct: (highPriorityProspects / salesProspects.length) * 100 },
              { label: 'Medium Priority', count: salesProspects.filter(p => p.priority === 'medium').length, color: 'var(--color-amber)', pct: (salesProspects.filter(p => p.priority === 'medium').length / salesProspects.length) * 100 },
              { label: 'BEMS 미설치', count: salesProspects.filter(p => !p.bems_installed).length, color: 'var(--color-electric)', pct: (salesProspects.filter(p => !p.bems_installed).length / salesProspects.length) * 100 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>{item.count}건</span>
                </div>
                <div className="w-full bg-bg-elevated rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/sales-intelligence/prospects')}
            className="mt-3 w-full text-xs text-center text-electric hover:underline flex items-center justify-center gap-1"
          >
            영업 목록 보기 <ArrowRight size={12} />
          </button>
        </div>

        <div className="lg:col-span-1 bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">주요 정책 알림</h3>
          <div className="space-y-2.5">
            {[
              { date: '2026-01', title: 'EU CBAM 본격 시행', type: 'danger', impact: '철강·알루미늄 수출 기업 영향' },
              { date: '2026-01', title: 'ESG 공시 의무화 (코스피200)', type: 'amber', impact: '대기업 K-ISSB 공시 시작' },
              { date: '2025-12', title: '11차 전기본 확정', type: 'electric', impact: '재생에너지 목표 확정' },
              { date: '2024-10', title: 'RPS 의무비율 13% 유지', type: 'primary', impact: 'REC 수요 안정적 유지' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Badge variant={item.type as 'danger' | 'amber' | 'electric' | 'primary'} className="shrink-0 text-[10px]">
                  {item.date}
                </Badge>
                <div>
                  <div className="text-xs text-text-primary font-medium">{item.title}</div>
                  <div className="text-[10px] text-text-muted">{item.impact}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/policy/timeline')}
            className="mt-3 w-full text-xs text-center text-electric hover:underline flex items-center justify-center gap-1"
          >
            전체 타임라인 <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* 2030 NDC Progress */}
      <div className="bg-bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">2030 NDC 목표 달성 진척도</h3>
          <button onClick={() => navigate('/policy/ghg-targets')} className="text-xs text-electric hover:underline flex items-center gap-1">
            상세 <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">2018 기준</span>
              <span className="text-danger font-bold">727.6 MtCO₂</span>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">2024 현재</span>
              <span className="text-amber font-bold">{latestCarbon} MtCO₂</span>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">2030 목표 (NDC)</span>
              <span className="text-primary font-bold">{target2030} MtCO₂</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">목표 달성률</span>
              <span className="text-text-primary font-bold">
                {(((727.6 - latestCarbon) / (727.6 - target2030)) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={((727.6 - latestCarbon) / (727.6 - target2030)) * 100}
              className="h-3"
              barClassName="bg-gradient-to-r from-[#DA3633] via-[#D29922] to-[#2EA043]"
            />
            <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
              <span>2018 기준 (727.6)</span>
              <span>2030 목표 (436.6)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
