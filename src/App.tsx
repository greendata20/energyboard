import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

// Lazy-loaded pages
const DashboardOverview = lazy(() => import('@/pages/DashboardOverview'))

// Korea Energy
const RegionalConsumption = lazy(() => import('@/pages/korea-energy/RegionalConsumption'))
const BuildingTypeBreakdown = lazy(() => import('@/pages/korea-energy/BuildingTypeBreakdown'))
const PublicOrgRankings = lazy(() => import('@/pages/korea-energy/PublicOrgRankings'))
const TariffStructure = lazy(() => import('@/pages/korea-energy/TariffStructure'))
const CarbonEmissions = lazy(() => import('@/pages/korea-energy/CarbonEmissions'))

// Sales Intelligence
const ProspectList = lazy(() => import('@/pages/sales-intelligence/ProspectList'))
const CarbonIntensityMap = lazy(() => import('@/pages/sales-intelligence/CarbonIntensityMap'))
const Pipeline = lazy(() => import('@/pages/sales-intelligence/Pipeline'))

// Global Intelligence
const GlobalEnergyPrices = lazy(() => import('@/pages/global-intelligence/GlobalEnergyPrices'))
const ESGDisclosureStatus = lazy(() => import('@/pages/global-intelligence/ESGDisclosureStatus'))
const CBMATracker = lazy(() => import('@/pages/global-intelligence/CBMATracker'))
const CarbonNeutralityTargets = lazy(() => import('@/pages/global-intelligence/CarbonNeutralityTargets'))

// Renewables
const SolarMarket = lazy(() => import('@/pages/renewables/SolarMarket'))
const ESSMarket = lazy(() => import('@/pages/renewables/ESSMarket'))
const PPAMarket = lazy(() => import('@/pages/renewables/PPAMarket'))
const RECPrices = lazy(() => import('@/pages/renewables/RECPrices'))
const LCAAnalysis = lazy(() => import('@/pages/renewables/LCAAnalysis'))

// Policy
const KESGGuide = lazy(() => import('@/pages/policy/KESGGuide'))
const KTaxonomy = lazy(() => import('@/pages/policy/KTaxonomy'))
const RE100Korea = lazy(() => import('@/pages/policy/RE100Korea'))
const GHGTargets = lazy(() => import('@/pages/policy/GHGTargets'))
const PolicyTimeline = lazy(() => import('@/pages/policy/PolicyTimeline'))

function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-bg-elevated rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-bg-card rounded-lg border border-border" />
        ))}
      </div>
      <div className="h-64 bg-bg-card rounded-lg border border-border" />
    </div>
  )
}

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
      <div className="text-lg font-semibold mb-2">페이지를 불러올 수 없습니다</div>
      <div className="text-sm">잠시 후 다시 시도해주세요.</div>
    </div>
  )
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return <ErrorFallback />
    return this.props.children
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route
            index
            element={
              <ErrorBoundary>
                <Suspense fallback={<PageSkeleton />}>
                  <DashboardOverview />
                </Suspense>
              </ErrorBoundary>
            }
          />
          {/* Korea Energy */}
          <Route path="korea-energy">
            <Route path="regional" element={<Suspense fallback={<PageSkeleton />}><RegionalConsumption /></Suspense>} />
            <Route path="buildings" element={<Suspense fallback={<PageSkeleton />}><BuildingTypeBreakdown /></Suspense>} />
            <Route path="public-orgs" element={<Suspense fallback={<PageSkeleton />}><PublicOrgRankings /></Suspense>} />
            <Route path="tariffs" element={<Suspense fallback={<PageSkeleton />}><TariffStructure /></Suspense>} />
            <Route path="carbon" element={<Suspense fallback={<PageSkeleton />}><CarbonEmissions /></Suspense>} />
          </Route>
          {/* Sales Intelligence */}
          <Route path="sales-intelligence">
            <Route path="prospects" element={<Suspense fallback={<PageSkeleton />}><ProspectList /></Suspense>} />
            <Route path="carbon-map" element={<Suspense fallback={<PageSkeleton />}><CarbonIntensityMap /></Suspense>} />
            <Route path="pipeline" element={<Suspense fallback={<PageSkeleton />}><Pipeline /></Suspense>} />
          </Route>
          {/* Global Intelligence */}
          <Route path="global-intelligence">
            <Route path="prices" element={<Suspense fallback={<PageSkeleton />}><GlobalEnergyPrices /></Suspense>} />
            <Route path="esg-status" element={<Suspense fallback={<PageSkeleton />}><ESGDisclosureStatus /></Suspense>} />
            <Route path="cbam" element={<Suspense fallback={<PageSkeleton />}><CBMATracker /></Suspense>} />
            <Route path="targets" element={<Suspense fallback={<PageSkeleton />}><CarbonNeutralityTargets /></Suspense>} />
          </Route>
          {/* Renewables */}
          <Route path="renewables">
            <Route path="solar" element={<Suspense fallback={<PageSkeleton />}><SolarMarket /></Suspense>} />
            <Route path="ess" element={<Suspense fallback={<PageSkeleton />}><ESSMarket /></Suspense>} />
            <Route path="ppa" element={<Suspense fallback={<PageSkeleton />}><PPAMarket /></Suspense>} />
            <Route path="rec" element={<Suspense fallback={<PageSkeleton />}><RECPrices /></Suspense>} />
            <Route path="lca" element={<Suspense fallback={<PageSkeleton />}><LCAAnalysis /></Suspense>} />
          </Route>
          {/* Policy */}
          <Route path="policy">
            <Route path="kesg" element={<Suspense fallback={<PageSkeleton />}><KESGGuide /></Suspense>} />
            <Route path="ktaxonomy" element={<Suspense fallback={<PageSkeleton />}><KTaxonomy /></Suspense>} />
            <Route path="re100" element={<Suspense fallback={<PageSkeleton />}><RE100Korea /></Suspense>} />
            <Route path="ghg-targets" element={<Suspense fallback={<PageSkeleton />}><GHGTargets /></Suspense>} />
            <Route path="timeline" element={<Suspense fallback={<PageSkeleton />}><PolicyTimeline /></Suspense>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
