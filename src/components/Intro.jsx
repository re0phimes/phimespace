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

    // Target ~3.8s total to sync with card entrance animation
    // Budget: 200ms initial + desc + 300ms pause + link
    const descLen = fullText.length
    const linkLen = learnMore.length
    const targetTotal = 3800
    const overhead = 200 + 300 // initial delay + pause
    const linkTime = linkLen * 250 // ~250ms per link char
    const descBudget = targetTotal - overhead - linkTime
    const baseDelay = Math.max(15, descBudget / descLen)

    const getDelay = (char) => {
      if ('，。！？、；：'.includes(char)) return baseDelay * 4 + Math.random() * 80
      if (',.!?;:'.includes(char)) return baseDelay * 3 + Math.random() * 60
      if (' '.includes(char)) return baseDelay * 0.6
      return baseDelay + Math.random() * (baseDelay * 0.5)
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
        intervalRef.current = setTimeout(type, 100)
      } else if (phase === 'link') {
        linkIdx++
        if (linkIdx <= learnMore.length) {
          setLinkText(learnMore.slice(0, linkIdx))
          intervalRef.current = setTimeout(type, 200 + Math.random() * 100)
        } else {
          phase = 'done'
          setTypingDone(true)
          setShowCursor(false)
          onTypingDone?.()
        }
      }
    }
    intervalRef.current = setTimeout(type, 200)
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
        <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
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
