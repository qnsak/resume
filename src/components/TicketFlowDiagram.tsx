import { type ArticleStep, type Locale } from '../data/resume';

type TicketFlowDiagramProps = {
  currentStep: number;
  locale: Locale;
  onStepChange: (step: number) => void;
  steps: ArticleStep[];
};

const lanes = [
  { zh: '使用者介面', en: 'User', sub: 'Client' },
  { zh: '後端服務', en: 'API Server', sub: 'Service' },
  { zh: 'Redis', en: 'Redis', sub: 'Cache' },
  { zh: 'Database', en: 'Database', sub: 'Storage' },
  { zh: 'Payment / Job', en: 'Payment / Job', sub: 'Async' },
];

const nodes = [
  { step: 0, lane: 0, gridColumn: '2 / span 2', gridRow: '1' },
  { step: 1, lane: 1, gridColumn: '2 / span 2', gridRow: '2' },
  { step: 2, lane: 2, gridColumn: '4 / span 2', gridRow: '3' },
  { step: 3, lane: 3, gridColumn: '6 / span 2', gridRow: '4' },
  { step: 4, lane: 4, gridColumn: '8 / span 2', gridRow: '3' },
  { step: 5, lane: 4, gridColumn: '8 / span 2', gridRow: '5' },
];

const paths = [
  { from: 0, to: 1, d: 'M 235 78 L 235 150', tone: 'primary' },
  { from: 1, to: 2, d: 'M 300 190 L 430 250', tone: 'primary' },
  { from: 2, to: 3, d: 'M 560 285 L 650 350', tone: 'success' },
  { from: 3, to: 4, d: 'M 780 368 L 870 285', tone: 'success' },
  { from: 4, to: 5, d: 'M 870 310 L 870 425', tone: 'primary' },
];

export function TicketFlowDiagram({ currentStep, locale, onStepChange, steps }: TicketFlowDiagramProps) {
  return (
    <div className="ticket-flow-diagram" aria-label={locale === 'zh' ? '售票流程圖' : 'Ticketing flow diagram'}>
      <div className="ticket-flow-grid">
        {lanes.map((lane, index) => (
          <div className="ticket-lane" style={{ gridRow: index + 1 }} key={lane.en}>
            <strong>{locale === 'zh' ? lane.zh : lane.en}</strong>
            <span>{lane.sub}</span>
          </div>
        ))}

        <svg className="ticket-flow-arrows" viewBox="0 0 980 460" aria-hidden="true">
          <defs>
            <marker id="flow-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
              <path d="M 0 0 L 8 4 L 0 8 z" />
            </marker>
          </defs>
          {paths.map((path) => (
            <path
              className={`ticket-path ${path.tone} ${currentStep === path.from || currentStep === path.to ? 'active' : ''}`}
              d={path.d}
              key={`${path.from}-${path.to}`}
            />
          ))}
          <path className={`ticket-path failure ${currentStep === 2 ? 'active' : ''}`} d="M 560 260 L 710 80" />
        </svg>

        {nodes.map((node) => {
          const step = steps[node.step];
          const active = currentStep === node.step;

          return (
            <button
              className={`ticket-node visible ${active ? 'active' : ''}`}
              key={step.title}
              onClick={() => onStepChange(node.step)}
              style={{ gridColumn: node.gridColumn, gridRow: node.gridRow }}
              type="button"
            >
              <span>{node.step + 1}</span>
              <strong>{step.title}</strong>
              <small>{step.subtitle}</small>
            </button>
          );
        })}

        <div className={`ticket-conflict visible ${currentStep === 2 ? 'active' : ''}`}>
          <span>{locale === 'zh' ? '保留失敗' : 'Hold failed'}</span>
          <strong>{locale === 'zh' ? '重新選擇其他座位' : 'Choose another seat'}</strong>
        </div>
      </div>
    </div>
  );
}
