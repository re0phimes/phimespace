import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Intro() {
  const { locale, t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const intervalRef = useRef(null)

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
