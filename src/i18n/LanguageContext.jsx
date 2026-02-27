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
