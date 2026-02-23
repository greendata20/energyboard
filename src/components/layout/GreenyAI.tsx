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
            ? 'bg-[#21262D] border border-[#30363D] text-[#8B949E]'
            : 'bg-[#2EA043] text-white hover:bg-[#3FB950]'
        )}
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-22 right-6 z-40 w-80 bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363D] bg-[#0D1117]">
            <div className="w-6 h-6 rounded-md bg-[#1A3F24] flex items-center justify-center">
              <Sparkles size={12} className="text-[#2EA043]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#E6EDF3]">Greeny AI</div>
              <div className="text-[10px] text-[#8B949E]">에너지 인텔리전스 어시스턴트</div>
            </div>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1A3F24] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={10} className="text-[#2EA043]" />
              </div>
              <div className="flex-1 bg-[#21262D] rounded-lg px-3 py-2 text-xs text-[#E6EDF3]">
                안녕하세요! Greeny AI입니다. 에너지 시장 데이터 분석, 영업 인텔리전스, ESG 정책 정보를 도와드릴 수 있습니다.
                <div className="mt-2 text-[#8B949E]">현재 AI 기능 연동 준비 중입니다.</div>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-[#6E7681] bg-[#21262D] px-2 py-0.5 rounded-full">
                Coming Soon — GPT/Claude 연동 예정
              </span>
            </div>
          </div>

          <div className="p-3 border-t border-[#30363D]">
            <div className="flex items-center gap-2 bg-[#21262D] rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="질문을 입력하세요..."
                disabled
                className="flex-1 bg-transparent text-xs text-[#E6EDF3] placeholder:text-[#6E7681] outline-none disabled:cursor-not-allowed"
              />
              <button disabled className="text-[#6E7681]">
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
