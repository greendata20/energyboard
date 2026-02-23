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
]

export const pipelineStages = ['잠재', '접촉', '제안', '협상', '완료'] as const
export type PipelineStage = typeof pipelineStages[number]
