export const SIDO_LIST = [
  { code: '11', name: '서울', shortName: '서울' },
  { code: '26', name: '부산', shortName: '부산' },
  { code: '27', name: '대구', shortName: '대구' },
  { code: '28', name: '인천', shortName: '인천' },
  { code: '29', name: '광주', shortName: '광주' },
  { code: '30', name: '대전', shortName: '대전' },
  { code: '31', name: '울산', shortName: '울산' },
  { code: '36', name: '세종', shortName: '세종' },
  { code: '41', name: '경기', shortName: '경기' },
  { code: '43', name: '충북', shortName: '충북' },
  { code: '44', name: '충남', shortName: '충남' },
  { code: '45', name: '전북', shortName: '전북' },
  { code: '46', name: '전남', shortName: '전남' },
  { code: '47', name: '경북', shortName: '경북' },
  { code: '48', name: '경남', shortName: '경남' },
  { code: '50', name: '제주', shortName: '제주' },
  { code: '51', name: '강원', shortName: '강원' },
]

export const NAV_ITEMS = [
  {
    label: '대시보드',
    path: '/',
    icon: 'LayoutDashboard',
    children: [],
  },
  {
    label: '한국 에너지',
    path: '/korea-energy',
    icon: 'Zap',
    children: [
      { label: '시도별 전력소비', path: '/korea-energy/regional' },
      { label: '건물유형별 사용량', path: '/korea-energy/buildings' },
      { label: '공공기관 에너지 순위', path: '/korea-energy/public-orgs' },
      { label: '한전 요금체계', path: '/korea-energy/tariffs' },
      { label: '탄소배출 현황', path: '/korea-energy/carbon' },
    ],
  },
  {
    label: '영업 인텔리전스',
    path: '/sales-intelligence',
    icon: 'Target',
    children: [
      { label: '영업 대상 목록', path: '/sales-intelligence/prospects' },
      { label: '탄소집약도 지도', path: '/sales-intelligence/carbon-map' },
      { label: '영업 파이프라인', path: '/sales-intelligence/pipeline' },
    ],
  },
  {
    label: '글로벌 인텔리전스',
    path: '/global-intelligence',
    icon: 'Globe',
    children: [
      { label: '국가별 에너지가격', path: '/global-intelligence/prices' },
      { label: 'ESG 공시 현황', path: '/global-intelligence/esg-status' },
      { label: 'CBAM 트래커', path: '/global-intelligence/cbam' },
      { label: '탄소중립 목표', path: '/global-intelligence/targets' },
    ],
  },
  {
    label: '재생에너지',
    path: '/renewables',
    icon: 'Sun',
    children: [
      { label: '태양광 시장', path: '/renewables/solar' },
      { label: '에너지저장장치(ESS)', path: '/renewables/ess' },
      { label: '전력구매계약(PPA)', path: '/renewables/ppa' },
      { label: 'REC 가격 현황', path: '/renewables/rec' },
      { label: 'LCA 전과정평가', path: '/renewables/lca' },
    ],
  },
  {
    label: '정책·제도',
    path: '/policy',
    icon: 'FileText',
    children: [
      { label: 'K-ESG 가이드라인', path: '/policy/kesg' },
      { label: '한국형 녹색분류체계', path: '/policy/ktaxonomy' },
      { label: 'RE100 한국 기업', path: '/policy/re100' },
      { label: '온실가스 감축목표', path: '/policy/ghg-targets' },
      { label: '정책 타임라인', path: '/policy/timeline' },
    ],
  },
]

export const CHART_COLORS = {
  primary: '#2EA043',
  electric: '#388BFD',
  amber: '#D29922',
  danger: '#DA3633',
  purple: '#A371F7',
  teal: '#39C5CF',
  grid: '#30363D',
  text: '#8B949E',
}

export const MONTHS_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
