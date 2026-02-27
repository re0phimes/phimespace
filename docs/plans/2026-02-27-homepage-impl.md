# Phimes Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React navigation homepage with animated grid background, rotating hover cards, and dark/light toggle.

**Architecture:** Single-page React app with Vite + Tailwind CSS v4. Components: App (root), Navbar, GridBackground, SiteCard. Dark mode via class strategy with localStorage persistence.

**Tech Stack:** React 18, Vite, Tailwind CSS v4, Vercel deployment

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- Create: `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Step 1: Initialize Vite React project**

Run:
```bash
cd C:/Users/re0ph/Code/phimes-homepage
npm create vite@latest . -- --template react
```

**Step 2: Install Tailwind CSS v4**

Run:
```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Vite with Tailwind plugin**

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Step 4: Setup Tailwind in CSS**

`src/index.css`:
```css
@import "tailwindcss";
```

**Step 5: Clean up default files**

Remove default Vite boilerplate from `src/App.jsx`, `src/App.css`. Delete `src/App.css`.

**Step 6: Verify dev server runs**

Run: `npm run dev`
Expected: Blank page loads without errors.

**Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold React + Vite + Tailwind CSS v4 project"
```

---

## Task 2: Dark Mode Infrastructure

**Files:**
- Create: `src/hooks/useDarkMode.js`
- Modify: `src/App.jsx`
- Modify: `index.html` (add class to html tag)

**Step 1: Create useDarkMode hook**

`src/hooks/useDarkMode.js`:
```js
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return [dark, setDark]
}
```

**Step 2: Wire into App**

`src/App.jsx`:
```jsx
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [dark, setDark] = useDarkMode()
  return <div>Dark: {dark ? 'yes' : 'no'}</div>
}

export default App
```

**Step 3: Verify toggle works**

Run: `npm run dev`
Expected: Page shows dark mode state, check localStorage persists.

**Step 4: Commit**

```bash
git add src/hooks/useDarkMode.js src/App.jsx
git commit -m "feat: add dark mode hook with localStorage persistence"
```

---

## Task 3: Grid Background Component

**Files:**
- Create: `src/components/GridBackground.jsx`

**Step 1: Create GridBackground component**

`src/components/GridBackground.jsx`:
```jsx
export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white dark:bg-gray-950">
      <div
        className="absolute inset-0 animate-grid-move"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
        }}
      />
      <div
        className="absolute inset-0 dark:block hidden animate-grid-move"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white dark:to-gray-950 pointer-events-none" />
    </div>
  )
}
```

**Step 2: Add grid animation to Tailwind config**

In `src/index.css`, add custom animation:
```css
@import "tailwindcss";

@theme {
  --animate-grid-move: grid-move 8s linear infinite;
}

@keyframes grid-move {
  from { background-position: 0 0, 0 0; }
  to { background-position: 60px 60px, 60px 60px; }
}
```

**Step 3: Add to App and verify**

Add `<GridBackground />` to App.jsx. Verify grid animates diagonally.

**Step 4: Commit**

```bash
git add src/components/GridBackground.jsx src/index.css src/App.jsx
git commit -m "feat: add animated grid background with dark mode support"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `src/components/Navbar.jsx`
- Modify: `src/App.jsx`

**Step 1: Create Navbar**

`src/components/Navbar.jsx`:
```jsx
export function Navbar({ dark, onToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/70 dark:bg-gray-950/70 border-b border-gray-200/50 dark:border-gray-800/50">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Phimes
      </span>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        aria-label="Toggle dark mode"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}
```

**Step 2: Wire into App**

```jsx
import { useDarkMode } from './hooks/useDarkMode'
import { GridBackground } from './components/GridBackground'
import { Navbar } from './components/Navbar'

function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <>
      <GridBackground />
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <main className="pt-20 px-6" />
    </>
  )
}
export default App
```

**Step 3: Verify navbar renders, toggle works**

Run: `npm run dev`
Expected: Navbar fixed at top, toggle switches theme.

**Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/App.jsx
git commit -m "feat: add navbar with dark mode toggle"
```

---

## Task 5: Site Card Component

**Files:**
- Create: `src/components/SiteCard.jsx`
- Create: `src/data/sites.js`

**Step 1: Create sites data**

`src/data/sites.js`:
```js
export const sites = [
  {
    name: 'AI FAQ',
    url: 'https://aifaq.phimes.top',
    description: 'AI 问答知识库',
    screenshot: '/screenshots/aifaq.png',
    rotation: -2,
  },
  {
    name: 'Demo',
    url: 'https://demo.phimes.top',
    description: '项目演示',
    screenshot: '/screenshots/demo.png',
    rotation: 1.5,
  },
  {
    name: 'Blog',
    url: 'https://blog.phimes.top',
    description: '技术博客',
    screenshot: '/screenshots/blog.png',
    rotation: -1,
  },
]
```

**Step 2: Create SiteCard component**

`src/components/SiteCard.jsx`:
```jsx
export function SiteCard({ name, url, description, screenshot, rotation }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:rotate-0 hover:shadow-2xl"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={screenshot}
          alt={`${name} screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </a>
  )
}
```

**Step 3: Create placeholder screenshots directory**

Run:
```bash
mkdir -p public/screenshots
```

Place placeholder images or create simple colored rectangles for testing.

**Step 4: Wire cards into App**

Update `src/App.jsx` main section:
```jsx
import { sites } from './data/sites'
import { SiteCard } from './components/SiteCard'

// Inside App return, replace <main>:
<main className="pt-24 px-6 pb-12 max-w-5xl mx-auto">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
      Phimes
    </h1>
    <p className="text-gray-500 dark:text-gray-400">
      探索我的项目
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {sites.map((site) => (
      <SiteCard key={site.name} {...site} />
    ))}
  </div>
</main>
```

**Step 5: Verify cards render with rotation and hover effect**

Run: `npm run dev`
Expected: 3 cards with slight rotation, hover scales up and rotates to 0.

**Step 6: Commit**

```bash
git add src/components/SiteCard.jsx src/data/sites.js src/App.jsx public/screenshots
git commit -m "feat: add site cards with rotation and hover animation"
```

---

## Task 6: Final Polish & Deploy Config

**Files:**
- Modify: `index.html` (title, meta tags)
- Modify: `src/App.jsx` (footer)

**Step 1: Update HTML meta**

In `index.html`, set:
- `<title>Phimes</title>`
- Add meta description
- Add favicon if available

**Step 2: Add simple footer**

```jsx
<footer className="text-center py-8 text-sm text-gray-400 dark:text-gray-600">
  © 2026 Phimes
</footer>
```

**Step 3: Build and verify**

Run:
```bash
npm run build
npm run preview
```
Expected: Production build works, all features functional.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add meta tags and footer, ready for deploy"
```

**Step 5: Deploy to Vercel**

Run:
```bash
npx vercel
```
Or connect GitHub repo to Vercel dashboard.
