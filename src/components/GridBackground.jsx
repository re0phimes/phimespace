export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white dark:bg-gray-950">
      <div
        className="absolute inset-0 animate-grid-move dark:hidden"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
        }}
      />
      <div
        className="absolute inset-0 animate-grid-move hidden dark:block"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white dark:to-gray-950 pointer-events-none" />
    </div>
  )
}
