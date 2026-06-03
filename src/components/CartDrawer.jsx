import { useState, useEffect } from 'react'
import { useStore, euro } from '../store'

const DELIVERY = 2.5

export default function CartDrawer() {
  const { cart, cartTotal, setCartOpen, removeLine, changeQty, checkout, setTab } = useStore()
  const [done, setDone] = useState(null) // { earned }

  const close = () => setCartOpen(false)

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const grand = cartTotal + (cart.length ? DELIVERY : 0)

  const placeOrder = () => {
    const earned = checkout(grand)
    setDone({ earned })
    setTimeout(() => {
      setDone(null)
      setCartOpen(false)
      setTab('rewards')
    }, 2800)
  }

  return (
    <div className="overlay" onClick={close}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Your order</h2>
          <button className="modal-close" onClick={close}>✕</button>
        </div>

        {done ? (
          <div className="ordered">
            <div className="ordered-emoji">🎉</div>
            <h3>Order placed!</h3>
            <p>Your food is being freshly prepared.</p>
            <div className="earned-pill">+{done.earned} points earned 💳</div>
          </div>
        ) : cart.length === 0 ? (
          <div className="empty">
            <div>🛒</div>
            <p>Your cart is still empty.</p>
            <button className="btn-ghost" onClick={() => { setCartOpen(false); setTab('menu') }}>
              Go to the menu
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-lines">
              {cart.map((l) => (
                <div key={l.uid} className="line">
                  <div className="line-emoji">{l.emoji || '🍔'}</div>
                  <div className="line-info">
                    <strong>{l.name}</strong>
                    {l.options?.length > 0 && <small>{l.options.join(' · ')}</small>}
                    <button className="line-remove" onClick={() => removeLine(l.uid)}>Remove</button>
                  </div>
                  <div className="line-right">
                    <div className="qty small">
                      <button onClick={() => changeQty(l.uid, -1)}>−</button>
                      <span>{l.qty}</span>
                      <button onClick={() => changeQty(l.uid, 1)}>+</button>
                    </div>
                    <span className="line-price">{euro(l.lineTotal)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-foot">
              <div className="totals"><span>Subtotal</span><span>{euro(cartTotal)}</span></div>
              <div className="totals muted"><span>Delivery fee</span><span>{euro(DELIVERY)}</span></div>
              <div className="totals reward"><span>You'll earn</span><span>+{Math.round(grand)} points 💳</span></div>
              <div className="totals grand"><span>Total</span><span>{euro(grand)}</span></div>
              <button className="btn-primary wide" onClick={placeOrder}>Checkout · {euro(grand)}</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
