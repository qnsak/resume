export type SimulationMode = 'none' | 'setnx' | 'lua';

export type SeatStatus = 'available' | 'locked' | 'sold';

export type RequestOutcome = 'success' | 'failed';

export type RequestThread = {
  id: string;
  index: number;
  outcome: RequestOutcome;
  message: string;
};

export type LogTag = 'INFO' | 'SUCCESS' | 'FAIL' | 'EXPIRE';

export type LogEntry = {
  id: string;
  time: string;
  tag: LogTag;
  message: string;
  payload: string;
};

export type SwimLane = 'user' | 'api' | 'redis' | 'db';

export type FlowNodeKind = 'step' | 'decision' | 'outcome';

export type OutcomeTone = 'success' | 'fail' | 'pending';

export type FlowIcon = 'user' | 'server' | 'redis' | 'db' | 'check' | 'x';

export type FlowNodeDef = {
  id: string;
  lane: SwimLane;
  x: number;
  kind: FlowNodeKind;
  number?: number;
  icon?: FlowIcon;
  title: string;
  subtitle: string;
  tone?: OutcomeTone;
};

export type FlowEdgeTone = 'neutral' | 'success' | 'fail';

export type FlowEdgeDef = {
  id: string;
  source: string;
  target: string;
  label?: string;
  tone: FlowEdgeTone;
};

export type ModeFlow = {
  nodes: FlowNodeDef[];
  edges: FlowEdgeDef[];
};

export type StepDefinition = {
  title: string;
  description: string;
  activeNodeIds: string[];
  activeEdgeIds: string[];
};
