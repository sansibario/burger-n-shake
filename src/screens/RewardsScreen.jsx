import { useStore } from '../store'
import { USER, TIERS, tierFor, REWARDS } from '../data/app'
import { TopBar } from './MenuScreen'

export default function RewardsScreen() {
  const { points, redeem, redeemed, activity } = useStore()
  const { current, next, progress } = tierFor(points)
  const toNext = next ? next.min - points : 0

  return (
    <div className="screen">
      <TopBar title="Rewards" points={points} />

      <div className="screen-body rewards">
        {/* APPLE CARD-STIJL SPAARKAART */}
        <div className="loyalty-card">
          <div className="lc-sheen" />
          <div className="lc-top">
            <img className="lc-logo" src={`${import.meta.env.BASE_URL}logo-white.png`} alt="Burger 'n Shake" />
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

        {/* TIER PROGRESSIE + RING */}
        <div className="tier-panel">
          <Ring progress={progress} color={current.color} />
          <div className="tier-info">
            {next ? (
              <>
                <h3>{toNext} points to go until {next.name}</h3>
                <p>{next.perk}</p>
                <div className="tier-bar"><div style={{ width: `${progress * 100}%`, background: next.color }} /></div>
              </>
            ) : (
              <>
                <h3>You've reached the top tier 🖤</h3>
                <p>{current.perk}</p>
              </>
            )}
          </div>
        </div>

        {/* BURGER CASH uitleg (Apple Card "Daily Cash"-stijl) */}
        <div className="cashback">
          <span className="cashback-icon">⚡</span>
          <div>
            <strong>Burger Cash</strong>
            <p>You automatically earn <b>1 point per €1</b>. As {current.name}: {current.perk}.</p>
          </div>
        </div>

        {/* TIERS OVERZICHT */}
        <div className="tiers-row">
          {TIERS.map((t) => (
            <div key={t.id} className={'tier-chip' + (t.id === current.id ? ' active' : '')}>
              <span className="tier-dot" style={{ background: t.color }} />
              {t.name}
              <small>{t.min}+</small>
            </div>
          ))}
        </div>

        {/* INWISSELEN */}
        <section className="home-section">
          <div className="section-row"><h2>Redeem your points 🎁</h2></div>
          <div className="rewards-grid">
            {REWARDS.map((r) => {
              const can = points >= r.cost
              return (
                <button key={r.id} className={'reward-card' + (can ? '' : ' locked')} onClick={() => redeem(r.id)}>
                  <span className="reward-emoji">{r.emoji}</span>
                  <strong>{r.name}</strong>
                  <span className={'reward-cost' + (can ? '' : ' lock')}>{can ? `${r.cost} pts` : `🔒 ${r.cost} pts`}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ACTIEVE BELONINGEN */}
        {redeemed.length > 0 && (
          <section className="home-section">
            <div className="section-row"><h2>Ready to use</h2></div>
            {redeemed.map((r, i) => (
              <div className="voucher" key={i}>
                <span className="voucher-emoji">{r.emoji}</span>
                <div className="voucher-info">
                  <strong>{r.name}</strong>
                  <small>Show this code at the counter</small>
                </div>
                <span className="voucher-code">{r.code}</span>
              </div>
            ))}
          </section>
        )}

        {/* ACTIVITEIT / TRANSACTIES */}
        <section className="home-section">
          <div className="section-row"><h2>Activity</h2></div>
          <div className="activity">
            {activity.map((a) => (
              <div className="act-row" key={a.id}>
                <span className="act-emoji">{a.emoji}</span>
                <div className="act-info">
                  <strong>{a.title}</strong>
                  <small>{a.date}{a.amount > 0 ? ` · €${a.amount.toFixed(2)}` : ''}</small>
                </div>
                <span className={'act-points' + (a.points < 0 ? ' neg' : '')}>
                  {a.points > 0 ? '+' : ''}{a.points} pts
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Ring({ progress, color }) {
  const R = 34
  const C = 2 * Math.PI * R
  return (
    <svg className="ring" width="84" height="84" viewBox="0 0 84 84">
      <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
      <circle
        cx="42" cy="42" r={R} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={C * (1 - progress)} transform="rotate(-90 42 42)"
      />
      <text x="42" y="47" textAnchor="middle" className="ring-text">{Math.round(progress * 100)}%</text>
    </svg>
  )
}
