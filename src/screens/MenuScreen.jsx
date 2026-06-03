import { useState, useMemo } from 'react'
import { MENU, CATEGORIES } from '../data/menu'
import MenuCard from '../components/MenuCard'
import { useStore } from '../store'

export default function MenuScreen() {
  const { points } = useStore()
  const [activeCat, setActiveCat] = useState('beef')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q) return MENU.filter((m) => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))
    return MENU.filter((m) => m.cat === activeCat)
  }, [activeCat, query])

  return (
    <div className="screen">
      <TopBar title="Menu" points={points} />

      <div className="search-wrap">
        <input
          className="search"
          placeholder="🔍 Search a burger, shake or fries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!query && (
        <nav className="cat-nav">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={'cat-pill' + (activeCat === c.id ? ' active' : '')}
              onClick={() => setActiveCat(c.id)}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </nav>
      )}

      <div className="screen-body">
        <h2 className="cat-title">
          {query ? `Results (${filtered.length})` : CATEGORIES.find((c) => c.id === activeCat)?.label}
        </h2>
        <div className="grid">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
          {filtered.length === 0 && <p className="muted-note">No results for “{query}”.</p>}
        </div>
      </div>
    </div>
  )
}

export function TopBar({ title, points }) {
  const { setTab } = useStore()
  return (
    <header className="topbar">
      <img className="topbar-logo" src={`${import.meta.env.BASE_URL}logo-white.png`} alt="Burger 'n Shake" />
      <button className="points-pill" onClick={() => setTab('rewards')}>
        💳 {points} pt
      </button>
    </header>
  )
}
