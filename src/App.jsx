import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [dark, setDark] = useDarkMode()
  return <div>Dark: {dark ? 'yes' : 'no'}</div>
}

export default App
