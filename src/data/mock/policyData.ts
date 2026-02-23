import type { PolicyItem } from '@/types'

export const policyTimeline: PolicyItem[] = [
  { id: 'p001', date: '2021-10', title: '2030 NDC 상향 발표', description: '2030년 온실가스 40% 감축 목표 (2018년 대비). 기존 26.3%에서 40%로 상향.', category: 'korea', tags: ['NDC', '온실가스', '탄소중립'] },
  { id: 'p002', date: '2021-09', title: '탄소중립기본법 제정', description: '2050년 탄소중립을 법제화한 세계 14번째 국가. 탄소중립녹색성장위원회 설치.', category: 'korea', tags: ['탄소중립', '법제화'] },
  { id: 'p003', date: '2022-03', title: 'K-ESG 가이드라인 발표', description: '산업부·환경부 공동 발표. 환경(E), 사회(S), 지배구조(G) 61개 지표 제시.', category: 'korea', tags: ['ESG', 'K-ESG'] },
  { id: 'p004', date: '2022-12', title: '한국형 녹색분류체계(K-Taxonomy) 시행', description: '녹색경제활동 7개 분야 69개 항목 분류. EU 택소노미 대응.', category: 'korea', tags: ['K-Taxonomy', '녹색금융'] },
  { id: 'p005', date: '2023-01', title: '전기요금 13.1% 인상', description: '연료비 상승 및 한전 재무 개선을 위한 대규모 요금 인상.', category: 'korea', tags: ['전기요금', 'KEPCO'] },
  { id: 'p006', date: '2023-07', title: '재생에너지 확산 전략 발표', description: '2030년 재생에너지 비중 21.6% 목표. 2038년까지 석탄발전 전면 폐지 추진.', category: 'korea', tags: ['재생에너지', '에너지전환'] },
  { id: 'p007', date: '2024-01', title: '제11차 전력수급기본계획 초안', description: '2038년까지 원전 33기 체제 유지. 재생에너지 비중 확대 및 무탄소 전원 강조.', category: 'korea', tags: ['전력수급', '원전', '재생에너지'] },
  { id: 'p008', date: '2026-01', title: 'ESG 공시 의무화 (예정)', description: '코스피 200 기업 ESG 공시 의무화 시작 (K-ISSB 기준).', category: 'korea', tags: ['ESG공시', 'KSSB'] },
  { id: 'p009', date: '2023-10', title: 'EU CBAM 전환기간 시작', description: '탄소국경조정제도(CBAM) 전환기간 시작. 철강·알루미늄·시멘트·비료·전기·수소 6개 품목.', category: 'eu', tags: ['CBAM', '탄소국경세'] },
  { id: 'p010', date: '2026-01', title: 'EU CBAM 본격 시행 (예정)', description: '전환기간 종료 후 실제 탄소비용 부과 시작.', category: 'eu', tags: ['CBAM', 'EU ETS'] },
  { id: 'p011', date: '2024-01', title: 'EU CSRD 시행', description: '기업지속가능성보고지침(CSRD) 발효. 500인 이상 기업 2025년부터 순차 의무화.', category: 'eu', tags: ['CSRD', 'ESG공시'] },
  { id: 'p012', date: '2025-01', title: 'IFRS S1/S2 글로벌 확산', description: '국제지속가능성기준위원회(ISSB) 기준 IFRS S1/S2 각국 도입 가속화.', category: 'global', tags: ['ISSB', 'IFRS', 'ESG공시'] },
  { id: 'p013', date: '2030-12', title: '한국 2030 NDC 목표 연도', description: '2030년 국가온실가스감축목표 달성 검증 시점. 2018년 대비 40% 감축 목표.', category: 'korea', tags: ['NDC', '2030목표'] },
  { id: 'p014', date: '2050-12', title: '탄소중립 목표 연도', description: '대한민국 2050 탄소중립 선언. 순배출량 제로 달성 목표.', category: 'korea', tags: ['탄소중립', '2050'] },
]

