import { LOCATIONS } from '../data/app'
import { useStore } from '../store'
import { TopBar } from './MenuScreen'

export default function LocationsScreen() {
  const { points } = useStore()
  return (
    <div className="screen">
      <TopBar title="Locaties" points={points} />
      <div className="screen-body">
        <div className="map-banner">
          <span>🗺️</span>
          <div>
            <strong>Find a Burger 'n Shake</strong>
            <small>{LOCATIONS.filter((l) => l.open).length} open right now near you</small>
          </div>
        </div>

        <div className="loc-list">
          {LOCATIONS.map((l) => (
            <div className={'loc-card' + (l.featured ? ' featured' : '')} key={l.id}>
              <div className="loc-main">
                <div className="loc-head">
                  <strong>{l.name}</strong>
                  <span className={'loc-status' + (l.open ? ' open' : ' closed')}>
                    {l.open ? '● Open' : '● Closed'}
                  </span>
                </div>
                <small className="loc-addr">{l.address}</small>
                <small className="loc-hours">🕒 {l.hours}</small>
              </div>
              <div className="loc-side">
                <span className="loc-dist">{l.distance}</span>
                <button className="btn-ghost sm">Directions</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
