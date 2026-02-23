export interface TariffStructure {
  category: string
  subcategory: string
  voltage: string
  base_rate_kw: number        // 원/kW/월
  energy_rate_low: number     // 원/kWh (경부하)
  energy_rate_mid: number     // 원/kWh (중간부하)
  energy_rate_peak: number    // 원/kWh (최대부하)
  fuel_adj_rate: number       // 연료비조정액 원/kWh
}

export const kepcoTariffs: TariffStructure[] = [
  {
    category: '산업용(을)',
    subcategory: '고압A (선택I)',
    voltage: '3.3~66kV',
    base_rate_kw: 6630,
    energy_rate_low: 61.0,
    energy_rate_mid: 93.5,
    energy_rate_peak: 116.7,
    fuel_adj_rate: 5.0,
  },
  {
    category: '산업용(을)',
    subcategory: '고압B (선택I)',
    voltage: '154kV 이상',
    base_rate_kw: 6310,
    energy_rate_low: 57.8,
    energy_rate_mid: 88.4,
    energy_rate_peak: 110.2,
    fuel_adj_rate: 5.0,
  },
  {
    category: '산업용(갑)',
    subcategory: '고압 (계시별)',
    voltage: '3.3~66kV',
    base_rate_kw: 7220,
    energy_rate_low: 65.2,
    energy_rate_mid: 98.6,
    energy_rate_peak: 145.8,
    fuel_adj_rate: 5.0,
  },
  {
    category: '일반용(을)',
    subcategory: '고압 (선택I)',
    voltage: '3.3~66kV',
    base_rate_kw: 7170,
    energy_rate_low: 67.4,
    energy_rate_mid: 101.8,
    energy_rate_peak: 150.4,
    fuel_adj_rate: 5.0,
  },
  {
    category: '일반용(갑)',
    subcategory: '저압',
    voltage: '220/380V',
    base_rate_kw: 6160,
    energy_rate_low: 91.2,
    energy_rate_mid: 120.6,
    energy_rate_peak: 191.6,
    fuel_adj_rate: 5.0,
  },
  {
    category: '교육용(을)',
    subcategory: '고압',
    voltage: '3.3~66kV',
    base_rate_kw: 5520,
    energy_rate_low: 56.1,
    energy_rate_mid: 74.2,
    energy_rate_peak: 106.8,
    fuel_adj_rate: 5.0,
  },
]

export const peakTimeSchedule = [
  { season: '여름', period: '6~8월', peak: '10:00~12:00, 13:00~17:00', mid: '09:00~10:00, 12:00~13:00, 17:00~23:00', low: '나머지' },
  { season: '봄·가을', period: '3~5월, 9~10월', peak: '없음', mid: '09:00~12:00, 13:00~17:00, 18:00~23:00', low: '나머지' },
  { season: '겨울', period: '11월~2월', peak: '09:00~12:00, 17:00~20:00', mid: '07:00~09:00, 12:00~17:00, 20:00~22:00', low: '나머지' },
]

export const tariffHistory = [
  { date: '2021-04', change: 0, cumulative: 108.4 },
  { date: '2022-04', change: 4.9, cumulative: 113.8 },
  { date: '2022-10', change: 7.4, cumulative: 121.4 },
  { date: '2023-01', change: 13.1, cumulative: 134.5 },
  { date: '2023-05', change: 8.0, cumulative: 142.5 },
  { date: '2023-11', change: 0, cumulative: 142.5 },
  { date: '2024-01', change: 0, cumulative: 142.5 },
  { date: '2024-10', change: 0, cumulative: 142.5 },
]
