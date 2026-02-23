export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('ko-KR', { maximumFractionDigits: decimals })
}

export function formatGWh(gwh: number): string {
  if (gwh >= 1000) return `${formatNumber(gwh / 1000, 1)} TWh`
  return `${formatNumber(gwh, 1)} GWh`
}

export function formatTCO2(tco2: number): string {
  if (tco2 >= 1_000_000) return `${formatNumber(tco2 / 1_000_000, 2)} MtCO₂`
  if (tco2 >= 1000) return `${formatNumber(tco2 / 1000, 1)} ktCO₂`
  return `${formatNumber(tco2)} tCO₂`
}

export function formatKRW(won: number): string {
  if (won >= 100_000_000) return `${formatNumber(won / 100_000_000, 1)}억원`
  if (won >= 10_000) return `${formatNumber(won / 10_000, 1)}만원`
  return `${formatNumber(won)}원`
}

export function formatPercent(v: number, decimals = 1): string {
  return `${v.toFixed(decimals)}%`
}

export function colorScale(value: number, min: number, max: number, colors: string[]): string {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)))
  const idx = Math.floor(ratio * (colors.length - 1))
  return colors[Math.min(idx, colors.length - 1)]
}
