import { useState } from 'react'
import { useStore, euro } from '../store'
import { EXTRAS, SAUCES, MENU_UPGRADE } from '../data/menu'

const CUSTOMIZABLE = ['beef', 'chicken', 'veggie']
const emojiFor = (cat) =>
  ({ beef: '🍔', chicken: '🍗', veggie: '🥬', menus: '🍱', hotdogs: '🌭', loaded: '🍟', sides: '🍟', shakes: '🥤', drinks: '🧊' }[cat] || '🍴')

export default function ItemModal() {
  const { selected: item, setSelected, addLine } = useStore()
  const isBurger = CUSTOMIZABLE.includes(item.cat)
  const [qty, setQty] = useState(1)
  const [extras, setExtras] = useState([])
  const [sauce, setSauce] = useState(SAUCES[0])
  const [makeMenu, setMakeMenu] = useState(false)

  const close = () => setSelected(null)

  const unit =
    item.price +
    (makeMenu ? MENU_UPGRADE.price : 0) +
    extras.reduce((s, id) => s + (EXTRAS.find((e) => e.id === id)?.price || 0), 0)
  const total = unit * qty

  const toggleExtra = (id) =>
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]))

  const handleAdd = () => {
    const opts = []
    if (isBurger) {
      if (makeMenu) opts.push('🍱 As a menu')
      opts.push('Sauce: ' + sauce)
      extras.forEach((id) => opts.push(EXTRAS.find((e) => e.id === id)?.label))
    }
    addLine({ name: item.name, qty, unit, lineTotal: total, options: opts.filter(Boolean), emoji: emojiFor(item.cat) })
    close()
  }

  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>✕</button>
        <div className="modal-art" style={{ '--accent': item.accent }}>
          <span>{emojiFor(item.cat)}</span>
        </div>
        <div className="modal-body">
          <h2>{item.name}</h2>
          <p className="modal-desc">{item.desc}</p>

          {isBurger && (
            <>
              <button className={'menu-toggle' + (makeMenu ? ' on' : '')} onClick={() => setMakeMenu((m) => !m)}>
                <span className="menu-toggle-text">
                  <strong>Make it a menu</strong>
                  <small>Small fries + sauce + soft drink</small>
                </span>
                <span className="menu-toggle-right">
                  <span className="menu-toggle-price">+ {euro(MENU_UPGRADE.price)}</span>
                  <span className="switch" aria-hidden />
                </span>
              </button>

              <div className="opt-group">
                <h4>Choose your sauce</h4>
                <div className="chips">
                  {SAUCES.map((s) => (
                    <button key={s} className={'chip' + (sauce === s ? ' active' : '')} onClick={() => setSauce(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="opt-group">
                <h4>Extras</h4>
                <div className="extras">
                  {EXTRAS.map((e) => (
                    <label key={e.id} className={'extra' + (extras.includes(e.id) ? ' on' : '')}>
                      <span>
                        <input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggleExtra(e.id)} />
                        {e.label}
                      </span>
                      <span className="extra-price">+ {euro(e.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="modal-foot">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn-primary wide" onClick={handleAdd}>
              Add · {euro(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
