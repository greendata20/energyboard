import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { kesGCategories } from '@/data/mock/policyData'
import { Leaf, Users, Building2, CheckSquare } from 'lucide-react'

export default function KESGGuide() {
  const totalIndicators = kesGCategories.reduce((s, area) =>
    s + area.categories.reduce((cs, cat) => cs + cat.indicators.length, 0), 0
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="K-ESG 가이드라인"
        description="산업통상자원부·환경부 공동 발표 (2022.03) — 국내 기업 ESG 자가진단 기준"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="총 진단 항목" value={totalIndicators} unit="개 지표" icon={CheckSquare} iconColor="#2EA043" />
        <KPICard title="환경(E) 항목" value="16" unit="개" icon={Leaf} iconColor="#2EA043" />
        <KPICard title="사회(S) 항목" value="22" unit="개" icon={Users} iconColor="#388BFD" />
        <KPICard title="지배구조(G) 항목" value="17" unit="개" icon={Building2} iconColor="#D29922" />
      </div>

      <div className="bg-[#1A2F4E] border border-[#388BFD] rounded-lg p-4">
        <div className="text-sm font-semibold text-[#58A6FF] mb-1">K-ESG 목적</div>
        <p className="text-xs text-[#E6EDF3]">
          국내 기업들이 글로벌 ESG 평가기관(MSCI, FTSE Russell, S&P)의 평가 기준과 괴리를 줄이고,
          중소·중견기업도 활용 가능한 표준화된 자가진단 체계 제공. GRI, SASB, TCFD, ISO 26000 기준을
          통합·재구성한 한국형 프레임워크.
        </p>
      </div>

      <Tabs defaultValue="E">
        <TabsList>
          {kesGCategories.map(area => (
            <TabsTrigger key={area.area} value={area.area.charAt(0)}>
              <span style={{ color: area.color }}>{area.area}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {kesGCategories.map(area => (
          <TabsContent key={area.area} value={area.area.charAt(0)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {area.categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-[#161B22] border rounded-lg p-4"
                  style={{ borderColor: area.color + '40' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: area.color }} />
                    <h3 className="text-sm font-semibold text-[#E6EDF3]">{cat.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {cat.indicators.map((indicator, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5"
                          style={{ borderColor: area.color + '60', backgroundColor: area.color + '10' }}>
                          <div className="w-2 h-0.5 rounded" style={{ backgroundColor: area.color }} />
                        </div>
                        <span className="text-xs text-[#8B949E]">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
              <h4 className="text-xs font-semibold text-[#8B949E] mb-2">GreenOS 솔루션 연계</h4>
              <div className="text-xs text-[#E6EDF3] space-y-1">
                {area.area === '환경(E)' && (
                  <>
                    <div>• GreenOS BEMS: 에너지 사용량·온실가스 배출량 자동 측정 및 K-ESG 지표 자동 연계</div>
                    <div>• 탄소관리 플랫폼: Scope 1/2/3 자동 계산 → K-ESG 환경 성과 지표 원클릭 생성</div>
                  </>
                )}
                {area.area === '사회(S)' && (
                  <>
                    <div>• 안전·보건 데이터 자동 집계 및 K-ESG 사회 지표 보고서 생성</div>
                    <div>• 공급망 ESG 리스크 스캐너: 협력사 에너지·탄소 현황 원격 모니터링</div>
                  </>
                )}
                {area.area === '지배구조(G)' && (
                  <>
                    <div>• ESG 공시 자동화 플랫폼: K-ESG → KSSB(K-ISSB) 전환 지원</div>
                    <div>• 이사회 ESG 대시보드: 실시간 환경·사회 성과 보고</div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">주요 ESG 평가기관 프레임워크 비교</h3>
          <div className="space-y-2">
            {[
              { name: 'K-ESG', origin: '한국 산업부', focus: '국내 기업 자가진단', compat: 'GRI+SASB+TCFD' },
              { name: 'GRI Standards', origin: '네덜란드 GRI', focus: '지속가능경영보고서', compat: '국제 표준' },
              { name: 'TCFD', origin: '국제 FSB', focus: '기후 재무공시', compat: 'ISSB S2 기반' },
              { name: 'ISSB S1/S2', origin: '국제 IFRS', focus: '투자자 공시', compat: '2025~ 의무화 추진' },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between py-1.5 border-b border-[#21262D]">
                <div>
                  <div className="text-xs font-medium text-[#E6EDF3]">{item.name}</div>
                  <div className="text-[10px] text-[#6E7681]">{item.origin}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8B949E]">{item.focus}</div>
                  <Badge variant="outline" className="text-[10px] mt-0.5">{item.compat}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">K-ESG 도입 단계</h3>
          <div className="space-y-3">
            {[
              { step: '1단계', title: '기준정보 수집', desc: '에너지 사용량, 온실가스 배출량, 인원 현황 등 기초 데이터 확보', done: true },
              { step: '2단계', title: '자가진단 실시', desc: 'K-ESG 61개 지표 자가평가 및 현황 파악', done: true },
              { step: '3단계', title: '갭 분석', desc: '목표 수준 대비 현황 차이 분석 및 개선 우선순위 도출', done: false },
              { step: '4단계', title: '개선 실행', desc: '취약 항목 개선 계획 수립 및 이행', done: false },
              { step: '5단계', title: 'ESG 보고서 발간', desc: 'K-ESG 기반 지속가능경영보고서 작성·공시', done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  item.done ? 'bg-[#2EA043] text-white' : 'bg-[#21262D] text-[#6E7681]'
                }`}>
                  {item.step.slice(0, 1)}
                </div>
                <div>
                  <div className="text-xs font-medium text-[#E6EDF3]">{item.title}</div>
                  <div className="text-[10px] text-[#6E7681] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
