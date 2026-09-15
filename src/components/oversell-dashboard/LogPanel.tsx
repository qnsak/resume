import { useEffect, useRef } from 'react';
import type { LogEntry } from './types';

const TAG_STYLES: Record<LogEntry['tag'], string> = {
  INFO: 'border-sky-500/40 bg-sky-500/15 text-sky-300',
  SUCCESS: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
  FAIL: 'border-rose-500/40 bg-rose-500/15 text-rose-300',
  EXPIRE: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
};

export function LogPanel({ logs }: { logs: LogEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div className="flex h-64 flex-col rounded-lg border border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-400">
        Payload &amp; Log
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3 font-mono text-[11px]" ref={scrollRef}>
        {logs.length === 0 ? (
          <p className="text-slate-600">尚無紀錄，點擊「發起併發搶位」開始模擬。</p>
        ) : (
          logs.map((log) => (
            <div className="rounded border border-slate-800/80 bg-slate-900/60 p-2" key={log.id}>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">{log.time}</span>
                <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${TAG_STYLES[log.tag]}`}>
                  {log.tag}
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
              <p className="mt-1 break-all text-slate-500">{log.payload}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
