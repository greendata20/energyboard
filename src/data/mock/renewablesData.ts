export const recPrices = [
  { month: '2024-01', price_krw: 42800, volume_rec: 182400, multiplier: 1.0 },
  { month: '2024-02', price_krw: 44200, volume_rec: 168900, multiplier: 1.0 },
  { month: '2024-03', price_krw: 46500, volume_rec: 195600, multiplier: 1.0 },
  { month: '2024-04', price_krw: 48200, volume_rec: 212400, multiplier: 1.0 },
  { month: '2024-05', price_krw: 51400, volume_rec: 238900, multiplier: 1.0 },
  { month: '2024-06', price_krw: 49800, volume_rec: 224600, multiplier: 1.0 },
  { month: '2024-07', price_krw: 47200, volume_rec: 198400, multiplier: 1.0 },
  { month: '2024-08', price_krw: 45600, volume_rec: 186200, multiplier: 1.0 },
  { month: '2024-09', price_krw: 43900, volume_rec: 174800, multiplier: 1.0 },
  { month: '2024-10', price_krw: 44800, volume_rec: 179600, multiplier: 1.0 },
  { month: '2024-11', price_krw: 46200, volume_rec: 191400, multiplier: 1.0 },
  { month: '2024-12', price_krw: 47600, volume_rec: 204800, multiplier: 1.0 },
]

export const solarData = [
  { year: 2020, capacity_gw: 14.8, new_gw: 4.1, lcoe_usd_mwh: 52, investment_bkrw: 12.4 },
  { year: 2021, capacity_gw: 19.0, new_gw: 4.2, lcoe_usd_mwh: 47, investment_bkrw: 14.2 },
  { year: 2022, capacity_gw: 23.6, new_gw: 4.6, lcoe_usd_mwh: 43, investment_bkrw: 16.1 },
  { year: 2023, capacity_gw: 28.5, new_gw: 4.9, lcoe_usd_mwh: 39, investment_bkrw: 18.4 },
  { year: 2024, capacity_gw: 33.8, new_gw: 5.3, lcoe_usd_mwh: 36, investment_bkrw: 20.8 },
  { year: 2025, capacity_gw: 39.6, new_gw: 5.8, lcoe_usd_mwh: 33, investment_bkrw: 23.4 },
]

export const solarByRegion = [
  { region: '전남', capacity_mw: 5840, share_pct: 17.3 },
  { region: '경북', capacity_mw: 5120, share_pct: 15.1 },
  { region: '충남', capacity_mw: 4680, share_pct: 13.8 },
  { region: '경기', capacity_mw: 3960, share_pct: 11.7 },
  { region: '전북', capacity_mw: 3840, share_pct: 11.4 },
  { region: '경남', capacity_mw: 2960, share_pct: 8.8 },
  { region: '충북', capacity_mw: 2480, share_pct: 7.3 },
  { region: '제주', capacity_mw: 1820, share_pct: 5.4 },
  { region: '강원', capacity_mw: 1640, share_pct: 4.9 },
  { region: '기타', capacity_mw: 1460, share_pct: 4.3 },
]

export const essData = [
  { year: 2020, capacity_mwh: 2840, power_system_mwh: 1240, commercial_mwh: 980, renewable_mwh: 620 },
  { year: 2021, capacity_mwh: 3960, power_system_mwh: 1680, commercial_mwh: 1420, renewable_mwh: 860 },
  { year: 2022, capacity_mwh: 5280, power_system_mwh: 2240, commercial_mwh: 1880, renewable_mwh: 1160 },
  { year: 2023, capacity_mwh: 7840, power_system_mwh: 3280, commercial_mwh: 2640, renewable_mwh: 1920 },
  { year: 2024, capacity_mwh: 10640, power_system_mwh: 4480, commercial_mwh: 3560, renewable_mwh: 2600 },
  { year: 2025, capacity_mwh: 13960, power_system_mwh: 5860, commercial_mwh: 4620, renewable_mwh: 3480 },
]

export const ppaData = [
  { year: 2022, ppa_contracts: 12, total_mw: 480, avg_price_kwh: 105, kepco_industrial_kwh: 142 },
  { year: 2023, ppa_contracts: 28, total_mw: 1240, avg_price_kwh: 98, kepco_industrial_kwh: 142 },
  { year: 2024, ppa_contracts: 64, total_mw: 2840, avg_price_kwh: 91, kepco_industrial_kwh: 142 },
  { year: 2025, ppa_contracts: 118, total_mw: 4960, avg_price_kwh: 86, kepco_industrial_kwh: 145 },
]

export const ppaByType = [
  { type: '태양광 직접 PPA', contracts: 38, mw: 1680 },
  { type: '풍력 직접 PPA', contracts: 14, mw: 720 },
  { type: '수상 태양광', contracts: 6, mw: 280 },
  { type: '혼합(복수전원)', contracts: 6, mw: 160 },
]
