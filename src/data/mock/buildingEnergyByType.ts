import type { BuildingTypeData } from '@/types'

export const buildingEnergyByType: BuildingTypeData[] = [
  { type: '업무시설', consumption_gwh: 98420, intensity_kwh_m2: 182, count: 125400, avg_size_m2: 4320 },
  { type: '판매시설', consumption_gwh: 62840, intensity_kwh_m2: 298, count: 84200, avg_size_m2: 2500 },
  { type: '숙박시설', consumption_gwh: 28460, intensity_kwh_m2: 245, count: 32100, avg_size_m2: 3620 },
  { type: '의료시설', consumption_gwh: 24380, intensity_kwh_m2: 312, count: 8920, avg_size_m2: 8750 },
  { type: '교육시설', consumption_gwh: 18940, intensity_kwh_m2: 98, count: 21400, avg_size_m2: 9020 },
  { type: '문화집회시설', consumption_gwh: 12640, intensity_kwh_m2: 156, count: 15600, avg_size_m2: 5200 },
  { type: '공장/산업시설', consumption_gwh: 184200, intensity_kwh_m2: 425, count: 68400, avg_size_m2: 6340 },
]

export const buildingIntensityTrend = [
  { year: 2020, office: 195, retail: 318, hotel: 268, hospital: 336, school: 108 },
  { year: 2021, office: 191, retail: 312, hotel: 261, hospital: 328, school: 105 },
  { year: 2022, office: 188, retail: 306, hotel: 255, hospital: 321, school: 102 },
  { year: 2023, office: 185, retail: 301, hotel: 249, hospital: 316, school: 100 },
  { year: 2024, office: 182, retail: 298, hotel: 245, hospital: 312, school: 98 },
  { year: 2025, office: 179, retail: 294, hotel: 241, hospital: 307, school: 96 },
]
