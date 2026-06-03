import { USER, PAST_ORDERS, tierFor } from '../data/app'
import { useStore, euro } from '../store'
import { TopBar } from './MenuScreen'

const SETTINGS = [
  { icon: '📦', label: 'My orders' },
  { icon: '💳', label: 'Payment methods' },
  { icon: '📍', label: 'Delivery addresses' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '❤️', label: 'Favorites' },
  { icon: '🎫', label: 'Gift cards' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '❓', label: 'Help & contact' },
]

export default function AccountScreen() {
  const { points, setTab } = useStore()
  const { current } = tierFor(points)

  return (
    <div className="screen">
      <TopBar title="Account" points={points} />
      <div className="screen-body">
        <div className="profile">
          <div className="avatar">{USER.firstName[0]}</div>
          <div className="profile-info">
            <strong>{USER.name}</strong>
            <small>Member since {USER.memberSince}</small>
            <span className="profile-tier" style={{ '--tier': current.color }}>💳 {current.name} · {points} pts</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat"><strong>{PAST_ORDERS.length}</strong><small>orders</small></div>
          <div className="stat"><strong>{points}</strong><small>points</small></div>
          <div className="stat"><strong>{current.name}</strong><small>tier</small></div>
        </div>

        <section className="home-section">
          <div className="section-row"><h2>Recent orders</h2></div>
          {PAST_ORDERS.map((o) => (
            <div className="order-row" key={o.id}>
              <div className="order-info">
                <strong>{o.items}</strong>
                <small>{o.date} · {o.status}</small>
              </div>
              <span className="order-total">{euro(o.total)}</span>
            </div>
          ))}
        </section>

        <section className="home-section">
          <div className="settings-list">
            {SETTINGS.map((s) => (
              <button key={s.label} className="setting-row" onClick={() => s.label === 'My orders' && setTab('home')}>
                <span className="setting-icon">{s.icon}</span>
                {s.label}
                <span className="setting-arrow">›</span>
              </button>
            ))}
          </div>
        </section>

        <button className="btn-ghost wide logout">Log out</button>
        <p className="version">Burger 'n Shake · v2.0</p>
      </div>
    </div>
  )
}
