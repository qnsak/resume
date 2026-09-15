import { ArrowLeft } from 'lucide-react';
import { ArchitectureFlow } from './ArchitectureFlow';
import { ControlPanel } from './ControlPanel';
import { LogPanel } from './LogPanel';
import { useOversellSimulation } from './useOversellSimulation';

const OUTCOME_STYLES = {
  success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  failed: 'border-rose-500/50 bg-rose-500/10 text-rose-300',
};

export function OverbookingDashboard({ onBack }: { onBack: () => void }) {
  const sim = useOversellSimulation();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-sky-300"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={16} />
          返回履歷
        </button>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-400">Interactive System Design</p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">售票系統防重複買位 Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            展示售票系統在高併發場景下，如何透過 Redis 分散式鎖與 Lua 腳本防止重複鎖定／購買同一座位。切換右側的保護機制、發起兩人同時搶票，觀察系統流向與底層指令的即時變化。
          </p>
        </div>

        {sim.overbooked ? (
          <div className="rounded-lg border border-rose-500 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-300">
            ❌ Overbooking Detected！2 筆併發請求同時買到座位 A1，缺乏原子性保護導致資料不一致。
          </div>
        ) : null}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">系統架構圖</p>
            <p className="text-xs text-slate-500">{sim.step.title}</p>
          </div>
          <ArchitectureFlow holdCountdown={sim.holdCountdown} mode={sim.mode} requests={sim.requests} step={sim.step} />
          <p className="mt-2 text-xs leading-5 text-slate-500">{sim.step.description}</p>
        </div>

        {sim.requests.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">併發請求結果</p>
            <div className="flex flex-wrap gap-2">
              {sim.requests
                .slice()
                .sort((a, b) => a.index - b.index)
                .map((request) => (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${OUTCOME_STYLES[request.outcome]}`}
                    key={request.id}
                  >
                    Thread #{request.index + 1} · {request.message}
                  </span>
                ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-start">
          <LogPanel logs={sim.logs} />

          <ControlPanel
            canRunAttempt={sim.canRunAttempt}
            currentStep={sim.currentStep}
            isAutoPlaying={sim.isAutoPlaying}
            mode={sim.mode}
            onConfirmPayment={sim.confirmPayment}
            onModeChange={sim.setMode}
            onNextStep={sim.nextStep}
            onPrevStep={sim.prevStep}
            onReset={sim.reset}
            onRunAttempt={sim.runConcurrentAttempt}
            onToggleAutoPlay={sim.toggleAutoPlay}
            seatLocked={sim.seatStatus === 'locked'}
            stepCount={sim.steps.length}
          />
        </div>
      </div>
    </main>
  );
}
