import { StoreProvider, useStore, euro } from './store'
import { MENU, CATEGORIES } from './data/menu'
import { USER, tierFor } from './data/app'
import TabBar from './components/TabBar'
import Toast from './components/Toast'
import ItemModal from './components/ItemModal'
import CartDrawer from './components/CartDrawer'
import MenuCard from './components/MenuCard'
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import RewardsScreen from './screens/RewardsScreen'
import LocationsScreen from './screens/LocationsScreen'
import AccountScreen from './screens/AccountScreen'

const LOGO = `${import.meta.env.BASE_URL}logo-white.png`
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function App() {
  return (
    <StoreProvider>
      <Page />
    </StoreProvider>
  )
}

function Page() {
  const { selected, cartOpen, cartCount, setCartOpen } = useStore()
  return (
    <div className="page">
      <LandingNav />
      <Hero />
      <Features />
      <RewardsSection />
      <MenuSection />
      <AppSection />
      <Footer />

      {/* Globale overlays (volledig scherm) */}
      {selected && <ItemModal />}
      {cartOpen && <CartDrawer />}
      <Toast />

      {/* Drijvende winkelmand-knop voor de hele pagina */}
      {cartCount > 0 && !cartOpen && (
        <button className="page-cart" onClick={() => setCartOpen(true)}>
          🛒 View cart<span className="page-cart-badge">{cartCount}</span>
        </button>
      )}
    </div>
  )
}

function LandingNav() {
  const { points, cartCount, setCartOpen } = useStore()
  return (
    <nav className="lp-nav">
      <img className="lp-nav-logo" src={LOGO} alt="Burger 'n Shake" />
      <div className="lp-nav-right">
        <button className="lp-nav-link" onClick={() => scrollTo('menu')}>Menu</button>
        <button className="lp-nav-link" onClick={() => scrollTo('rewards')}>Rewards</button>
        <button className="lp-nav-link hide-sm" onClick={() => scrollTo('app')}>Live app</button>
        <span className="points-pill">💳 {points} pts</span>
        <button className="lp-nav-cart" onClick={() => setCartOpen(true)}>
          🛒{cartCount > 0 && <span className="lp-nav-cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="lp-hero">
      <span className="lp-eyebrow">Concept demo · Burger 'n Shake</span>
      <h1 className="lp-title">
        A loyalty-first ordering app<br />for <span>Burger 'n Shake</span>
      </h1>
      <p className="lp-sub">
        Order your favourites in a few taps, earn points on every order, and watch them add up on a
        sleek, Apple&nbsp;Card-style rewards card. Browse the full menu below, or try the live
        interactive app.
      </p>
      <div className="lp-hero-actions">
        <button className="btn-primary" onClick={() => scrollTo('menu')}>Browse the menu →</button>
        <button className="btn-ghost" onClick={() => scrollTo('app')}>Try the live app</button>
      </div>
    </header>
  )
}

function Features() {
  const items = [
    { icon: '🍔', title: 'Tap to order', text: 'The full menu in your pocket. Customise any burger, add extras, or turn it into a menu.' },
    { icon: '💳', title: 'Apple Card-style rewards', text: 'A beautiful points card with tiers from Bronze to Black and rewards you can redeem.' },
    { icon: '🔁', title: 'Quick reorder', text: 'Your favourites are one tap away — reorder a previous meal in seconds.' },
    { icon: '📍', title: 'Store finder', text: 'See every location nearby with live open/closed status and directions.' },
  ]
  return (
    <section className="lp-features">
      {items.map((f) => (
        <div className="lp-feature" key={f.title}>
          <span className="lp-feature-icon">{f.icon}</span>
          <strong>{f.title}</strong>
          <p>{f.text}</p>
        </div>
      ))}
    </section>
  )
}

function RewardsSection() {
  const { points } = useStore()
  const { current, next, progress } = tierFor(points)
  return (
    <section className="lp-rewards" id="rewards">
      <div className="lp-rewards-text">
        <span className="lp-eyebrow green">The Rewards Card</span>
        <h2>Every order earns points — like a digital loyalty card, reimagined.</h2>
        <ul className="lp-list">
          <li><b>Earn automatically</b> — 1 point for every €1 you spend, with no stamps or paper cards.</li>
          <li><b>Level up</b> — climb from Bronze to Silver, Gold and Black, unlocking better perks at each tier.</li>
          <li><b>Redeem instantly</b> — swap points for free fries, shakes, hot dogs or a free burger.</li>
          <li><b>Full history</b> — an Apple&nbsp;Card-style activity feed shows every order and reward.</li>
        </ul>
        <button className="btn-primary" onClick={() => scrollTo('app')}>See it in the live app →</button>
      </div>

      <div className="lp-card-preview">
        <div className="loyalty-card">
          <div className="lc-sheen" />
          <div className="lc-top">
            <img className="lc-logo" src={LOGO} alt="Burger 'n Shake" />
            <span className="lc-chip" />
          </div>
          <div className="lc-mid">
            <span className="lc-label">Balance</span>
            <div className="lc-points">{points.toLocaleString('en-US')} <small>pts</small></div>
          </div>
          <div className="lc-bottom">
            <div>
              <span className="lc-name">{USER.name}</span>
              <span className="lc-num">{USER.cardNumber}</span>
            </div>
            <span className="lc-tier" style={{ '--tier': current.color }}>{current.name}</span>
          </div>
        </div>
        <p className="lp-card-caption">
          {next ? `${next.min - points} points to ${next.name} · ${Math.round(progress * 100)}% there` : 'Top tier reached'}
        </p>
      </div>
    </section>
  )
}

function MenuSection() {
  return (
    <section className="lp-menu" id="menu">
      <div className="lp-menu-head">
        <span className="lp-eyebrow green">The full menu</span>
        <h2>Tap any item to customise and add it to your order.</h2>
        <p className="lp-sub center">Real items and prices — beef, crispy chicken, veggie, hot dogs, loaded fries, shakes and more.</p>
      </div>

      {CATEGORIES.map((cat) => {
        const items = MENU.filter((m) => m.cat === cat.id)
        if (!items.length) return null
        return (
          <div className="lp-cat" key={cat.id}>
            <h3 className="lp-cat-title">
              <span>{cat.emoji}</span> {cat.label}
            </h3>
            <div className="lp-grid">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

function AppSection() {
  return (
    <section className="lp-app" id="app">
      <div className="lp-app-head">
        <span className="lp-eyebrow green">Try the live app</span>
        <h2>The full experience — click around.</h2>
        <p className="lp-sub center">
          A working prototype of the mobile app: browse, customise, check out, and explore the
          Rewards card. Use the tabs at the bottom to switch screens.
        </p>
      </div>
      <Device />
    </section>
  )
}

function Device() {
  const { tab } = useStore()
  return (
    <div className="device">
      <div className="screen-wrap">
        {tab === 'home' && <HomeScreen />}
        {tab === 'menu' && <MenuScreen />}
        {tab === 'rewards' && <RewardsScreen />}
        {tab === 'locations' && <LocationsScreen />}
        {tab === 'account' && <AccountScreen />}
      </div>
      <TabBar />
    </div>
  )
}

function Footer() {
  return (
    <footer className="lp-footer">
      <img className="lp-footer-logo" src={LOGO} alt="Burger 'n Shake" />
      <p>Interactive concept demo · 100% Halal · Fresh · Homemade</p>
      <small>Not affiliated — built as a design demo for Burger 'n Shake.</small>
    </footer>
  )
}
