export function Navbar({ dark, onToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Phimes
      </span>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        aria-label="Toggle dark mode"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}
