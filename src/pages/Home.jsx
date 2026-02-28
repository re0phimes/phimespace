import { useState } from 'react'
import { Intro } from '../components/Intro'
import { SiteCard } from '../components/SiteCard'
import { sites } from '../data/sites'
import { useLanguage } from '../i18n/LanguageContext'

export function Home() {
  const { t } = useLanguage()
  const [cardsPhase, setCardsPhase] = useState('')

  const handleTypingDone = () => {
    setCardsPhase('cards-enter')
    // entrance animation: last card starts at 0.3s + 0.6s duration = ~0.9s
    setTimeout(() => setCardsPhase('cards-pulse'), 950)
  }

  return (
    <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto">
      <Intro onTypingDone={handleTypingDone} />
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${cardsPhase}`}>
        {sites.map((site) => (
          <SiteCard key={site.name} {...site} description={t(site.descriptionKey)} />
        ))}
      </div>
    </main>
  )
}
