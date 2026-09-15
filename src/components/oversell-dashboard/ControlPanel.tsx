import { Pause, Play, RotateCcw, SkipBack, SkipForward, Zap } from 'lucide-react';
import { MODE_LABELS } from './constants';
import type { SimulationMode } from './types';

const MODES: SimulationMode[] = ['none', 'setnx', 'lua'];

type ControlPanelProps = {
  mode: SimulationMode;
  onModeChange: (mode: SimulationMode) => void;
  onRunAttempt: () => void;
  canRunAttempt: boolean;
  currentStep: number;
  stepCount: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onReset: () => void;
  seatLocked: boolean;
  onConfirmPayment: () => void;
};

export function ControlPanel({
  mode,
  onModeChange,
  onRunAttempt,
  canRunAttempt,
  currentStep,
  stepCount,
  onPrevStep,
  onNextStep,
  isAutoPlaying,
  onToggleAutoPlay,
  onReset,
  seatLocked,
  onConfirmPayment,
}: ControlPanelProps) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">保護機制</p>
        <div className="grid grid-cols-1 gap-2">
          {MODES.map((item) => (
            <button
              className={`rounded-md border px-3 py-2 text-left transition ${
                mode === item
                  ? 'border-sky-400 bg-sky-500/10 text-sky-300'
                  : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
              key={item}
              onClick={() => onModeChange(item)}
              type="button"
            >
              <span className="block text-sm font-bold">{MODE_LABELS[item].title}</span>
              <span className="block text-[11px] text-slate-500">{MODE_LABELS[item].subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-400">
          <span>併發模擬器</span>
          <span className="text-slate-300">2 人同時搶票</span>
        </div>
        <button
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canRunAttempt}
          onClick={onRunAttempt}
          type="button"
        >
          <Zap size={16} />
          發起搶票模擬
        </button>
        {seatLocked ? (
          <button
            className="mt-2 w-full rounded-md border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
            onClick={onConfirmPayment}
            type="button"
          >
            模擬付款完成
          </button>
        ) : null}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-400">
          <span>步驟播放器</span>
          <span className="text-slate-300">
            {currentStep + 1} / {stepCount}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="flex items-center justify-center rounded-md border border-slate-700 bg-slate-950 py-2 text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
            disabled={currentStep === 0}
            onClick={onPrevStep}
            title="上一步"
            type="button"
          >
            <SkipBack size={16} />
          </button>
          <button
            className="flex items-center justify-center rounded-md border border-slate-700 bg-slate-950 py-2 text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
            disabled={currentStep === stepCount - 1}
            onClick={onNextStep}
            title="下一步"
            type="button"
          >
            <SkipForward size={16} />
          </button>
          <button
            className="flex items-center justify-center rounded-md border border-slate-700 bg-slate-950 py-2 text-slate-300 transition hover:border-slate-500"
            onClick={onToggleAutoPlay}
            title={isAutoPlaying ? '暫停' : '自動播放'}
            type="button"
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="flex items-center justify-center rounded-md border border-slate-700 bg-slate-950 py-2 text-slate-300 transition hover:border-slate-500"
            onClick={onReset}
            title="重設"
            type="button"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
