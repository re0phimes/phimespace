import { useDarkMode } from './hooks/useDarkMode'
import { GridBackground } from './components/GridBackground'
import { Navbar } from './components/Navbar'

function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <>
      <GridBackground />
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <main className="pt-20 px-6" />
    </>
  )
}

export default App
