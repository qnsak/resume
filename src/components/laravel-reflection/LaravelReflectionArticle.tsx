import { ArrowDown, ArrowLeft, Check, Code2, GitBranch, Layers3, TestTube2, X } from 'lucide-react';
import type { Locale } from '../../data/resume';

const copy = {
  zh: {
    back: '返回履歷',
    eyebrow: 'Laravel · Architecture',
    title: '在 Laravel 建立以反射自動發現的可擴充驗證架構',
    intro: '當案件類型持續增加，把所有驗證塞進 Service，只會讓規則互相牽制。這套設計讓每條規則獨立、自我註冊，新增規則時不必再碰核心流程。',
    problem: '問題與目標',
    problemBody: '案件每次更新狀態，都要執行一組依類型而異的業務驗證。傳統集中式 Service 會讓新增、移除規則都變成對核心流程的修改。',
    goal: '目標',
    goalBody: '規則彼此獨立、可配置組合，並符合開放封閉原則。',
    architecture: '分層架構',
    architectureBody: 'Engine 只負責協調執行；規則由 DI Container 注入，因此不需要知道有哪些具體模組。',
    architectureCaption: '系統邊界與分層：DI Container 將具體依賴從驗證引擎中反轉出去。',
    mechanism: '核心機制',
    mechanismTitle: '不是 Template Method，而是 Reflection-based Self-Registration',
    mechanismBody: '規則方法用 PHP 8 Attribute 自我標記。父類別在執行時透過 Reflection 掃描並呼叫它們；子類別不需要 override hook method。',
    reflectionCaption: '從繼承與 hook method，轉為由 Attribute + Reflection 負責規則發現。',
    addRule: '新增規則只需要新增一個帶有 #[Term] 的 protected 方法。',
    attributeTitle: '宣告式標籤，限制使用位置',
    attributeBody: 'Attribute::TARGET_METHOD 將 #[Term] 嚴格限制在方法上。若誤用於類別或屬性，PHP 會直接報錯，讓問題在進入業務流程前就被攔截。',
    discoveryTitle: '自動發現，不靠人工清單',
    discoveryBody: 'Verification 固定執行流程並收集所有 #[Term] 方法，徹底消除新增規則後忘記註冊的人為失誤。',
    evolution: '兩次演進',
    priority: '執行順序',
    priorityBody: '規則出現順序依賴後，替 #[Term] 加入 priority；沒有依賴的規則仍維持零設定。',
    typeSafety: '型別安全',
    typeSafetyBody: '把 $this->data 從 array 改為 CampaignDTO，換取 IDE 補全與靜態分析，但呼叫端必須同步更新。',
    testing: '測試策略',
    testingCaption: '規則可以直接實例化測試，不必啟動 Laravel Container。',
    testingItems: ['每條 protected 規則可獨立測試，不依賴 Laravel Container', 'Mock 使用具體類別，避免欄位變動後測試仍錯誤通過', '聚合模式精確驗證錯誤數量與內容，不只檢查例外型別'],
    aggregateTitle: '聚合行為也要精確驗證',
    aggregateBody: 'runAll 不只要拋出 AggregateValidationException；測試還要確認錯誤數量、每筆內容與業務預期完全一致。',
    tradeoffs: '設計取捨',
    tradeoffsCaption: '零侵入、可讀性與可測試性，交換的是狀態傳遞、順序保證與執行成本。',
    gains: '得到',
    costs: '失去',
    gainItems: ['新增／移除規則零侵入', '規則獨立、容易測試', '核心流程穩定且容易擴充'],
    costItems: ['規則間無法傳遞狀態', '順序需以 priority 額外定義', '執行時有 Reflection 開銷'],
    boundary: '什麼時候不要用？',
    boundaryBody: '規則有強依賴、需要在 runtime 動態組合，或 50+ 規則被高頻呼叫時，Pipeline / Chain of Responsibility，或搭配靜態快取會更合適。',
    conclusion: '知道一套設計能做什麼，和知道它的邊界一樣重要。',
  },
  en: {
    back: 'Back to résumé', eyebrow: 'Laravel · Architecture', title: 'An Extensible Laravel Validation Architecture with Reflection-based Discovery',
    intro: 'As case types multiply, putting every validation in one service makes rules interfere with each other. This design keeps each rule independent and self-registering, without changing the core flow.',
    problem: 'Problem and goal', problemBody: 'Every case status update runs business validations that differ by case type. A centralized service turns every rule change into a core-flow change.', goal: 'Goal', goalBody: 'Independent, composable rules that follow the open–closed principle.',
    architecture: 'Layered architecture', architectureBody: 'The engine only orchestrates execution. Rules arrive through the DI container, so the engine knows no concrete modules.',
    architectureCaption: 'System boundaries and layers: the DI container inverts concrete dependencies away from the verification engine.',
    mechanism: 'Core mechanism', mechanismTitle: 'Not Template Method: Reflection-based self-registration', mechanismBody: 'Rule methods mark themselves with a PHP 8 Attribute. At runtime, the parent scans and invokes them through Reflection—subclasses do not override hook methods.', addRule: 'Adding a rule means adding one protected method marked with #[Term].',
    reflectionCaption: 'Rule discovery moves from inheritance and hook methods to Attributes plus Reflection.',
    attributeTitle: 'Declarative labels with a strict target', attributeBody: 'Attribute::TARGET_METHOD restricts #[Term] to methods. Misuse on a class or property fails at the PHP layer before business execution begins.',
    discoveryTitle: 'Automatic discovery, no manual registry', discoveryBody: 'Verification owns the fixed flow and collects every #[Term] method, eliminating the human error of adding a rule but forgetting to register it.',
    evolution: 'Two evolutions', priority: 'Execution order', priorityBody: 'When ordering dependencies appear, add priority to #[Term]. Independent rules keep the zero-config default.', typeSafety: 'Type safety', typeSafetyBody: 'Replace the data array with CampaignDTO for IDE completion and static analysis, accepting a coordinated breaking change.',
    testing: 'Testing strategy', testingCaption: 'Rules can be instantiated and tested directly without booting the Laravel container.', testingItems: ['Test each protected rule independently without the Laravel container', 'Use concrete mocks so model changes cannot leave false-positive tests', 'Assert aggregate error count and content, not only the exception type'],
    aggregateTitle: 'Test aggregation precisely', aggregateBody: 'runAll must do more than throw AggregateValidationException: verify the error count, every payload, and the complete business outcome.',
    tradeoffs: 'Trade-offs', tradeoffsCaption: 'Non-invasive changes, readability, and testability come at the cost of state passing, ordering guarantees, and runtime overhead.', gains: 'Gains', costs: 'Costs', gainItems: ['Non-invasive rule changes', 'Independent, testable rules', 'A stable, extensible core flow'], costItems: ['No state passing between rules', 'Ordering requires explicit priority', 'Runtime Reflection overhead'],
    boundary: 'When should you not use it?', boundaryBody: 'Prefer Pipeline / Chain of Responsibility—or static caching—when rules have strong dependencies, composition changes at runtime, or 50+ rules run at high frequency.', conclusion: 'Knowing a design’s boundaries matters as much as knowing what it can do.',
  },
} as const;

