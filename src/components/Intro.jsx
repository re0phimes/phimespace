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
    let phase = 'desc' // 'desc' -> 'pause' -> 'link' -> 'done'
    let linkIdx = 0
    setDisplayText('')
    setLinkText('')
    setTypingDone(false)
    setShowCursor(true)

    const getDelay = (char) => {
      if ('，。！？、；：'.includes(char)) return 180 + Math.random() * 120
      if (',.!?;:'.includes(char)) return 150 + Math.random() * 100
      if (' '.includes(char)) return 40 + Math.random() * 30
      return 20 + Math.random() * 40
    }

    const type = () => {
      if (phase === 'desc') {
        i++
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i))
          intervalRef.current = setTimeout(type, getDelay(fullText[i - 1]))
        } else {
          phase = 'pause'
          intervalRef.current = setTimeout(type, 400)
        }
      } else if (phase === 'pause') {
        phase = 'link'
        intervalRef.current = setTimeout(type, 200)
      } else if (phase === 'link') {
        linkIdx++
        if (linkIdx <= learnMore.length) {
          setLinkText(learnMore.slice(0, linkIdx))
          intervalRef.current = setTimeout(type, 200 + Math.random() * 150)
        } else {
          phase = 'done'
          setTypingDone(true)
          setShowCursor(false)
          onTypingDone?.()
        }
      }
    }
    intervalRef.current = setTimeout(type, 300)
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
