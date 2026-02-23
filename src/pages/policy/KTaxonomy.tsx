import { PageHeader } from '@/components/shared/PageHeader'
import { KPICard } from '@/components/shared/KPICard'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Leaf, Building2, Zap, Recycle } from 'lucide-react'

const taxonomyData = {
  green: {
    label: '녹색부문',
    color: '#2EA043',
    bgColor: '#1A3F24',
    desc: '탄소중립·환경 개선에 기여하는 경제활동',
    categories: [
      { name: '온실가스 감축', activities: ['재생에너지 발전 (태양광·풍력·수력)', '청정수소 생산 및 공급', '전기차·수소차 제조', '건물 에너지효율 개선', '산업공정 전환'] },
      { name: '기후변화 적응', activities: ['기후 리스크 적응 인프라', '스마트 물 관리 시스템', '기후정보 서비스'] },
      { name: '물 및 폐기물', activities: ['수자원 효율화', '폐기물 재활용·재사용', '순환경제 촉진'] },
      { name: '생물다양성', activities: ['생태계 보전', '지속가능 농림어업', '오염물질 저감'] },
    ]
  },
  transition: {
    label: '전환부문',
    color: '#D29922',
    bgColor: '#3D2E0A',
    desc: '탄소중립 전환에 필요한 과도기적 경제활동',
    categories: [
      { name: 'LNG 발전', activities: ['천연가스 직접연소 발전 (한시적, 2030년까지)', 'LNG-수소 혼소 발전'] },
      { name: '원자력', activities: ['신규 원전 건설 (설계수명 60년 이상)', '기존 원전 계속 운전', '사용후핵연료 처리'] },
      { name: '전환 산업', activities: ['철강 수소환원제철 전환', '시멘트 탄소포집 공정'] },
    ]
  }
}

const comparisonEU = [
  { aspect: '법적 구속력', korea: '지침(가이드라인)', eu: '규정(Regulation)' },
  { aspect: '대상 기업', korea: '녹색채권 발행 기업 중심', eu: '모든 EU 역내 기업' },
  { aspect: '원자력 포함', korea: '전환부문 포함', eu: '보완적 활동 포함 (2022~)' },
  { aspect: 'LNG 포함', korea: '전환부문 포함 (한시)', eu: '전환활동 포함 (조건부)' },
  { aspect: '부정적 목록', korea: '미제시', eu: 'Do No Significant Harm 적용' },
]

export default function KTaxonomy() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="한국형 녹색분류체계 (K-Taxonomy)"
        description="환경부 고시 (2022.12) — 국내 녹색경제활동 분류 기준"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="녹색부문 경제활동" value="69" unit="개 활동" icon={Leaf} iconColor="#2EA043" />
        <KPICard title="전환부문 활동" value="6" unit="개 활동" icon={Zap} iconColor="#D29922" />
        <KPICard title="총 분류 활동" value="75" unit="개" icon={Building2} iconColor="#388BFD" />
        <KPICard title="시행일" value="2023.01" unit="부터" icon={Recycle} iconColor="#A371F7" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1A3F24] border border-[#2EA043] rounded-lg p-4">
          <div className="text-sm font-semibold text-[#3FB950] mb-1">6대 환경목표</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              '①온실가스 감축', '②기후변화 적응',
              '③물·해양 보전', '④자원순환',
              '⑤생물다양성', '⑥오염방지'
            ].map((goal, i) => (
              <div key={i} className="bg-[#0D1117] rounded px-2 py-1.5 text-xs text-[#E6EDF3]">{goal}</div>
            ))}
          </div>
        </div>
        <div className="bg-[#3D2E0A] border border-[#D29922] rounded-lg p-4">
          <div className="text-sm font-semibold text-[#E3B341] mb-2">4대 인정 기준</div>
          <div className="space-y-2 text-xs text-[#E6EDF3]">
            <div className="flex gap-2"><span className="text-[#D29922]">1.</span> 6대 환경목표 중 하나 이상에 <strong>기여</strong></div>
            <div className="flex gap-2"><span className="text-[#D29922]">2.</span> 나머지 5개 목표에 <strong>심각한 피해 없음</strong> (DNSH)</div>
            <div className="flex gap-2"><span className="text-[#D29922]">3.</span> <strong>최소 사회 안전장치</strong> 준수</div>
            <div className="flex gap-2"><span className="text-[#D29922]">4.</span> 기술 심사 기준 <strong>충족</strong></div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="green">
        <TabsList>
          <TabsTrigger value="green">녹색부문</TabsTrigger>
          <TabsTrigger value="transition">전환부문</TabsTrigger>
          <TabsTrigger value="compare">EU 택소노미 비교</TabsTrigger>
        </TabsList>

        <TabsContent value="green">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taxonomyData.green.categories.map((cat, i) => (
              <div key={i} className="bg-[#161B22] border border-[#2EA043]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#2EA043]" />
                  <h3 className="text-sm font-semibold text-[#E6EDF3]">{cat.name}</h3>
                </div>
                <div className="space-y-1.5">
                  {cat.activities.map((act, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2EA043] shrink-0" />
                      <span className="text-[#8B949E]">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transition">
          <div className="mb-3 bg-[#3D2E0A] border border-[#D29922] rounded-lg p-3">
            <p className="text-xs text-[#E3B341]">
              전환부문은 탄소중립으로 가는 과도기에 필요한 활동으로, 일정 조건 하에 한시적으로 인정됩니다.
              향후 기술 발전에 따라 인정 기준이 강화될 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {taxonomyData.transition.categories.map((cat, i) => (
              <div key={i} className="bg-[#161B22] border border-[#D29922]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-[#D29922]" />
                  <h3 className="text-sm font-semibold text-[#E6EDF3]">{cat.name}</h3>
                </div>
                <div className="space-y-1.5">
                  {cat.activities.map((act, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D29922] shrink-0" />
                      <span className="text-[#8B949E]">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#30363D]">
                  <th className="px-3 py-2.5 text-left text-[#8B949E]">비교 항목</th>
                  <th className="px-3 py-2.5 text-left text-[#2EA043]">K-Taxonomy (한국)</th>
                  <th className="px-3 py-2.5 text-left text-[#388BFD]">EU Taxonomy</th>
                </tr>
              </thead>
              <tbody>
                {comparisonEU.map((row, i) => (
                  <tr key={i} className="border-b border-[#21262D]">
                    <td className="px-3 py-2.5 text-[#8B949E] font-medium">{row.aspect}</td>
                    <td className="px-3 py-2.5 text-[#E6EDF3]">{row.korea}</td>
                    <td className="px-3 py-2.5 text-[#E6EDF3]">{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
