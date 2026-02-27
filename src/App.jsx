import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import { GridBackground } from './components/GridBackground'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { About } from './pages/About'

function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <BrowserRouter>
      <GridBackground />
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="text-center py-8 text-sm text-gray-400 dark:text-gray-600">
        © 2026 Phimes
      </footer>
    </BrowserRouter>
  )
}

export default App
