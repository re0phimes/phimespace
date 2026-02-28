import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Intro({ onTypingDone }) {
  const { locale, t } = useLanguage()
  const [displayText, setDisplayText] = useState('')
  const [linkText, setLinkText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    const fullText = t('intro.description')
    const learnMore = t('intro.learnMore')
    let i = 0
    let phase = 'desc'
    let linkIdx = 0
    setDisplayText('')
    setLinkText('')
    setTypingDone(false)
    setShowCursor(true)

    // Target ~2s total to sync with card entrance animation
    // Budget: 100ms initial + desc + 200ms pause + link
    const descLen = fullText.length
    const linkLen = learnMore.length
    const targetTotal = 2000
    const overhead = 100 + 200
    const linkTime = linkLen * 120
    const descBudget = targetTotal - overhead - linkTime
    const baseDelay = Math.max(10, descBudget / descLen)

    const getDelay = (char) => {
      if ('，。！？、；：'.includes(char)) return baseDelay * 3 + Math.random() * 40
      if (',.!?;:'.includes(char)) return baseDelay * 2.5 + Math.random() * 30
      if (' '.includes(char)) return baseDelay * 0.5
      return baseDelay + Math.random() * (baseDelay * 0.4)
    }

    const type = () => {
      if (phase === 'desc') {
        i++
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i))
          intervalRef.current = setTimeout(type, getDelay(fullText[i - 1]))
        } else {
          phase = 'pause'
          intervalRef.current = setTimeout(type, 300)
        }
      } else if (phase === 'pause') {
        phase = 'link'
        intervalRef.current = setTimeout(type, 80)
      } else if (phase === 'link') {
        linkIdx++
        if (linkIdx <= learnMore.length) {
          setLinkText(learnMore.slice(0, linkIdx))
          intervalRef.current = setTimeout(type, 100 + Math.random() * 60)
        } else {
          phase = 'done'
          setTypingDone(true)
          setShowCursor(false)
          onTypingDone?.()
        }
      }
    }
    intervalRef.current = setTimeout(type, 100)
    return () => clearTimeout(intervalRef.current)
  }, [locale])

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Phimes
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        {t('intro.subtitle')}
      </p>
      <div className="mt-3">
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {displayText}
          {linkText && (
            <Link
              to="/about"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline underline-offset-4"
            >
              {linkText}
            </Link>
          )}
          {showCursor && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  )
}
