import { useDarkMode } from './hooks/useDarkMode'
import { GridBackground } from './components/GridBackground'

function App() {
  const [dark, setDark] = useDarkMode()
  return (
    <>
      <GridBackground />
      <div>Dark: {dark ? 'yes' : 'no'}</div>
    </>
  )
}

export default App
