import { useMemo } from 'react';
import { CheckCircle2, Database, Server, User, XCircle } from 'lucide-react';
import {
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  BaseEdge,
  EdgeLabelRenderer,
  Handle,
  Position,
  getSmoothStepPath,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MODE_FLOWS, SWIM_LANES } from './constants';
import type { FlowEdgeTone, FlowIcon, FlowNodeDef, OutcomeTone, RequestThread, SimulationMode, StepDefinition } from './types';

const LANE_HEIGHT = 118;
const LANE_LABEL_WIDTH = 150;
const DIAGRAM_HEIGHT = SWIM_LANES.length * LANE_HEIGHT;

const ICONS: Record<FlowIcon, typeof User> = {
  user: User,
  server: Server,
  redis: Database,
  db: Database,
  check: CheckCircle2,
  x: XCircle,
};

const TONE_ACTIVE_STYLES: Record<OutcomeTone, string> = {
  success: 'border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-emerald-500/20',
  fail: 'border-rose-400 bg-rose-500/15 text-rose-300 shadow-rose-500/20',
  pending: 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-amber-500/20',
};

type StepNodeData = { def: FlowNodeDef; active: boolean };
type DecisionNodeData = { def: FlowNodeDef; active: boolean };
type OutcomeNodeData = { def: FlowNodeDef; active: boolean; countLabel?: string };
type LaneNodeData = { title: string; subtitle: string };

function StepNodeView({ data }: NodeProps<Node<StepNodeData, 'step'>>) {
  const { def, active } = data;
  const Icon = def.icon ? ICONS[def.icon] : Server;

  return (
    <div
      className={`relative w-[210px] rounded-lg border px-3 py-2.5 shadow-lg transition-all duration-300 ${
        active ? 'border-sky-400 bg-sky-500/10 text-sky-200 shadow-sky-500/20' : 'border-slate-700 bg-slate-900/90 text-slate-500'
      }`}
    >
      <Handle className="opacity-0" position={Position.Left} type="target" />
      <Handle className="opacity-0" position={Position.Right} type="source" />
      {def.number ? (
        <span
          className={`absolute -left-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
            active ? 'bg-sky-400 text-slate-950' : 'bg-slate-700 text-slate-300'
          }`}
        >
          {def.number}
        </span>
      ) : null}
      <div className="flex items-center gap-2">
        <Icon className="shrink-0" size={18} />
        <p className="text-sm font-bold leading-tight">{def.title}</p>
      </div>
      <p className="mt-1 text-[11px] leading-tight text-slate-500">{def.subtitle}</p>
    </div>
  );
}

function DecisionNodeView({ data }: NodeProps<Node<DecisionNodeData, 'decision'>>) {
  const { def, active } = data;

  return (
    <div
      className={`flex h-[100px] w-[100px] rotate-45 items-center justify-center rounded-lg border shadow-lg transition-all duration-300 ${
        active ? 'border-sky-400 bg-sky-500/10 shadow-sky-500/20' : 'border-slate-700 bg-slate-900/90'
      }`}
    >
      <Handle className="opacity-0" position={Position.Left} style={{ left: -8 }} type="target" />
      <Handle className="opacity-0" position={Position.Right} style={{ right: -8 }} type="source" />
      <p
        className={`-rotate-45 whitespace-pre-line text-center text-xs font-bold leading-tight ${
          active ? 'text-sky-200' : 'text-slate-500'
        }`}
      >
        {def.title}
      </p>
    </div>
  );
}

function OutcomeNodeView({ data }: NodeProps<Node<OutcomeNodeData, 'outcome'>>) {
  const { def, active, countLabel } = data;
  const tone = def.tone ?? 'success';

  return (
    <div
      className={`w-[220px] rounded-lg border px-3 py-2.5 text-center shadow-lg transition-all duration-300 ${
        active ? TONE_ACTIVE_STYLES[tone] : 'border-slate-700 bg-slate-900/90 text-slate-500'
      }`}
    >
      <Handle className="opacity-0" position={Position.Left} type="target" />
      <p className="text-sm font-bold leading-tight">{def.title}</p>
      <p className="mt-1 text-[11px] leading-tight opacity-80">{countLabel ?? def.subtitle}</p>
    </div>
  );
}

function LaneNodeView({ data }: NodeProps<Node<LaneNodeData, 'lane'>>) {
  return (
    <div className="flex h-full w-full items-center border-t border-slate-800/80 first:border-t-0">
      <div className="w-[150px] shrink-0 px-4">
        <p className="text-sm font-bold text-slate-300">{data.title}</p>
        <p className="text-xs text-slate-600">{data.subtitle}</p>
      </div>
      <div className="h-full flex-1 bg-slate-900/30" />
    </div>
  );
}

const nodeTypes = {
  lane: LaneNodeView,
  step: StepNodeView,
  decision: DecisionNodeView,
  outcome: OutcomeNodeView,
};

