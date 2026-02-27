export function SiteCard({ name, url, description, screenshot, rotation }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="site-card group block rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-out hover:shadow-2xl"
      style={{ '--card-rotation': `${rotation}deg` }}
    >
      <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={screenshot}
          alt={`${name} screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </a>
  )
}
