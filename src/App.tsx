import { useEffect, useState } from 'react';
import { Github, Globe2, List, Mail, MapPin, Phone, X } from 'lucide-react';
import { type Locale, resumes } from './data/resume';

function detectLocale(): Locale {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('/zh')) return 'zh';
  if (hash.includes('/en')) return 'en';
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/zh')) return 'zh';
  if (path.endsWith('/en')) return 'en';
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function App() {
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const resume = resumes[locale];

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hant' : 'en';
    document.title = `${resume.name} | Resume`;
    window.history.replaceState(null, '', `#/${locale}`);
  }, [locale, resume.name]);

  const navItems = [
    { id: 'top', label: locale === 'zh' ? '首頁' : 'Top' },
    { id: 'summary', label: resume.labels.summary },
    { id: 'highlights', label: resume.labels.highlights },
    { id: 'experience', label: resume.labels.experience },
    { id: 'projects', label: resume.labels.projects },
    { id: 'skills', label: resume.labels.skills },
    { id: 'education', label: resume.labels.education },
  ];

  function sectionClassName(id: string) {
    return `section ${highlightedSection === id ? 'section-highlight' : ''}`;
  }

  function jumpToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlightedSection(id);
    setIsNavOpen(false);
    window.setTimeout(() => setHighlightedSection((current) => (current === id ? null : current)), 1600);
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-16 text-slate-900">
      <div className="top-toolbar">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="toolbar-identity toolbar-spacer" aria-hidden="true">
            <span className="toolbar-name">{resume.name}</span>
            <span className="toolbar-title">{resume.title}</span>
          </div>
          <div className="toolbar-center" aria-hidden="true">
            Resume
          </div>
          <div className="toolbar-actions">
            <div className="language-switch" aria-label="Language switcher">
              <Globe2 size={15} />
              <button
                aria-pressed={locale === 'zh'}
                className={locale === 'zh' ? 'active' : ''}
                onClick={() => {
                  setLocale('zh');
                  setIsNavOpen(false);
                }}
                type="button"
              >
                中文
              </button>
              <button
                aria-pressed={locale === 'en'}
                className={locale === 'en' ? 'active' : ''}
                onClick={() => {
                  setLocale('en');
                  setIsNavOpen(false);
                }}
                type="button"
              >
                EN
              </button>
            </div>
            <div className={`toolbar-nav ${isNavOpen ? 'open' : ''}`}>
              <button
                aria-expanded={isNavOpen}
                aria-label={resume.labels.navigation}
                className="toolbar-nav-toggle"
                onClick={() => setIsNavOpen((current) => !current)}
                type="button"
              >
                {isNavOpen ? <X size={17} /> : <List size={17} />}
              </button>
              <div className="toolbar-nav-panel">
                <h2>{resume.labels.navigation}</h2>
                <nav className="section-nav" aria-label={resume.labels.navigation}>
                  {navItems.map((item) => (
                    <button
                      className={highlightedSection === item.id ? 'active' : ''}
                      key={item.id}
                      onClick={() => jumpToSection(item.id)}
                      type="button"
                    >
                      <span className="section-nav-dot" aria-hidden="true" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="site-header" id="top">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-teal-700">{resume.title}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">{resume.name}</h1>
            <div className="header-tags" aria-label={resume.subtitle}>
              {resume.headerTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-8">
          <section className={sectionClassName('summary')} id="summary">
            <h2>{resume.labels.summary}</h2>
            <p className="summary-copy">{resume.summary}</p>
          </section>

          <section className={sectionClassName('highlights')} id="highlights">
            <h2>{resume.labels.highlights}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {resume.highlights.map((item) => (
                <article className="highlight-card" key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={sectionClassName('experience')} id="experience">
            <h2>{resume.labels.experience}</h2>
            <div className="space-y-7">
              {resume.experience.map((job) => (
                <article className="experience-item" key={`${job.company}-${job.period}`}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="font-semibold text-slate-800">{job.company}</p>
                      {job.companyNote ? <p className="text-sm text-slate-500">{job.companyNote}</p> : null}
                    </div>
                    <div className="text-sm text-slate-500 sm:text-right">
                      <p>{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.stack.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={sectionClassName('projects')} id="projects">
            <h2>{resume.labels.projects}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {resume.projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.href ? (
                    <a href={project.href} rel="noreferrer" target="_blank">
                      {project.href.replace('https://', '')}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <section>
            <h2>{resume.labels.contact}</h2>
            <div className="sidebar-list">
              <a href={`mailto:${resume.email}`}>
                <Mail size={16} />
                {resume.email}
              </a>
              <a href={`tel:${resume.phone.replace(/\s|-/g, '')}`}>
                <Phone size={16} />
                {resume.phone}
              </a>
              <span>
                <MapPin size={16} />
                {resume.location}
              </span>
              {resume.links.map((link) => (
                <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                  <Github size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <section className={highlightedSection === 'skills' ? 'sidebar-section-highlight' : ''} id="skills">
            <h2>{resume.labels.skills}</h2>
            <div className="space-y-4">
              {resume.skills.map((group) => (
                <div key={group.label}>
                  <h3 className="text-sm font-bold text-slate-950">{group.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{group.items.join(' / ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={highlightedSection === 'education' ? 'sidebar-section-highlight' : ''} id="education">
            <h2>{resume.labels.education}</h2>
            <p className="font-semibold text-slate-900">{resume.education.school}</p>
            <p className="text-sm text-slate-600">{resume.education.degree}</p>
            <p className="text-sm text-slate-500">{resume.education.period}</p>
          </section>

          <section>
            <h2>{resume.labels.languages}</h2>
            <p className="text-sm leading-6 text-slate-600">{resume.languages.join(' / ')}</p>
          </section>

          <section>
            <h2>{resume.labels.workAuthorization}</h2>
            <p className="text-sm leading-6 text-slate-600">{resume.workAuthorization}</p>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
