import { Link, useLocation } from 'react-router-dom'

const navItems = [{ label: 'Pokédex', href: '/' }]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Brand */}
      <div style={{ marginBottom: '2rem' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          <span
            style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              <line
                x1="2"
                y1="12"
                x2="22"
                y2="12"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
          </span>
          PokéDex
        </span>
      </div>

      {/* Nav */}
      <nav>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}
        >
          {navItems.map(item => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: isActive
                      ? 'rgba(239,68,68,0.08)'
                      : 'transparent',
                    transition: 'all 0.15s'
                  }}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