const code = `#[Attribute(Attribute::TARGET_METHOD)]
class Term {}

class CampaignStatusVerification
{
    #[Term]
    protected function checkBudget() { /* ... */ }

    #[Term]
    protected function checkApproval() { /* ... */ }
}`;

export function LaravelReflectionArticle({ locale, onBack }: { locale: Locale; onBack: () => void }) {
  const t = copy[locale];
  const layers = ['HTTP Layer', 'Application Service', 'Verification Engine', 'Rule Modules'];
  const articleAsset = (filename: string) => `${import.meta.env.BASE_URL}articles/laravel-reflection/${filename}`;

  return (
    <main className="article-page">
      <article className="article-shell">
        <button className="article-back" onClick={onBack} type="button"><ArrowLeft size={16} />{t.back}</button>
        <header className="article-hero">
          <div className="article-hero-copy">
            <p className="article-eyebrow">Architecture Design Review · {t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <div className="article-tags"><span>PHP 8 Attributes</span><span>Reflection</span><span>Clean Architecture</span><span>DI Container</span></div>
          </div>
          <div className="article-mark" aria-hidden="true"><Code2 size={42} /><span>#[Term]</span></div>
        </header>

        <section className="article-section article-lead-grid">
          <div><p className="article-kicker">01</p><h2>{t.problem}</h2><p>{t.problemBody}</p></div>
          <aside className="article-goal"><span>{t.goal}</span><p>{t.goalBody}</p></aside>
        </section>

        <section className="article-section">
          <p className="article-kicker">02</p><h2>{t.architecture}</h2><p>{t.architectureBody}</p>
          <div className="architecture-stack">
            {layers.map((layer, index) => <div key={layer}><span>{layer}</span>{index < layers.length - 1 ? <ArrowDown size={18} /> : null}</div>)}
          </div>
          <div className="di-note"><GitBranch size={20} /><span>DI Container</span><small>Dependency Inversion</small></div>
          <figure className="article-figure"><img alt={t.architectureCaption} loading="lazy" src={articleAsset('layered-architecture.jpg')} /><figcaption>{t.architectureCaption}</figcaption></figure>
        </section>

        <section className="article-section">
          <p className="article-kicker">03 · {t.mechanism}</p><h2>{t.mechanismTitle}</h2><p>{t.mechanismBody}</p>
          <div className="article-code-wrap"><div className="code-dots"><i /><i /><i /></div><pre><code>{code}</code></pre></div>
          <p className="article-callout"><Check size={19} />{t.addRule}</p>
          <figure className="article-figure"><img alt={t.reflectionCaption} loading="lazy" src={articleAsset('reflection-comparison.jpg')} /><figcaption>{t.reflectionCaption}</figcaption></figure>
          <div className="discovery-grid">
            <div><span>#[Term]</span><h3>{t.attributeTitle}</h3><p>{t.attributeBody}</p></div>
            <div><span>Reflection</span><h3>{t.discoveryTitle}</h3><p>{t.discoveryBody}</p></div>
          </div>
        </section>

        <section className="article-section">
          <p className="article-kicker">04</p><h2>{t.evolution}</h2>
          <div className="evolution-grid">
            <div><span>01</span><Layers3 size={24} /><h3>{t.priority}</h3><p>{t.priorityBody}</p></div>
            <div><span>02</span><Code2 size={24} /><h3>{t.typeSafety}</h3><p>{t.typeSafetyBody}</p></div>
          </div>
        </section>

        <section className="article-section testing-section">
          <div><p className="article-kicker">05</p><h2>{t.testing}</h2></div>
          <div><ul>{t.testingItems.map((item) => <li key={item}><TestTube2 size={19} />{item}</li>)}</ul>
            <aside className="aggregate-note"><strong>AggregateValidationException</strong><span>{t.aggregateTitle}</span><p>{t.aggregateBody}</p></aside>
          </div>
          <figure className="article-figure testing-figure"><img alt={t.testingCaption} loading="lazy" src={articleAsset('testing-boundary.jpg')} /><figcaption>{t.testingCaption}</figcaption></figure>
        </section>

        <section className="article-section">
          <p className="article-kicker">06</p><h2>{t.tradeoffs}</h2>
          <div className="tradeoff-grid">
            <div className="tradeoff-gain"><h3><Check size={19} />{t.gains}</h3><ul>{t.gainItems.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="tradeoff-cost"><h3><X size={19} />{t.costs}</h3><ul>{t.costItems.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <figure className="article-figure"><img alt={t.tradeoffsCaption} loading="lazy" src={articleAsset('tradeoffs.jpg')} /><figcaption>{t.tradeoffsCaption}</figcaption></figure>
        </section>

        <section className="article-boundary"><p className="article-kicker">07 · Boundary</p><h2>{t.boundary}</h2><p>{t.boundaryBody}</p><blockquote>{t.conclusion}</blockquote></section>
      </article>
    </main>
  );
}
