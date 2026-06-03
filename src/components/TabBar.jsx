import { useStore } from '../store'

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'menu', label: 'Menu', icon: '🍔' },
  { id: 'rewards', label: 'Rewards', icon: '💳' },
  { id: 'locations', label: 'Locations', icon: '📍' },
  { id: 'account', label: 'Account', icon: '👤' },
]

export default function TabBar() {
  const { tab, setTab, cartCount, setCartOpen } = useStore()
  return (
    <>
      {cartCount > 0 && (
        <button className="fab-cart" onClick={() => setCartOpen(true)}>
          🛒<span className="fab-badge">{cartCount}</span>
        </button>
      )}
      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={'tab' + (tab === t.id ? ' active' : '')}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