export const kesGCategories = [
  {
    area: '환경(E)',
    color: '#2EA043',
    categories: [
      { name: '환경경영 목표', indicators: ['온실가스 감축 목표', '에너지 절감 목표', '수자원 절약 목표'] },
      { name: '환경성과 관리', indicators: ['온실가스 배출량', '에너지 사용량', '용수 사용량', '폐기물 발생량'] },
      { name: '환경 R&D', indicators: ['친환경 R&D 투자', '친환경 인증'] },
    ],
  },
  {
    area: '사회(S)',
    color: '#388BFD',
    categories: [
      { name: '노동', indicators: ['정규직 비율', '자발적 이직률', '안전보건 관리체계'] },
      { name: '공급망', indicators: ['공급망 ESG 리스크 관리', '협력사 ESG 지원'] },
      { name: '사회공헌', indicators: ['사회공헌 활동 지출', '정보보호'] },
    ],
  },
  {
    area: '지배구조(G)',
    color: '#D29922',
    categories: [
      { name: '이사회', indicators: ['이사회 내 ESG 안건 포함', '사외이사 비율', '대표이사·이사회 의장 분리'] },
      { name: '윤리경영', indicators: ['윤리규범 위반 사항', '반부패 정책'] },
      { name: '정보공개', indicators: ['ESG 정보 공시', '공급망 관리'] },
    ],
  },
]

export const re100Companies = [
  { company: '삼성전자', sector: '반도체/전자', joined_year: 2023, target_year: 2050, current_pct: 38, region: 'Korea', status: 'active' },
  { company: 'SK하이닉스', sector: '반도체', joined_year: 2022, target_year: 2050, current_pct: 25, region: 'Korea', status: 'active' },
  { company: 'LG에너지솔루션', sector: '배터리', joined_year: 2022, target_year: 2040, current_pct: 52, region: 'Korea', status: 'active' },
  { company: 'SK텔레콤', sector: '통신', joined_year: 2021, target_year: 2040, current_pct: 45, region: 'Korea', status: 'active' },
  { company: '현대자동차', sector: '자동차', joined_year: 2023, target_year: 2045, current_pct: 15, region: 'Korea', status: 'active' },
  { company: 'POSCO홀딩스', sector: '철강', joined_year: 2023, target_year: 2050, current_pct: 8, region: 'Korea', status: 'active' },
  { company: 'KB금융그룹', sector: '금융', joined_year: 2022, target_year: 2040, current_pct: 62, region: 'Korea', status: 'active' },
  { company: '신한금융그룹', sector: '금융', joined_year: 2022, target_year: 2040, current_pct: 58, region: 'Korea', status: 'active' },
  { company: 'KT&G', sector: '식음료', joined_year: 2021, target_year: 2035, current_pct: 72, region: 'Korea', status: 'active' },
  { company: '롯데케미칼', sector: '화학', joined_year: 2023, target_year: 2050, current_pct: 12, region: 'Korea', status: 'active' },
  { company: 'SK이노베이션', sector: '에너지', joined_year: 2022, target_year: 2040, current_pct: 28, region: 'Korea', status: 'active' },
  { company: '한화솔루션', sector: '태양광/화학', joined_year: 2021, target_year: 2035, current_pct: 65, region: 'Korea', status: 'active' },
]

export const ghgTargets = [
  { sector: '발전·에너지', baseline_mtco2: 269.6, target_mtco2: 145.9, reduction_pct: 45.9, current_mtco2: 189.4 },
  { sector: '산업', baseline_mtco2: 260.5, target_mtco2: 222.6, reduction_pct: 14.5, current_mtco2: 218.6 },
  { sector: '수송', baseline_mtco2: 98.1, target_mtco2: 61.0, reduction_pct: 37.8, current_mtco2: 101.5 },
  { sector: '건물', baseline_mtco2: 52.1, target_mtco2: 35.0, reduction_pct: 32.8, current_mtco2: 21.8 },
  { sector: '농축수산', baseline_mtco2: 24.7, target_mtco2: 18.0, reduction_pct: 27.1, current_mtco2: 22.6 },
  { sector: '폐기물', baseline_mtco2: 17.1, target_mtco2: 9.1, reduction_pct: 46.8, current_mtco2: 16.1 },
]
