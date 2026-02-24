import type { ProspectData } from '@/types'

export const salesProspects: ProspectData[] = [
  { id: 'p001', name: '국방부 직할부대', type: '공공기관', region: '경기', consumption_toe: 38400, carbon_intensity: 5.37, bems_installed: false, opportunity_score: 88, priority: 'high', stage: '잠재' },
  { id: 'p002', name: '제주국제공항', type: '공공기관', region: '제주', consumption_toe: 9800, carbon_intensity: 5.37, bems_installed: false, opportunity_score: 86, priority: 'high', stage: '잠재' },
  { id: 'p003', name: '국립암센터', type: '의료기관', region: '경기', consumption_toe: 13600, carbon_intensity: 5.36, bems_installed: false, opportunity_score: 84, priority: 'high', stage: '접촉' },
  { id: 'p004', name: '국방과학연구소', type: '연구기관', region: '대전', consumption_toe: 18600, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 83, priority: 'high', stage: '잠재' },
  { id: 'p005', name: '코레일(한국철도공사)', type: '공기업', region: '대전', consumption_toe: 28900, carbon_intensity: 5.38, bems_installed: false, opportunity_score: 82, priority: 'high', stage: '제안' },
  { id: 'p006', name: '삼성서울병원', type: '의료기관', region: '서울', consumption_toe: 7800, carbon_intensity: 5.36, bems_installed: false, opportunity_score: 79, priority: 'high', stage: '접촉' },
  { id: 'p007', name: '서울특별시청', type: '지방정부', region: '서울', consumption_toe: 24800, carbon_intensity: 5.34, bems_installed: false, opportunity_score: 79, priority: 'high', stage: '잠재' },
  { id: 'p008', name: '광주과학기술원', type: '대학', region: '광주', consumption_toe: 7200, carbon_intensity: 5.37, bems_installed: false, opportunity_score: 80, priority: 'high', stage: '접촉' },
  { id: 'p009', name: '한국도로공사', type: '공기업', region: '경북', consumption_toe: 21200, carbon_intensity: 5.37, bems_installed: false, opportunity_score: 77, priority: 'high', stage: '잠재' },
  { id: 'p010', name: '공항철도(주)', type: '교통', region: '인천', consumption_toe: 19800, carbon_intensity: 5.38, bems_installed: false, opportunity_score: 81, priority: 'high', stage: '접촉' },
  { id: 'p011', name: '부산항만공사', type: '공기업', region: '부산', consumption_toe: 17400, carbon_intensity: 5.36, bems_installed: false, opportunity_score: 76, priority: 'high', stage: '잠재' },
  { id: 'p012', name: '서울대학교', type: '대학', region: '서울', consumption_toe: 12200, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 78, priority: 'high', stage: '제안' },
  { id: 'p013', name: '한국항공우주연구원', type: '연구기관', region: '대전', consumption_toe: 8100, carbon_intensity: 5.36, bems_installed: false, opportunity_score: 75, priority: 'medium', stage: '잠재' },
  { id: 'p014', name: '경기도청', type: '지방정부', region: '경기', consumption_toe: 15400, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 74, priority: 'medium', stage: '접촉' },
  { id: 'p015', name: '한국토지주택공사', type: '공기업', region: '경남', consumption_toe: 14800, carbon_intensity: 5.34, bems_installed: false, opportunity_score: 72, priority: 'medium', stage: '잠재' },
  { id: 'p016', name: '세브란스병원', type: '의료기관', region: '서울', consumption_toe: 11200, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 82, priority: 'high', stage: '협상' },
  { id: 'p017', name: '한국연구재단', type: '연구기관', region: '대전', consumption_toe: 8800, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 73, priority: 'medium', stage: '접촉' },
  { id: 'p018', name: '한국수자원공사', type: '공기업', region: '대전', consumption_toe: 12800, carbon_intensity: 5.36, bems_installed: false, opportunity_score: 68, priority: 'medium', stage: '잠재' },
  { id: 'p019', name: '경찰청 교육원', type: '공공기관', region: '충남', consumption_toe: 8400, carbon_intensity: 5.35, bems_installed: false, opportunity_score: 64, priority: 'medium', stage: '잠재' },
  { id: 'p020', name: '한국원자력연구원', type: '연구기관', region: '대전', consumption_toe: 11600, carbon_intensity: 5.34, bems_installed: false, opportunity_score: 65, priority: 'medium', stage: '잠재' },

  // ── 사기업 (제조·중공업) ──────────────────────────────────
  { id: 'c001', name: 'POSCO 포항제철소', type: '사기업(철강)', region: '경북', consumption_toe: 145000, carbon_intensity: 8.42, bems_installed: false, opportunity_score: 92, priority: 'high', stage: '잠재' },
  { id: 'c002', name: '현대자동차 울산공장', type: '사기업(자동차)', region: '울산', consumption_toe: 98000, carbon_intensity: 7.18, bems_installed: false, opportunity_score: 90, priority: 'high', stage: '접촉' },
  { id: 'c003', name: '삼성전자 평택캠퍼스', type: '사기업(반도체)', region: '경기', consumption_toe: 182000, carbon_intensity: 5.92, bems_installed: true, opportunity_score: 71, priority: 'medium', stage: '잠재' },
  { id: 'c004', name: 'SK하이닉스 이천', type: '사기업(반도체)', region: '경기', consumption_toe: 134000, carbon_intensity: 5.87, bems_installed: false, opportunity_score: 85, priority: 'high', stage: '제안' },
  { id: 'c005', name: 'LG화학 여수공장', type: '사기업(화학)', region: '전남', consumption_toe: 112000, carbon_intensity: 9.14, bems_installed: false, opportunity_score: 89, priority: 'high', stage: '접촉' },
  { id: 'c006', name: '롯데케미칼 대산단지', type: '사기업(화학)', region: '충남', consumption_toe: 88000, carbon_intensity: 8.76, bems_installed: false, opportunity_score: 87, priority: 'high', stage: '잠재' },
  { id: 'c007', name: '현대제철 당진공장', type: '사기업(철강)', region: '충남', consumption_toe: 76000, carbon_intensity: 8.01, bems_installed: false, opportunity_score: 86, priority: 'high', stage: '잠재' },
  { id: 'c008', name: 'GS칼텍스 여수공장', type: '사기업(정유)', region: '전남', consumption_toe: 95000, carbon_intensity: 9.63, bems_installed: false, opportunity_score: 88, priority: 'high', stage: '접촉' },
  { id: 'c009', name: 'SK이노베이션 울산CLX', type: '사기업(정유)', region: '울산', consumption_toe: 102000, carbon_intensity: 9.41, bems_installed: false, opportunity_score: 87, priority: 'high', stage: '잠재' },
  { id: 'c010', name: '한화솔루션 울산', type: '사기업(화학)', region: '울산', consumption_toe: 54000, carbon_intensity: 7.82, bems_installed: false, opportunity_score: 82, priority: 'high', stage: '잠재' },

  // ── 사기업 (IT/데이터센터·유통) ──────────────────────────
  { id: 'c011', name: '이마트 전국 물류센터', type: '사기업(유통)', region: '경기', consumption_toe: 28600, carbon_intensity: 4.92, bems_installed: false, opportunity_score: 79, priority: 'high', stage: '잠재' },
  { id: 'c012', name: '카카오 IDC 판교', type: '사기업(IT/데이터센터)', region: '경기', consumption_toe: 31400, carbon_intensity: 5.12, bems_installed: false, opportunity_score: 83, priority: 'high', stage: '제안' },
  { id: 'c013', name: 'KT 목동 IDC', type: '사기업(IT/데이터센터)', region: '서울', consumption_toe: 22800, carbon_intensity: 5.34, bems_installed: false, opportunity_score: 80, priority: 'high', stage: '접촉' },
  { id: 'c014', name: '네이버 각(춘천) 데이터센터', type: '사기업(IT/데이터센터)', region: '강원', consumption_toe: 18900, carbon_intensity: 4.78, bems_installed: true, opportunity_score: 62, priority: 'medium', stage: '잠재' },
  { id: 'c015', name: '롯데쇼핑 본사/물류', type: '사기업(유통)', region: '서울', consumption_toe: 19200, carbon_intensity: 4.65, bems_installed: false, opportunity_score: 74, priority: 'medium', stage: '잠재' },

  // ── 사기업 (건설·부동산·유통) ────────────────────────────
  { id: 'c016', name: '삼성물산 래미안 단지군', type: '사기업(건설/부동산)', region: '서울', consumption_toe: 14600, carbon_intensity: 4.21, bems_installed: false, opportunity_score: 72, priority: 'medium', stage: '접촉' },
  { id: 'c017', name: '현대건설 힐스테이트 단지', type: '사기업(건설/부동산)', region: '경기', consumption_toe: 12400, carbon_intensity: 4.18, bems_installed: false, opportunity_score: 69, priority: 'medium', stage: '잠재' },
  { id: 'c018', name: 'GS리테일 본사·거점', type: '사기업(유통)', region: '서울', consumption_toe: 16800, carbon_intensity: 4.55, bems_installed: false, opportunity_score: 71, priority: 'medium', stage: '잠재' },

  // ── 사기업 (배터리·전기차소재) ───────────────────────────
  { id: 'c019', name: 'LG에너지솔루션 오창공장', type: '사기업(배터리)', region: '충북', consumption_toe: 78000, carbon_intensity: 6.12, bems_installed: false, opportunity_score: 88, priority: 'high', stage: '잠재' },
  { id: 'c020', name: '삼성SDI 천안공장', type: '사기업(배터리)', region: '충남', consumption_toe: 62000, carbon_intensity: 5.98, bems_installed: false, opportunity_score: 85, priority: 'high', stage: '접촉' },
  { id: 'c021', name: '포스코퓨처엠 광양', type: '사기업(배터리소재)', region: '전남', consumption_toe: 44000, carbon_intensity: 7.24, bems_installed: false, opportunity_score: 84, priority: 'high', stage: '잠재' },
  { id: 'c022', name: '에코프로비엠 포항', type: '사기업(배터리소재)', region: '경북', consumption_toe: 36000, carbon_intensity: 6.87, bems_installed: false, opportunity_score: 82, priority: 'high', stage: '잠재' },

  // ── 사기업 (조선·중공업·방산) ────────────────────────────
  { id: 'c023', name: '한국조선해양 울산', type: '사기업(조선)', region: '울산', consumption_toe: 92000, carbon_intensity: 7.63, bems_installed: false, opportunity_score: 89, priority: 'high', stage: '잠재' },
  { id: 'c024', name: '삼성중공업 거제조선소', type: '사기업(조선)', region: '경남', consumption_toe: 68000, carbon_intensity: 7.41, bems_installed: false, opportunity_score: 86, priority: 'high', stage: '잠재' },
  { id: 'c025', name: '두산에너빌리티 창원', type: '사기업(중공업)', region: '경남', consumption_toe: 55000, carbon_intensity: 6.94, bems_installed: false, opportunity_score: 84, priority: 'high', stage: '접촉' },
  { id: 'c026', name: '한화에어로스페이스 창원', type: '사기업(방산/항공)', region: '경남', consumption_toe: 32000, carbon_intensity: 6.55, bems_installed: false, opportunity_score: 79, priority: 'high', stage: '잠재' },

  // ── 사기업 (자동차 부품·완성차) ──────────────────────────
  { id: 'c027', name: '기아 소하리공장', type: '사기업(자동차)', region: '경기', consumption_toe: 52000, carbon_intensity: 6.82, bems_installed: false, opportunity_score: 83, priority: 'high', stage: '잠재' },
  { id: 'c028', name: '현대모비스 울산', type: '사기업(자동차부품)', region: '울산', consumption_toe: 29000, carbon_intensity: 6.14, bems_installed: false, opportunity_score: 77, priority: 'high', stage: '잠재' },
  { id: 'c029', name: 'LS일렉트릭 청주', type: '사기업(전기·전자)', region: '충북', consumption_toe: 21000, carbon_intensity: 5.48, bems_installed: false, opportunity_score: 75, priority: 'medium', stage: '잠재' },

  // ── 사기업 (물류·유통·식음료) ────────────────────────────
  { id: 'c030', name: 'CJ대한통운 메가허브', type: '사기업(물류)', region: '경기', consumption_toe: 24000, carbon_intensity: 4.86, bems_installed: false, opportunity_score: 76, priority: 'high', stage: '잠재' },
  { id: 'c031', name: '쿠팡 로켓물류센터', type: '사기업(물류)', region: '경기', consumption_toe: 27500, carbon_intensity: 4.74, bems_installed: false, opportunity_score: 78, priority: 'high', stage: '제안' },
  { id: 'c032', name: '오비맥주 이천공장', type: '사기업(식음료)', region: '경기', consumption_toe: 18200, carbon_intensity: 5.21, bems_installed: false, opportunity_score: 70, priority: 'medium', stage: '잠재' },
  { id: 'c033', name: '하이트진로 청주공장', type: '사기업(식음료)', region: '충북', consumption_toe: 15600, carbon_intensity: 5.07, bems_installed: false, opportunity_score: 67, priority: 'medium', stage: '잠재' },

  // ── 사기업 (IT 인프라·통신) ──────────────────────────────
  { id: 'c034', name: 'SK텔레콤 분당 IDC', type: '사기업(IT/데이터센터)', region: '경기', consumption_toe: 26400, carbon_intensity: 5.28, bems_installed: false, opportunity_score: 81, priority: 'high', stage: '잠재' },
  { id: 'c035', name: 'LG유플러스 평촌 IDC', type: '사기업(IT/데이터센터)', region: '경기', consumption_toe: 19800, carbon_intensity: 5.19, bems_installed: false, opportunity_score: 76, priority: 'high', stage: '잠재' },

  // ── 사기업 (섬유·화학·소재) ──────────────────────────────
  { id: 'c036', name: 'OCI 군산공장', type: '사기업(화학)', region: '전북', consumption_toe: 41000, carbon_intensity: 8.33, bems_installed: false, opportunity_score: 83, priority: 'high', stage: '잠재' },
  { id: 'c037', name: '코오롱인더스트리 구미', type: '사기업(소재/섬유)', region: '경북', consumption_toe: 23500, carbon_intensity: 6.61, bems_installed: false, opportunity_score: 74, priority: 'medium', stage: '잠재' },
  { id: 'c038', name: '효성첨단소재 전주', type: '사기업(소재/탄소섬유)', region: '전북', consumption_toe: 19600, carbon_intensity: 7.12, bems_installed: false, opportunity_score: 73, priority: 'medium', stage: '잠재' },
]

export const pipelineStages = ['잠재', '접촉', '제안', '협상', '완료'] as const
export type PipelineStage = typeof pipelineStages[number]
