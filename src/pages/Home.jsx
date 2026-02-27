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
