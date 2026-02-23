import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { policyTimeline } from '@/data/mock/policyData'
import { Calendar, Filter } from 'lucide-react'

type Category = 'all' | 'korea' | 'global' | 'eu'

const CATEGORY_CONFIG = {
  korea: { label: '한국', color: '#2EA043', bgColor: '#1A3F24' },
  global: { label: '글로벌', color: '#388BFD', bgColor: '#1A2F4E' },
  eu: { label: 'EU', color: '#A371F7', bgColor: '#2D1F47' },
}

export default function PolicyTimeline() {
  const [categoryFilter, setCategoryFilter] = useState<Category>('all')
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const allTags = [...new Set(policyTimeline.flatMap(p => p.tags))]

  const filtered = policyTimeline
    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
    .filter(p => !tagFilter || p.tags.includes(tagFilter))
    .sort((a, b) => a.date.localeCompare(b.date))

  const isUpcoming = (date: string) => new Date(date) > new Date('2026-02-22')

  return (
    <div className="space-y-6">
      <PageHeader
        title="정책 타임라인"
        description="한국·EU·글로벌 주요 에너지·기후·ESG 정책 일정"
      />

      <div className="flex flex-wrap gap-2 items-center">
        <Filter size={14} className="text-[#8B949E]" />
        {(['all', 'korea', 'global', 'eu'] as Category[]).map(c => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === c
                ? 'bg-[#21262D] text-[#E6EDF3]'
                : 'text-[#8B949E] hover:text-[#E6EDF3]'
            }`}
          >
            {c === 'all' ? '전체' : CATEGORY_CONFIG[c].label}
          </button>
        ))}
        <div className="w-px h-4 bg-[#30363D] mx-1" />
        {allTags.slice(0, 8).map(tag => (
          <button
            key={tag}
            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors border ${
              tagFilter === tag
                ? 'border-[#388BFD] text-[#388BFD] bg-[#1A2F4E]'
                : 'border-[#30363D] text-[#6E7681] hover:border-[#484F58]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[120px] top-0 bottom-0 w-px bg-[#30363D] hidden md:block" />

        <div className="space-y-4">
          {filtered.map((item, i) => {
            const cfg = CATEGORY_CONFIG[item.category]
            const upcoming = isUpcoming(item.date)
            return (
              <div key={item.id} className="flex flex-col md:flex-row gap-3 md:gap-6">
                {/* Date */}
                <div className="md:w-[120px] flex-shrink-0 flex md:flex-col md:items-end md:justify-center">
                  <div className="flex items-center gap-1.5 text-xs text-[#8B949E]">
                    <Calendar size={11} />
                    <span>{item.date}</span>
                  </div>
                  {upcoming && (
                    <span className="text-[10px] text-[#D29922] md:text-right mt-0.5 ml-2 md:ml-0">예정</span>
                  )}
                </div>

                {/* Dot on timeline */}
                <div className="hidden md:flex items-center justify-center w-5 flex-shrink-0 relative">
                  <div
                    className="w-3 h-3 rounded-full border-2 z-10"
                    style={{
                      backgroundColor: upcoming ? '#21262D' : cfg.color,
                      borderColor: cfg.color,
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-lg border p-3.5 transition-colors ${
                    upcoming ? 'border-dashed opacity-75' : ''
                  }`}
                  style={{ borderColor: upcoming ? cfg.color + '60' : cfg.color + '40', backgroundColor: upcoming ? '#0D1117' : cfg.bgColor + '80' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[#E6EDF3]">{item.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: cfg.bgColor, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#8B949E] mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#6E7681] hover:text-[#8B949E] transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
