import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Intro() {
  const { locale, t } = useLanguage()
  const [displayText, setDisplayText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const fullText = t('intro.description')
    let i = 0
    setDisplayText('')
    setTypingDone(false)

    const getDelay = (char) => {
      if ('，。！？、；：'.includes(char)) return 180 + Math.random() * 120
      if (',.!?;:'.includes(char)) return 150 + Math.random() * 100
      if (' '.includes(char)) return 40 + Math.random() * 30
      return 20 + Math.random() * 40
    }

    const type = () => {
      i++
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i))
        intervalRef.current = setTimeout(type, getDelay(fullText[i - 1]))
      } else {
        setTypingDone(true)
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
          {!typingDone && <span className="animate-pulse">|</span>}
        </p>
        {typingDone && (
          <Link
            to="/about"
            className="inline-block mt-4 px-5 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline underline-offset-4"
          >
            {t('intro.learnMore')}
          </Link>
        )}
      </div>
    </div>
  )
}
