# Bilingual Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Chinese/English bilingual support with auto-detection, localStorage persistence, and a Navbar toggle button.

**Architecture:** Lightweight React Context (`LanguageContext`) provides `locale`, `setLocale`, and `t(key)` to all components. A single `translations.js` file holds all zh/en strings as a flat key-value map. No external i18n libraries.

**Tech Stack:** React 19, react-router-dom 7, Tailwind CSS v4, Vite 7

---

### Task 1: Create translation strings file

**Files:**
- Create: `src/i18n/translations.js`

**Step 1: Create the translations file**

```js
// src/i18n/translations.js
export const translations = {
  zh: {
    'intro.subtitle': '一个热爱技术的开发者',
    'intro.description':
      '热衷于探索 AI、Web 开发和开源项目。这里汇集了我的实验场、知识库和技术博客，欢迎随意浏览。',
    'intro.learnMore': '了解更多 →',
    'site.aifaq': 'AI 问答知识库',
    'site.blog': '技术博客',
    'site.demo': '项目演示',
    'about.name': '陈老师',
    'about.affiliation1': '中国科学院 · 全栈工程师',
    'about.affiliation2': '滑铁卢大学 · 数学',
    'about.techStack': '技术栈',
    'about.links': '链接',
    'about.wechat': '公众号',
    'about.wechatTip': '微信搜索：别偷着学了带带我啊',
    'about.back': '← 返回首页',
  },
  en: {
    'intro.subtitle': 'A developer who loves technology',
    'intro.description':
      'Passionate about AI, web development, and open source. Here you\'ll find my lab, knowledge base, and tech blog — feel free to explore.',
    'intro.learnMore': 'Learn more →',
    'site.aifaq': 'AI Q&A Knowledge Base',
    'site.blog': 'Tech Blog',
    'site.demo': 'Project Demos',
    'about.name': 'Mr. Chen',
    'about.affiliation1': 'Chinese Academy of Sciences · Full-Stack Engineer',
    'about.affiliation2': 'University of Waterloo · Mathematics',
    'about.techStack': 'Tech Stack',
    'about.links': 'Links',
    'about.wechat': 'WeChat',
    'about.wechatTip': 'Search on WeChat: 别偷着学了带带我啊',
    'about.back': '← Back to Home',
  },
}
```

**Step 2: Commit**

```bash
git add src/i18n/translations.js
git commit -m "feat: add bilingual translation strings (zh/en)"
```

---

### Task 2: Create LanguageContext and useLanguage hook

**Files:**
- Create: `src/i18n/LanguageContext.jsx`

**Step 1: Create the context file**

```jsx
// src/i18n/LanguageContext.jsx
import { createContext, useContext, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

function detectLocale() {
  const saved = localStorage.getItem('locale')
  if (saved && translations[saved]) return saved
  const browserLang = navigator.language || ''
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)

  const setLocale = (lang) => {
    setLocaleState(lang)
    localStorage.setItem('locale', lang)
  }

  const t = (key) => {
    return translations[locale]?.[key] ?? translations['zh']?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```

**Step 2: Commit**

```bash
git add src/i18n/LanguageContext.jsx
git commit -m "feat: add LanguageContext with auto-detection and localStorage"
```

---

### Task 3: Wrap App with LanguageProvider

**Files:**
- Modify: `src/App.jsx`

**Step 1: Add LanguageProvider wrapper**

Add import at top:
```js
import { LanguageProvider } from './i18n/LanguageContext'
```

Wrap the `<BrowserRouter>` content with `<LanguageProvider>`:
```jsx
function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <BrowserRouter>
      <LanguageProvider>
        <GridBackground />
        <Navbar dark={dark} onToggle={() => setDark(!dark)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer className="text-center py-8 text-sm text-gray-400 dark:text-gray-600">
          © 2026 Phimes
        </footer>
      </LanguageProvider>
    </BrowserRouter>
  )
}
```

**Step 2: Verify dev server runs without errors**

Run: `npx vite build` — should succeed with no errors.

**Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wrap App with LanguageProvider"
```

---

### Task 4: Add language toggle to Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`

**Step 1: Add language toggle button**

Add import:
```js
import { useLanguage } from '../i18n/LanguageContext'
```

Inside the `Navbar` function, add:
```js
const { locale, setLocale } = useLanguage()
```

Add a new button next to the dark mode toggle (before the existing button), inside the `<nav>` flex container. Wrap both buttons in a `<div className="flex items-center gap-1">`:

```jsx
export function Navbar({ dark, onToggle }) {
  const { locale, setLocale } = useLanguage()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Phimes
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors text-sm font-medium"
          aria-label="Toggle language"
        >
          {locale === 'zh' ? 'EN' : '中'}
        </button>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Toggle dark mode"
        >
          {/* existing sun/moon SVGs unchanged */}
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
```

**Step 2: Verify** — language button shows "EN" when in Chinese, "中" when in English. Clicking toggles.

**Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add language toggle button to Navbar"
```

---

### Task 5: Internationalize Intro component

**Files:**
- Modify: `src/components/Intro.jsx`

**Step 1: Replace hardcoded text with `t()` and reset typewriter on locale change**

```jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Intro() {
  const { locale, t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const intervalRef = useRef(null)

  // Reset expanded state when locale changes
  useEffect(() => {
    setExpanded(false)
  }, [locale])

  useEffect(() => {
    const fullText = t('intro.description')
    if (expanded) {
      let i = 0
      setDisplayText('')
      setTypingDone(false)
      intervalRef.current = setInterval(() => {
        i++
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i))
        } else {
          clearInterval(intervalRef.current)
          setTypingDone(true)
        }
      }, 25)
    } else {
      clearInterval(intervalRef.current)
      setDisplayText('')
      setTypingDone(false)
    }
    return () => clearInterval(intervalRef.current)
  }, [expanded, locale])

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Phimes
      </h1>
      <p
        className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {t('intro.subtitle')}
        <span className="ml-1 text-xs">{expanded ? '▲' : '▼'}</span>
      </p>
      {expanded && (
        <div className="mt-3">
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            {displayText}
            {!typingDone && <span className="animate-pulse">|</span>}
          </p>
          {typingDone && (
            <Link
              to="/about"
              className="inline-block mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors underline underline-offset-4"
            >
              {t('intro.learnMore')}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
```

Key changes:
- Import `useLanguage`, get `locale` and `t`
- `useEffect` on `locale` resets `expanded` to false (collapses and re-triggers typewriter on next expand)
- `FULL_TEXT` replaced with `t('intro.description')` inside the effect
- `SHORT_TEXT` replaced with `t('intro.subtitle')`
- `了解更多 →` replaced with `t('intro.learnMore')`
- Added `locale` to the typewriter `useEffect` dependency array

**Step 2: Commit**

```bash
git add src/components/Intro.jsx
git commit -m "feat: internationalize Intro component with typewriter reset"
```

---

### Task 6: Internationalize Home page and sites data

**Files:**
- Modify: `src/data/sites.js`
- Modify: `src/pages/Home.jsx`

**Step 1: Add translation keys to sites data**

Replace `description` strings with translation keys:

```js
// src/data/sites.js
export const sites = [
  {
    name: 'AI FAQ',
    url: 'https://aifaq.phimes.top',
    descriptionKey: 'site.aifaq',
    screenshot: '/screenshots/aifaq.png',
    rotation: -2,
  },
  {
    name: 'Blog',
    url: 'https://blog.phimes.top',
    descriptionKey: 'site.blog',
    screenshot: '/screenshots/blog.png',
    rotation: 1.5,
  },
  {
    name: 'Demo',
    url: 'https://demo.phimes.top',
    descriptionKey: 'site.demo',
    screenshot: '/screenshots/demo.png',
    rotation: -1,
  },
]
```

**Step 2: Update Home to translate descriptions**

```jsx
// src/pages/Home.jsx
import { Intro } from '../components/Intro'
import { SiteCard } from '../components/SiteCard'
import { sites } from '../data/sites'
import { useLanguage } from '../i18n/LanguageContext'

export function Home() {
  const { t } = useLanguage()
  return (
    <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
      <Intro />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((site) => (
          <SiteCard key={site.name} {...site} description={t(site.descriptionKey)} />
        ))}
      </div>
    </main>
  )
}
```

Note: `SiteCard` still receives `description` as a prop — no changes needed to `SiteCard.jsx`.

**Step 3: Commit**

```bash
git add src/data/sites.js src/pages/Home.jsx
git commit -m "feat: internationalize Home page and sites data"
```

---

### Task 7: Internationalize About page

**Files:**
- Modify: `src/pages/About.jsx`

**Step 1: Replace all hardcoded Chinese text with `t()`**

```jsx
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const techStack = ['Python', 'JavaScript/TypeScript', 'React', 'Node.js', 'Vue']

export function About() {
  const { t } = useLanguage()
  return (
    <main className="pt-24 px-6 pb-12 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
          Phimes
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          {t('about.name')}
        </p>
      </div>

      <div className="space-y-2 text-center mb-10 text-gray-700 dark:text-gray-300">
        <p>{t('about.affiliation1')}</p>
        <p>{t('about.affiliation2')}</p>
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-4">
          {t('about.techStack')}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-4">
          {t('about.links')}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/re0phimes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <div className="group relative">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.177-.554C23.028 18.48 24 16.82 24 14.98c0-3.21-2.994-5.862-7.062-6.122zM13.85 13.24c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.905 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
              </svg>
              {t('about.wechat')}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {t('about.wechatTip')}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link
          to="/"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          {t('about.back')}
        </Link>
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: internationalize About page"
```

---

### Task 8: Final verification

**Step 1: Build check**

Run: `npx vite build`
Expected: Build succeeds with no errors.

**Step 2: Manual verification checklist**

- [ ] Page loads, auto-detects browser language
- [ ] Navbar shows "EN" button (if browser is Chinese) or "中" button (if English)
- [ ] Clicking language toggle switches all text on Home page
- [ ] Intro typewriter resets and replays in new language when expanded
- [ ] About page shows all text in selected language
- [ ] Site card descriptions update on language switch
- [ ] Language preference persists after page refresh (localStorage)
- [ ] Dark mode toggle still works independently

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete bilingual support (zh/en)"
```