function FlowEdgeView({ sourceX, sourceY, targetX, targetY, data, markerEnd }: EdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, borderRadius: 12 });
  const edgeData = data as { tone: FlowEdgeTone; active: boolean; label?: string } | undefined;
  const tone = edgeData?.tone ?? 'neutral';
  const active = edgeData?.active ?? false;

  const strokeColor = !active
    ? '#475569'
    : tone === 'success'
      ? '#34d399'
      : tone === 'fail'
        ? '#fb7185'
        : '#38bdf8';

  return (
    <>
      <BaseEdge markerEnd={markerEnd} path={path} style={{ stroke: strokeColor, strokeWidth: active ? 2.5 : 1.5 }} />
      {edgeData?.label ? (
        <EdgeLabelRenderer>
          <div
            className="rounded border px-1.5 py-0.5 text-[11px] font-bold"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              borderColor: active ? strokeColor : '#334155',
              color: active ? strokeColor : '#475569',
              background: '#020617',
              pointerEvents: 'none',
            }}
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

const edgeTypes = { flow: FlowEdgeView };

function laneY(lane: string) {
  const index = SWIM_LANES.findIndex((item) => item.id === lane);
  return index * LANE_HEIGHT + LANE_HEIGHT / 2 - 30;
}

export function ArchitectureFlow({
  mode,
  step,
  requests,
  holdCountdown,
}: {
  mode: SimulationMode;
  step: StepDefinition;
  requests: RequestThread[];
  holdCountdown: number | null;
}) {
  const flow = MODE_FLOWS[mode];
  const diagramWidth = Math.max(...flow.nodes.map((node) => node.x)) + 260;

  const successCount = requests.filter((request) => request.outcome === 'success').length;
  const failCount = requests.length - successCount;

  const nodes = useMemo<Node[]>(() => {
    const laneNodes: Node[] = SWIM_LANES.map((lane, index) => ({
      id: `lane-${lane.id}`,
      type: 'lane',
      position: { x: 0, y: index * LANE_HEIGHT },
      data: { title: lane.title, subtitle: lane.subtitle },
      style: { width: diagramWidth, height: LANE_HEIGHT },
      draggable: false,
      selectable: false,
      zIndex: 0,
    }));

    const contentNodes: Node[] = flow.nodes.map((def) => {
      const active = step.activeNodeIds.includes(def.id);
      const x = def.x + LANE_LABEL_WIDTH;
      const y = laneY(def.lane);

      if (def.kind === 'outcome') {
        let countLabel: string | undefined;
        if (requests.length > 0) {
          if (mode === 'none' && def.id === 'outcome-fail') {
            countLabel = `${requests.length} 筆請求同時售出同一座位`;
          } else if (def.id === 'outcome-fail') {
            countLabel = failCount > 0 ? `${failCount} 個請求鎖定失敗` : def.subtitle;
          } else if (def.id === 'outcome-success') {
            if (mode === 'lua' && holdCountdown !== null) {
              countLabel = `剩餘 ${holdCountdown} 秒，逾時自動釋放`;
            } else if (successCount > 0) {
              countLabel = def.subtitle;
            }
          }
        }

        return {
          id: def.id,
          type: 'outcome',
          position: { x, y },
          data: { def, active, countLabel },
          draggable: false,
          selectable: false,
          zIndex: 1,
        };
      }

      return {
        id: def.id,
        type: def.kind,
        position: { x, y },
        data: { def, active },
        draggable: false,
        selectable: false,
        zIndex: 1,
      };
    });

    return [...laneNodes, ...contentNodes];
  }, [diagramWidth, failCount, flow.nodes, holdCountdown, mode, requests.length, step.activeNodeIds, successCount]);

  const edges = useMemo<Edge[]>(
    () =>
      flow.edges.map((def) => {
        const active = step.activeEdgeIds.includes(def.id);
        let label = def.label;
        if (requests.length > 0 && (mode === 'setnx' || mode === 'lua')) {
          if (def.id === 'decision__outcome-fail') label = `否 · ${failCount}`;
          if (def.id === 'decision__db-write') label = `是 · ${successCount}`;
        }

        return {
          id: def.id,
          source: def.source,
          target: def.target,
          type: 'flow',
          animated: active,
          data: { tone: def.tone, active, label },
        };
      }),
    [failCount, flow.edges, mode, requests.length, step.activeEdgeIds, successCount],
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
      <div style={{ width: diagramWidth + LANE_LABEL_WIDTH, height: DIAGRAM_HEIGHT }}>
        <ReactFlow
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          edges={edges}
          edgeTypes={edgeTypes}
          elementsSelectable={false}
          maxZoom={1}
          minZoom={1}
          nodes={nodes}
          nodeTypes={nodeTypes}
          nodesConnectable={false}
          nodesDraggable={false}
          panOnDrag={false}
          panOnScroll={false}
          proOptions={{ hideAttribution: true }}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          zoomOnScroll={false}
        />
      </div>
    </div>
  );
}
