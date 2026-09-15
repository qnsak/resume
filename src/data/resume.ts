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

export type Article = {
  slug: string;
  title: string;
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
  { label: 'GitHub', href: 'https://github.com/qnsak' },
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
      'Senior full-stack engineer with 9+ years of experience in backend architecture, business workflow design, and system integration. Recently focused on AI-assisted development workflows, documentation governance, and adoption practices, with interest in AI platform adoption, solution planning, and field deployment roles.',
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
      { label: 'Backend', items: ['PHP', 'Laravel', 'Python', 'FastAPI'] },
      { label: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt 3'] },
      { label: 'Data & Performance', items: ['MySQL', 'Redis', 'MongoDB'] },
      { label: 'DevOps & Cloud', items: ['Docker', 'Jenkins', 'GCP', 'AWS'] },
      { label: 'AI-assisted Development', items: ['Codex', 'Claude Code'] },
      { label: 'System Design & Architecture', items: ['Clean Architecture', 'DDD', 'TDD', 'C4 Model'] },
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
        href: 'https://hackmd.io/@qns/B1WG1SAige',
      },
      {
        title: 'useMutation Pipeline Pattern',
        description: 'Article about building extensible mutation flow with a pipeline-style abstraction.',
        href: 'https://hackmd.io/@qns/SyhF8lHall',
      },
      {
        title: 'AI-assisted Engineering Workflow',
        description: 'Internal practice for feature maps, C4 documentation, and reviewable AI coding rules.',
        href: 'https://hackmd.io/@qns/SJnQ57yaWe',
      },
    ],
    articles: [],
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
      '具 9 年以上後端架構、業務流程設計與系統整合經驗，熟悉從需求釐清、系統設計到部署維運的完整流程。近年投入 AI 協作開發流程、文件治理與導入實踐，希望進一步參與 AI 平台導入、解決方案規劃與實務部署相關工作。',
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
      { label: '後端', items: ['PHP', 'Laravel', 'Python', 'FastAPI'] },
      { label: '前端', items: ['TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt 3'] },
      { label: '資料與效能', items: ['MySQL', 'Redis', 'MongoDB'] },
      { label: 'DevOps 與雲端', items: ['Docker', 'Jenkins', 'GCP', 'AWS'] },
      { label: 'AI 協作開發', items: ['Codex', 'Claude Code'] },
      { label: '系統設計與架構', items: ['Clean Architecture', 'DDD', 'TDD', 'C4 Model'] },
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
        href: 'https://hackmd.io/@qns/B1WG1SAige',
      },
      {
        title: 'React - 以 Pipeline 模式封裝 useMutation 共用流程',
        description: '以 Pipeline 模式設計高擴充 mutation flow 的技術文章。',
        href: 'https://hackmd.io/@qns/SyhF8lHall',
      },
      {
        title: 'AI 協作工程流程',
        description: '以 Feature Map、C4 文件與 Agent Rules 建立可審查的 AI 協作維護流程。',
        href: 'https://hackmd.io/@qns/SJnQ57yaWe',
      },
    ],
    articles: [],
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
