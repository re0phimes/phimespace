import { useDarkMode } from './hooks/useDarkMode'
import { GridBackground } from './components/GridBackground'
import { Navbar } from './components/Navbar'
import { SiteCard } from './components/SiteCard'
import { sites } from './data/sites'

function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <>
      <GridBackground />
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
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
      <footer className="text-center py-8 text-sm text-gray-400 dark:text-gray-600">
        © 2026 Phimes
      </footer>
    </>
  )
}

export default App
