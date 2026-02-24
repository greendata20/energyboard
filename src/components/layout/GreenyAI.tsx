import { useState } from 'react'
import { MessageCircle, X, Sparkles, Send } from 'lucide-react'
import { cn } from '@/utils/cn'

export function GreenyAI() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all',
          open
            ? 'bg-bg-elevated border border-border text-text-secondary'
            : 'bg-primary text-white hover:bg-primary-hover'
        )}
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-22 right-6 z-40 w-80 bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-base">
            <div className="w-6 h-6 rounded-md bg-primary-muted flex items-center justify-center">
              <Sparkles size={12} className="text-primary" />
            </div>
            <div>
              <div className="text-xs font-semibold text-text-primary">Greeny AI</div>
              <div className="text-[10px] text-text-secondary">에너지 인텔리전스 어시스턴트</div>
            </div>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-muted flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={10} className="text-primary" />
              </div>
              <div className="flex-1 bg-bg-elevated rounded-lg px-3 py-2 text-xs text-text-primary">
                안녕하세요! Greeny AI입니다. 에너지 시장 데이터 분석, 영업 인텔리전스, ESG 정책 정보를 도와드릴 수 있습니다.
                <div className="mt-2 text-text-secondary">현재 AI 기능 연동 준비 중입니다.</div>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
                Coming Soon — GPT/Claude 연동 예정
              </span>
            </div>
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-bg-elevated rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="질문을 입력하세요..."
                disabled
                className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-muted outline-none disabled:cursor-not-allowed"
              />
              <button disabled className="text-text-muted">
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
