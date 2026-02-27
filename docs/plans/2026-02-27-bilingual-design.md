# Bilingual Support Design

## Date: 2026-02-27

## Overview

Add Chinese/English bilingual support to phimes-homepage using a lightweight React Context approach with zero external dependencies.

## Decisions

- **Default language**: Auto-detect via `navigator.language`, fallback to English
- **Switching**: Toggle button in Navbar (alongside dark mode toggle)
- **Persistence**: `localStorage` for user preference
- **i18n approach**: Single translation object file + React Context + `t()` function
- **Routing**: No URL-based locale (no /en /zh prefixes)

## Architecture

### New Files

- `src/i18n/translations.js` — flat key-value translation object for zh/en
- `src/i18n/LanguageContext.jsx` — React Context providing `locale`, `setLocale`, `t(key)`

### Modified Files

| File | Change |
|------|--------|
| `App.jsx` | Wrap with `LanguageProvider` |
| `Navbar.jsx` | Add language toggle button |
| `Intro.jsx` | Use `t()`, reset typewriter on locale change |
| `data/sites.js` | Export function or use `t()` in Home |
| `pages/Home.jsx` | Pass translated descriptions to SiteCard |
| `pages/About.jsx` | Replace all hardcoded Chinese with `t()` |

### Unchanged

- GridBackground, SiteCard component structure
- Routing structure (/ and /about)
- Dark mode logic
- External links

## Translation Strings (~15 keys)

Organized by component: intro.*, site.*, about.*

## Typewriter Behavior

On language switch, Intro typewriter resets and replays with new language text.
