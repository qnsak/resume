export type Locale = 'en' | 'zh';

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Experience = {
  company: string;
  companyNote?: string;
  role: string;
  location: string;
  period: string;
  stack: string[];
  bullets: string[];
};

export type Project = {
  title: string;
  description: string;
  href?: string;
  articleSlug?: string;
};

export type ArticleStep = {
  title: string;
  subtitle: string;
  body: string;
  risk: string;
  strategy: string;
  notes: string[];
};

export type Article = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  summary: string;
  steps: ArticleStep[];
};

export type ResumeContent = {
  locale: Locale;
  name: string;
  title: string;
  subtitle: string;
  headerTags: string[];
  location: string;
  email: string;
  phone: string;
  links: { label: string; href: string }[];
  summary: string;
  highlights: { label: string; text: string }[];
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  articles: Article[];
  education: {
    school: string;
    degree: string;
    period: string;
  };
  languages: string[];
  workAuthorization: string;
  labels: {
    summary: string;
    highlights: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    languages: string;
    workAuthorization: string;
    contact: string;
    navigation: string;
    stack: string;
  };
};

const sharedLinks = [
  { label: 'GitHub', href: 'https://github.com/qns' },
  { label: 'Blog', href: 'https://hackmd.io/@qns' },
];

export const resumes: Record<Locale, ResumeContent> = {
  en: {
    locale: 'en',
    name: 'Sak Qi Nian / Thomas Sak',
    title: 'Senior Full Stack Engineer',
    subtitle: 'Senior full-stack engineer exploring AI platform adoption, solution planning, and field deployment challenges',
    headerTags: ['Backend Architecture', 'Workflow Design', 'System Integration', 'AI Adoption', 'Solution Delivery'],
    location: 'New Taipei City, Taiwan',
    email: 'sak6289@gmail.com',
    phone: '+886 966-791-962',
    links: sharedLinks,
    summary:
      'Senior full-stack engineer with 8+ years of experience in backend architecture, business workflow design, and system integration. Recently focused on AI-assisted development workflows, documentation governance, and adoption practices, with interest in AI platform adoption, solution planning, and field deployment roles.',
    highlights: [
      {
        label: 'Architecture',
        text: 'Led backend refactoring, validation flow redesign, and modular service boundaries for business-critical systems.',
      },
      {
        label: 'Workflow Design',
        text: 'Designed ticketing, order, payment, and enterprise workflow features across consumer and internal platforms.',
      },
      {
        label: 'AI Adoption',
        text: 'Built documentation, feature maps, and agent rules to make AI-assisted engineering workflows reviewable and adoptable.',
      },
    ],
    skills: [
      { label: 'Backend', items: ['PHP', 'Laravel', 'Python', 'FastAPI', 'REST API', 'JWT', 'SSO'] },
      { label: 'Frontend', items: ['TypeScript', 'Vue 3', 'Nuxt 3', 'React', 'Next.js'] },
      { label: 'Database', items: ['MySQL', 'MariaDB', 'Redis', 'MongoDB'] },
      { label: 'DevOps', items: ['Docker', 'Jenkins', 'GCP', 'AWS', 'Nginx', 'Linux'] },
      { label: 'Practices', items: ['Clean Architecture', 'DDD', 'CI/CD', 'TDD', 'Playwright', 'C4 Model'] },
    ],
    experience: [
      {
        company: '104 Corporation',
        companyNote: 'Internet services, 500+ employees',
        role: 'Backend Engineer',
        location: 'New Taipei City, Taiwan',
        period: 'Jun 2026 - Sep 2026',
        stack: ['Backend systems', 'PHP/Laravel'],
        bullets: [
          'Contributed to BFF development in a microservices architecture, shaping frontend-facing APIs for product iteration.',
        ],
      },
      {
        company: 'JS Adways',
        companyNote: 'Digital advertising and marketing technology',
        role: 'Senior Backend Engineer',
        location: 'Taipei, Taiwan',
        period: 'Nov 2023 - Jun 2026',
        stack: ['PHP/Laravel', 'Python', 'Vue 3', 'React', 'MySQL', 'Redis', 'GCP', 'Docker', 'Jenkins'],
        bullets: [
          'Designed a JWT-based SSO mechanism, separating authentication and authorization with an AAA model to standardize identity flows across internal systems.',
          'Contributed to a Laravel SDK by standardizing Swagger API documentation generation and request validation rules.',
          'Designed Jenkins CI/CD pipelines with Slack deployment notifications and expanded Unit, API, and E2E testing workflows.',
          'Led case management system refactoring by redesigning validation flows with Template Method Pattern and restructuring frontend layers with Clean Architecture.',
          'Established an AI-assisted maintenance workflow with feature maps, lightweight C4 documents, ubiquitous language, and agent rules.',
        ],
      },
      {
        company: 'Link Station Taiwan',
        companyNote: 'Ticketing and software systems',
        role: 'Senior Application System Engineer',
        location: 'Taipei, Taiwan',
        period: 'Jul 2018 - Nov 2023',
        stack: ['PHP/Laravel', 'JavaScript', 'Vue', 'MySQL', 'Docker', 'Nginx'],
        bullets: [
          'Participated in ticketing management architecture and database design, implementing admin, consumer, API, and discount workflows.',
          'Built LINE LIFF ticket purchase flows, integrated LINE Pay, and implemented ticket-splitting and third-party login features.',
          'Led Vue 2 to Vue 3 migration while improving project structure, purchase flow, and adjacent-seat selection behavior.',
          'Developed ibon pickup and on-site ticketing systems, including database design, device integration, and EasyCard purchase API integration.',
        ],
      },
      {
        company: 'Da Hong Information',
        role: 'PHP Engineer',
        location: 'Taiwan',
        period: 'Sep 2016 - Apr 2018',
        stack: ['PHP', 'JavaScript', 'MySQL'],
        bullets: [
          'Maintained and developed e-commerce platform features, including campaign setup and shopping cart promotion workflows.',
          'Built data collection crawlers and maintained data processing, storage, and operational workflows.',
        ],
      },
    ],
    projects: [
      {
        title: 'Laravel Validation Architecture',
        description: 'Technical writing on validation architecture and maintainable Laravel business rules.',
      },
      {
        title: 'useMutation Pipeline Pattern',
        description: 'Article about building extensible mutation flow with a pipeline-style abstraction.',
        href: 'https://hackmd.io/@qns',
      },
      {
        title: 'AI-assisted Engineering Workflow',
        description: 'Internal practice for feature maps, C4 documentation, and reviewable AI coding rules.',
      },
      {
        title: 'Overselling and Duplicate Ticket Prevention',
        description: 'Interactive breakdown of seat reservation, atomic locking, idempotency, and reconciliation.',
        articleSlug: 'oversell-ticketing',
      },
    ],
    articles: [
      {
        slug: 'oversell-ticketing',
        title: 'Overselling and Duplicate Ticket Prevention',
        eyebrow: 'Interactive System Design',
        intro:
          'A step-by-step walkthrough of how a ticketing platform can reduce overselling and duplicate tickets under high-concurrency purchase flows.',
        summary:
          'The design separates temporary seat reservation from final order confirmation. A short-lived atomic hold blocks concurrent users, while idempotent order creation and reconciliation keep the final state consistent.',
        steps: [
          {
            title: 'Choose Seat',
            subtitle: 'The user selects seat A12 and starts checkout.',
            body:
              'At this moment the seat is only a candidate. The UI should make it clear that availability is not final until the reservation request succeeds.',
            risk: 'Multiple users can see and select the same available seat before any backend state changes.',
            strategy: 'Treat selection as intent only, then send a reservation request before payment begins.',
            notes: ['Show a clear pending state', 'Avoid creating a final order from client-side selection alone'],
          },
          {
            title: 'Reserve Seat',
            subtitle: 'The API validates the event, seat, user, and request context.',
            body:
              'The backend becomes the boundary that decides whether this user may hold the seat. Validation and authorization happen before touching the reservation store.',
            risk: 'Invalid seats, stale pages, or repeated clicks can create noisy duplicate requests.',
            strategy: 'Normalize requests and attach a request or intent identifier that later steps can reuse.',
            notes: ['Validate event and seat status', 'Keep repeated clicks from creating parallel checkout attempts'],
          },
          {
            title: 'Atomic Hold',
            subtitle: 'Redis reserves the seat with a short TTL.',
            body:
              'Use an atomic operation such as SET seat:event:A12 userId NX EX. Only the first request succeeds; others fail immediately and can ask the user to choose another seat.',
            risk: 'A read-then-write flow can pass validation in two requests and oversell the same seat.',
            strategy: 'Use Redis SET NX EX, a database unique constraint, or another atomic concurrency boundary.',
            notes: ['Include event and seat in the key', 'Set TTL for abandoned checkout recovery', 'Never rely on client-side locking'],
          },
          {
            title: 'Create Pending Order',
            subtitle: 'A successful hold becomes a pending order record.',
            body:
              'Persist the reservation result with the seat, user, hold expiry, and order status. The database record gives operations and payment flows a durable source of truth.',
            risk: 'Cache-only state can be lost, hard to audit, or difficult to reconcile with payment callbacks.',
            strategy: 'Write a pending order after the hold succeeds, and keep order creation idempotent.',
            notes: ['Store hold expiry time', 'Use idempotency keys for retries', 'Keep seat status explicit'],
          },
          {
            title: 'Confirm Payment',
            subtitle: 'Payment completion turns the pending order into a confirmed ticket.',
            body:
              'Payment pages and provider callbacks can retry, arrive late, or arrive more than once. The confirmation flow should return the same final result for the same order.',
            risk: 'Duplicate callbacks or user retries may issue duplicate tickets if confirmation is not idempotent.',
            strategy: 'Deduplicate callbacks and guard ticket issuance with order status transitions.',
            notes: ['Confirm only from pending to paid once', 'Record callback identifiers', 'Return the existing result on repeated requests'],
          },
          {
            title: 'Reconcile State',
            subtitle: 'Background jobs clean up expired holds and inconsistent records.',
            body:
              'No live flow is perfect. A reconciliation process should release expired holds, check unpaid orders, and repair paid-but-unconfirmed states.',
            risk: 'Network failures and abandoned checkout sessions can leave seats stuck or state mismatched.',
            strategy: 'Run scheduled reconciliation with audit logs and support-visible order states.',
            notes: ['Release expired holds', 'Audit paid-but-unconfirmed orders', 'Expose traceable state for support teams'],
          },
        ],
      },
    ],
    education: {
      school: 'National Taitung University',
      degree: 'B.S. in Information Management',
      period: '2012 - 2016',
    },
    languages: ['Mandarin', 'English', 'Malay'],
    workAuthorization: 'Malaysia citizen with Taiwan APRC; work permit self-managed under Taiwan Employment Service Act Article 51.',
    labels: {
      summary: 'Summary',
      highlights: 'Highlights',
      skills: 'Core Skills',
      experience: 'Experience',
      projects: 'Selected Writing / Projects',
      education: 'Education',
      languages: 'Languages',
      workAuthorization: 'Work Authorization',
      contact: 'Contact',
      navigation: 'Navigation',
      stack: 'Stack',
    },
  },
  zh: {
    locale: 'zh',
    name: '謝起念',
    title: '資深全端工程師',
    subtitle: '具備後端架構、流程設計與系統整合經驗，正在將工程實務延伸到 AI 導入與解決方案落地。',
    headerTags: ['後端架構', '流程設計', '系統整合', 'AI 導入', '解決方案落地'],
    location: '台灣新北市',
    email: 'sak6289@gmail.com',
    phone: '0966-791-962',
    links: sharedLinks,
    summary:
      '具 8 年以上後端架構、業務流程設計與系統整合經驗，熟悉從需求釐清、系統設計到部署維運的完整流程。近年投入 AI 協作開發流程、文件治理與導入實踐，希望進一步參與 AI 平台導入、解決方案規劃與實務部署相關工作。',
    highlights: [
      {
        label: '系統架構',
        text: '主導後端重構、驗證流程設計與模組邊界整理，改善核心業務系統的可維護性。',
      },
      {
        label: '流程設計',
        text: '具票務、訂單、金流、ERP 與內部管理流程經驗，能把複雜規則轉成可演進的系統設計。',
      },
      {
        label: 'AI 導入實踐',
        text: '建立 Feature Map、C4 文件與 Agent Rules，讓 AI 協作工程流程具備可審查性與導入基礎。',
      },
    ],
    skills: [
      { label: '後端', items: ['PHP', 'Laravel', 'Python', 'FastAPI', 'REST API', 'JWT', 'SSO'] },
      { label: '前端', items: ['TypeScript', 'Vue 3', 'Nuxt 3', 'React', 'Next.js'] },
      { label: '資料庫', items: ['MySQL', 'MariaDB', 'Redis', 'MongoDB'] },
      { label: '維運', items: ['Docker', 'Jenkins', 'GCP', 'AWS', 'Nginx', 'Linux'] },
      { label: '工程實踐', items: ['Clean Architecture', 'DDD', 'CI/CD', 'TDD', 'Playwright', 'C4 Model'] },
    ],
    experience: [
      {
        company: '一零四資訊科技股份有限公司',
        companyNote: '網際網路相關業，500 人以上',
        role: '後端工程師',
        location: '新北市新店區',
        period: '2026/06 - 2026/09',
        stack: ['後端系統', 'PHP/Laravel'],
        bullets: [
          '參與微服務架構下的 BFF 功能開發，封裝前端所需 API 介面以支援產品迭代。',
        ],
      },
      {
        company: '傑思愛德威媒體股份有限公司',
        companyNote: '廣告行銷與公關科技',
        role: '資深後端工程師',
        location: '台北市信義區',
        period: '2023/11 - 2026/06',
        stack: ['PHP/Laravel', 'Python', 'Vue 3', 'React', 'MySQL', 'Redis', 'GCP', 'Docker', 'Jenkins'],
        bullets: [
          '設計並封裝以 JWT 為核心的 SSO 機制，依 AAA 模型拆分認證與授權流程，統一跨系統身份驗證標準。',
          '參與 Laravel 專案 SDK 開發，主責 Swagger API 文件自動生成與 Request 驗證規則標準化。',
          '設計 Jenkins CI/CD Pipeline，整合 Slack 部署通知，推動 Unit / API / E2E 測試流程。',
          '主導案件管理系統架構重構，重整驗證流程並以 Template Method Pattern 降低耦合。',
          '建立 AI 協作維護流程，透過 Feature Map、C4 文件、Ubiquitous Language 與 Agent Rules 降低重複溝通成本。',
        ],
      },
      {
        company: '智林國際股份有限公司',
        companyNote: '票務與軟體系統',
        role: '資深應用系統開發工程師',
        location: '台北市內湖區',
        period: '2018/07 - 2023/11',
        stack: ['PHP/Laravel', 'JavaScript', 'Vue', 'MySQL', 'Docker', 'Nginx'],
        bullets: [
          '參與票務管理系統架構設計與資料庫規劃，實作前後台功能、API 與折扣機制。',
          '建立 LINE LIFF 售票流程並整合 LINE Pay，設計分票機制與第三方登入功能。',
          '主導 Vue 2 升級至 Vue 3，優化專案結構、購票流程與連座選位體驗。',
          '開發 ibon 取票與現場售票系統，負責資料庫設計、實體設備串接與悠遊卡購票 API 整合。',
        ],
      },
      {
        company: '大弘信息股份有限公司',
        role: 'PHP 工程師',
        location: '台灣',
        period: '2016/09 - 2018/04',
        stack: ['PHP', 'JavaScript', 'MySQL'],
        bullets: [
          '維護與開發電商平台功能，包含活動設定與購物車優惠機制設計。',
          '開發資料蒐集爬蟲系統，負責資料整理、儲存與系統維運。',
        ],
      },
    ],
    projects: [
      {
        title: 'Laravel 驗證架構設計',
        description: '整理 Laravel 業務驗證架構與可維護規則設計的技術文章。',
      },
      {
        title: 'useMutation Pipeline Pattern',
        description: '以 Pipeline 模式設計高擴充 mutation flow 的技術文章。',
        href: 'https://hackmd.io/@qns',
      },
      {
        title: 'AI 協作工程流程',
        description: '以 Feature Map、C4 文件與 Agent Rules 建立可審查的 AI 協作維護流程。',
      },
      {
        title: '超賣或重複售票對應策略',
        description: '互動式拆解座位保留、原子鎖定、冪等訂單與狀態對帳的票務系統設計。',
        articleSlug: 'oversell-ticketing',
      },
    ],
    articles: [
      {
        slug: 'oversell-ticketing',
        title: '超賣或重複售票對應策略',
        eyebrow: '互動式系統設計',
        intro: '逐步拆解高併發購票情境下，票務平台如何降低同一座位被重複保留或重複售出的風險。',
        summary:
          '設計重點是把「暫時保留座位」和「正式完成訂單」分開：先用短效且具原子性的保留機制擋住併發，再透過冪等訂單與狀態對帳維持最終一致性。',
        steps: [
          {
            title: '選擇座位',
            subtitle: '使用者選擇座位 A12，準備進入結帳流程。',
            body:
              '這一步只代表使用者有購買意圖，還不能視為座位已售出。畫面需要讓使用者知道座位狀態仍需經過後端保留確認。',
            risk: '多位使用者可能同時看到同一個可售座位，並在短時間內送出相同座位的購買意圖。',
            strategy: '前端選取只作為 intent，必須先送出保留請求，成功後才進入後續付款或訂單流程。',
            notes: ['顯示等待確認狀態', '不要只依賴前端座位狀態', '避免選取座位就直接建立正式票券'],
          },
          {
            title: '呼叫保留 API',
            subtitle: '後端驗證活動、座位、使用者與請求狀態。',
            body:
              '後端是判斷座位是否可被暫時保留的邊界。進入保留機制前，應先確認活動有效、座位存在、使用者可購買，以及請求沒有明顯重複。',
            risk: '頁面資料過期、連點按鈕或重送請求，可能造成多筆競爭同一座位的流程。',
            strategy: '標準化請求內容，並附上 request id 或 intent id，讓後續流程可以識別同一次購買意圖。',
            notes: ['檢查活動與座位狀態', '限制同一使用者的平行結帳請求', '保留可追蹤的請求識別'],
          },
          {
            title: '原子保留座位',
            subtitle: '用 Redis 或資料庫約束保證同一座位只有一個成功者。',
            body:
              '例如使用 Redis SET seat:event:A12 userId NX EX。第一個成功寫入的人取得短時間保留權，其他人會立即失敗並回到重新選座。',
            risk: '若採用先查詢再寫入，兩個請求可能都看到座位可用，最後造成同一座位被重複保留。',
            strategy: '使用 Redis SET NX EX、資料庫唯一約束或其他原子操作作為併發控制邊界。',
            notes: ['key 需包含活動與座位資訊', 'TTL 用於處理放棄結帳', '不要依賴前端鎖定避免併發'],
          },
          {
            title: '建立待付款訂單',
            subtitle: '保留成功後，將座位、使用者、到期時間與訂單狀態寫入資料庫。',
            body:
              '資料庫記錄提供可追蹤的狀態來源，讓付款流程、客服查詢與背景任務都能依據同一筆待付款訂單處理。',
            risk: '只存在快取中的保留狀態不容易稽核，也難以和付款回呼或營運查詢對齊。',
            strategy: '保留成功後建立待付款訂單，並讓建立訂單流程具備冪等性。',
            notes: ['保存保留到期時間', '重試時回傳同一筆訂單', '明確區分 pending、paid、expired 狀態'],
          },
          {
            title: '確認付款完成',
            subtitle: '付款成功後，將待付款訂單轉成正式票券或完成訂位。',
            body:
              '付款頁、第三方金流 callback 和使用者重試都可能重複發生。確認流程必須能辨識同一筆訂單，避免重複出票。',
            risk: '重複 callback 或重試請求若沒有冪等保護，可能讓同一筆訂單產生多張票。',
            strategy: '以訂單狀態轉移保護出票流程，並對付款 callback 做去重處理。',
            notes: ['只允許 pending 轉 paid 一次', '記錄付款 callback 識別碼', '重複請求回傳既有結果'],
          },
          {
            title: '對帳與釋放',
            subtitle: '背景任務處理逾時保留、未付款訂單與狀態不一致。',
            body:
              '即時流程仍可能遇到網路中斷、付款延遲或使用者放棄結帳。背景對帳能釋放逾時座位，並修正已付款但尚未完成確認的資料。',
            risk: '座位可能卡在保留狀態，或付款與訂單狀態不同步，造成營運與客服難以判斷。',
            strategy: '用排程任務、稽核紀錄與客服可查詢狀態，維持快取與資料庫的最終一致性。',
            notes: ['釋放逾時保留', '檢查已付款但未確認訂單', '保留可追蹤的營運紀錄'],
          },
        ],
      },
    ],
    education: {
      school: '國立臺東大學',
      degree: '資訊管理學系 學士',
      period: '2012 - 2016',
    },
    languages: ['中文', '英文', '馬來文'],
    workAuthorization: '馬來西亞籍，持台灣永久居留證 APRC；依就業服務法第 51 條，工作許可由本人自理。',
    labels: {
      summary: '專業摘要',
      highlights: '核心亮點',
      skills: '核心技能',
      experience: '工作經驗',
      projects: '技術文章 / 專案',
      education: '學歷',
      languages: '語言',
      workAuthorization: '工作資格',
      contact: '聯絡方式',
      navigation: '目錄',
      stack: '技術',
    },
  },
};
