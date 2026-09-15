import { useCallback, useEffect, useRef, useState } from 'react';
import { HOLD_TTL_SECONDS, STEP_DEFINITIONS, THREAD_COUNT } from './constants';
import type { LogEntry, LogTag, RequestThread, SeatStatus, SimulationMode } from './types';

let logCounter = 0;
function nextLogId() {
  logCounter += 1;
  return `log-${logCounter}`;
}

function timeNow() {
  return new Date().toLocaleTimeString('zh-TW', { hour12: false });
}

const AUTOPLAY_STEP_INTERVAL_MS = 2200;
const RUN_SETTLE_DELAY_MS = 320;

export function useOversellSimulation() {
  const [mode, setModeState] = useState<SimulationMode>('none');
  const [currentStep, setCurrentStep] = useState(0);
  const [seatStatus, setSeatStatus] = useState<SeatStatus>('available');
  const [requests, setRequests] = useState<RequestThread[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [holdCountdown, setHoldCountdown] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [overbooked, setOverbooked] = useState(false);

  const timeoutsRef = useRef<number[]>([]);
  const firedForStepRef = useRef(-1);

  const steps = STEP_DEFINITIONS[mode];

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const pushLog = useCallback((tag: LogTag, message: string, payload: string) => {
    setLogs((current) => [...current, { id: nextLogId(), time: timeNow(), tag, message, payload }]);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setCurrentStep(0);
    setSeatStatus('available');
    setRequests([]);
    setLogs([]);
    setHoldCountdown(null);
    setIsRunning(false);
    setOverbooked(false);
  }, [clearTimers]);

  const setMode = useCallback(
    (nextMode: SimulationMode) => {
      setIsAutoPlaying(false);
      firedForStepRef.current = -1;
      setModeState(nextMode);
      reset();
    },
    [reset],
  );

  const nextStep = useCallback(() => {
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((current) => Math.max(current - 1, 0));
  }, []);

  const runConcurrentAttempt = useCallback(() => {
    if (isRunning) return;

    clearTimers();
    setIsRunning(true);
    setRequests([]);
    setOverbooked(false);
    setHoldCountdown(null);
    setSeatStatus('available');

    pushLog('INFO', `發起 ${THREAD_COUNT} 個併發請求搶座位 A1`, `POST /api/seats/A1/reserve  x${THREAD_COUNT}`);

    const arrivals = Array.from({ length: THREAD_COUNT }, (_, index) => ({
      index,
      requestId: `req-${Date.now().toString(36)}-${index}`,
      arrival: Math.random() * 150,
    })).sort((a, b) => a.arrival - b.arrival);

    if (mode === 'none') {
      arrivals.forEach(({ index, requestId, arrival }) => {
        schedule(() => {
          setRequests((current) => [
            ...current,
            { id: requestId, index, outcome: 'success', message: '直接寫入售出（無鎖保護）' },
          ]);
          setSeatStatus('sold');
          pushLog(
            'SUCCESS',
            `Thread #${index + 1} 寫入成功，座位 A1 標記為已售出`,
            `UPDATE seats SET status='sold', holder='${requestId}' WHERE seat='A1'`,
          );
        }, arrival + 120);
      });

      schedule(() => {
        setIsRunning(false);
        setOverbooked(true);
        pushLog(
          'FAIL',
          `❌ Overbooking Detected! ${THREAD_COUNT} 筆請求同時把同一個座位標記為售出`,
          `SELECT COUNT(*) FROM order_logs WHERE seat='A1' AND status='sold' -> ${THREAD_COUNT}`,
        );
      }, RUN_SETTLE_DELAY_MS);

      return;
    }

    arrivals.forEach(({ index, requestId, arrival }, order) => {
      const isWinner = order === 0;
      const command =
        mode === 'setnx'
          ? `SET lock:seat:A1 ${requestId} NX EX 10`
          : `EVAL atomic_lock_and_hold.lua KEYS[1]=seat:A1 ARGV[1]=${requestId} ARGV[2]=10`;

      schedule(() => {
        if (isWinner) {
          setRequests((current) => [
            ...current,
            { id: requestId, index, outcome: 'success', message: '取得鎖，繼續建立訂單' },
          ]);
          pushLog('SUCCESS', `Thread #${index + 1} 取得鎖`, `${command} -> ${mode === 'setnx' ? 'OK' : '1 (acquired)'}`);

          if (mode === 'setnx') {
            setSeatStatus('sold');
            pushLog(
              'SUCCESS',
              `Thread #${index + 1} 寫入訂單，座位 A1 售出`,
              `UPDATE seats SET status='sold', holder='${requestId}' WHERE seat='A1'`,
            );
          } else {
            setSeatStatus('locked');
            setHoldCountdown(HOLD_TTL_SECONDS);
            pushLog(
              'INFO',
              `建立待付款訂單，暫扣 A1，TTL=${HOLD_TTL_SECONDS}s`,
              `INSERT INTO orders (seat, holder, status, ttl) VALUES ('A1', '${requestId}', 'pending', ${HOLD_TTL_SECONDS})`,
            );
          }
        } else {
          setRequests((current) => [
            ...current,
            { id: requestId, index, outcome: 'failed', message: '🛑 Lock Acquisition Failed' },
          ]);
          pushLog(
            'FAIL',
            `Thread #${index + 1} 取得鎖失敗`,
            `${command} -> ${mode === 'setnx' ? '(nil)' : '0 (already held)'}`,
          );
        }
      }, arrival + 120);
    });

    schedule(() => setIsRunning(false), RUN_SETTLE_DELAY_MS);
  }, [clearTimers, isRunning, mode, pushLog, schedule]);

  const confirmPayment = useCallback(() => {
    if (seatStatus !== 'locked') return;
    setHoldCountdown(null);
    setSeatStatus('sold');
    pushLog('SUCCESS', '✅ 付款完成，座位 A1 確定售出', `UPDATE orders SET status='paid' WHERE seat='A1'`);
  }, [pushLog, seatStatus]);

  useEffect(() => {
    if (holdCountdown === null || seatStatus !== 'locked') return;

    if (holdCountdown <= 0) {
      setSeatStatus('available');
      setHoldCountdown(null);
      pushLog('EXPIRE', '⏰ 暫扣逾時，Redis Key 過期，座位 A1 自動釋放', `TTL seat:A1 -> -2 (expired, auto-released)`);
      return;
    }

    const id = window.setTimeout(() => {
      setHoldCountdown((value) => (value === null ? null : value - 1));
    }, 1000);

    return () => window.clearTimeout(id);
  }, [holdCountdown, pushLog, seatStatus]);

  useEffect(() => {
    if (!isAutoPlaying) return undefined;

    const id = window.setInterval(() => {
      setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
    }, AUTOPLAY_STEP_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [isAutoPlaying, steps.length]);

  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    if (currentStep !== steps.length - 1) return undefined;
    if (firedForStepRef.current === currentStep) return undefined;

    firedForStepRef.current = currentStep;
    const id = window.setTimeout(() => {
      runConcurrentAttempt();
      setIsAutoPlaying(false);
    }, 500);

    return () => window.clearTimeout(id);
  }, [currentStep, isAutoPlaying, runConcurrentAttempt, steps.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((current) => !current);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const canRunAttempt = !isRunning && !(mode === 'lua' && seatStatus === 'locked');

  return {
    canRunAttempt,
    confirmPayment,
    currentStep,
    holdCountdown,
    isAutoPlaying,
    isRunning,
    logs,
    mode,
    nextStep,
    overbooked,
    prevStep,
    requests,
    reset,
    runConcurrentAttempt,
    seatStatus,
    setMode,
    step: steps[currentStep],
    steps,
    toggleAutoPlay,
  };
}
