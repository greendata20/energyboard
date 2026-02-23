export interface RegionalData {
  sido: string
  code: string
  consumption_gwh: number
  yoy_change: number
  per_capita_kwh: number
  industrial_pct: number
  commercial_pct: number
  residential_pct: number
}

export interface BuildingTypeData {
  type: string
  consumption_gwh: number
  intensity_kwh_m2: number
  count: number
  avg_size_m2: number
}

export interface PublicOrgData {
  rank: number
  org_name: string
  ministry: string
  region: string
  consumption_toe: number
  consumption_gwh: number
  co2_tonne: number
  bems_installed: boolean
  yoy_change: number
  opportunity_score: number
}

export interface TariffData {
  type: string
  voltage: string
  base_charge_kw: number
  energy_charge_low: number
  energy_charge_mid: number
  energy_charge_high: number
  fuel_adj: number
}

export interface CarbonData {
  sector: string
  scope1_mtco2: number
  scope2_mtco2: number
  year: number
  target_2030: number
}

export interface ProspectData {
  id: string
  name: string
  type: string
  region: string
  consumption_toe: number
  carbon_intensity: number
  bems_installed: boolean
  opportunity_score: number
  priority: 'high' | 'medium' | 'low'
  contact?: string
  stage?: string
}

export interface GlobalEnergyPrice {
  country: string
  country_code: string
  price_usd_kwh: number
  currency: string
  year: number
  source: string
}

export interface ESGStatus {
  country: string
  country_code: string
  status: 'mandatory' | 'voluntary' | 'in_progress' | 'none'
  framework: string
  effective_year?: number
  notes: string
}

export interface RECPrice {
  month: string
  price_krw: number
  volume_rec: number
  multiplier: number
}

export interface PolicyItem {
  id: string
  date: string
  title: string
  description: string
  category: 'korea' | 'global' | 'eu'
  tags: string[]
}
