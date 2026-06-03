import { MENU, CATEGORIES } from '../data/menu'
import { PAST_ORDERS, USER } from '../data/app'
import { useStore, euro } from '../store'
import { TopBar } from './MenuScreen'
import MenuCard from '../components/MenuCard'

export default function HomeScreen() {
  const { points, setTab, addLine } = useStore()
  const popular = MENU.filter((m) => m.tag === 'Bestseller' || m.tag === 'Favoriet' || m.tag === 'Fan favorite').slice(0, 4)

  const reorder = (o) => {
    addLine({ name: o.items, qty: 1, unit: o.total, lineTotal: o.total, options: ['Quick reorder'], emoji: '🔁' })
  }

  return (
    <div className="screen">
      <TopBar title="Home" points={points} />

      <div className="screen-body">
        <section className="home-hero">
          <span className="hero-kicker">100% Halal · Fresh · Homemade</span>
          <h1>Hey {USER.firstName} 👋<br />Craving a <em>smash?</em></h1>
          <p>Freshly prepared burgers, crispy chicken and shakes made with organic ice cream.</p>
          <button className="btn-primary" onClick={() => setTab('menu')}>Order now →</button>
        </section>

        {/* Rewards teaser */}
        <button className="reward-teaser" onClick={() => setTab('rewards')}>
          <div className="reward-teaser-left">
            <span className="reward-teaser-icon">💳</span>
            <div>
              <strong>{points} points</strong>
              <small>View your Rewards Card →</small>
            </div>
          </div>
          <span className="reward-teaser-art">🎁</span>
        </button>

        {/* Snel opnieuw bestellen */}
        <section className="home-section">
          <div className="section-row">
            <h2>Quick reorder</h2>
          </div>
          <div className="hscroll">
            {PAST_ORDERS.map((o) => (
              <div className="reorder-card" key={o.id}>
                <div className="reorder-top">🔁</div>
                <strong>{o.items}</strong>
                <small>{o.date}</small>
                <div className="reorder-foot">
                  <span>{euro(o.total)}</span>
                  <button className="add-btn sm" onClick={() => reorder(o)}>+ Order</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorieën */}
        <section className="home-section">
          <div className="section-row"><h2>Categories</h2></div>
          <div className="cat-tiles">
            {CATEGORIES.slice(0, 6).map((c) => (
              <button key={c.id} className="cat-tile" onClick={() => setTab('menu')}>
                <span>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Populair */}
        <section className="home-section">
          <div className="section-row">
            <h2>Popular 🔥</h2>
            <button className="link-btn" onClick={() => setTab('menu')}>See all</button>
          </div>
          <div className="grid">
            {popular.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
