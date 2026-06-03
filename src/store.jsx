import { createContext, useContext, useState, useCallback } from 'react'
import { USER, REWARDS, ACTIVITY } from './data/app'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

export const euro = (n) => '€' + n.toFixed(2)

let _id = 0
const uid = () => `${Date.now()}-${_id++}`

export function StoreProvider({ children }) {
  // navigatie
  const [tab, setTab] = useState('home')

  // cart
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState(null) // item in modal

  // loyalty
  const [points, setPoints] = useState(USER.points)
  const [activity, setActivity] = useState(ACTIVITY)
  const [redeemed, setRedeemed] = useState([]) // actieve beloningen

  // ui
  const [toast, setToast] = useState(null)

  const cartCount = cart.reduce((s, l) => s + l.qty, 0)
  const cartTotal = cart.reduce((s, l) => s + l.lineTotal, 0)

  const showToast = useCallback((msg, emoji = '✅') => {
    setToast({ msg, emoji, key: uid() })
    setTimeout(() => setToast(null), 2600)
  }, [])

  const addLine = useCallback((line) => {
    setCart((c) => [...c, { ...line, uid: uid() }])
    showToast(`${line.name} added`, '🛒')
  }, [showToast])

  const removeLine = useCallback((id) => setCart((c) => c.filter((l) => l.uid !== id)), [])

  const changeQty = useCallback((id, delta) => {
    setCart((c) =>
      c
        .map((l) =>
          l.uid === id
            ? { ...l, qty: Math.max(0, l.qty + delta), lineTotal: l.unit * Math.max(0, l.qty + delta) }
            : l
        )
        .filter((l) => l.qty > 0)
    )
  }, [])

  const checkout = useCallback(
    (total) => {
      const earned = Math.max(1, Math.round(total))
      setPoints((p) => p + earned)
      setActivity((a) => [
        { id: uid(), title: `Order (${cartCount} items)`, date: 'Now', amount: total, points: earned, emoji: '🍔' },
        ...a,
      ])
      setCart([])
      return earned
    },
    [cartCount]
  )

  const redeem = useCallback(
    (rewardId) => {
      const r = REWARDS.find((x) => x.id === rewardId)
      if (!r || points < r.cost) {
        showToast('Not enough points', '🔒')
        return false
      }
      setPoints((p) => p - r.cost)
      setRedeemed((list) => [...list, { ...r, code: 'BNS-' + Math.random().toString(36).slice(2, 7).toUpperCase() }])
      setActivity((a) => [
        { id: uid(), title: `Redeemed · ${r.name}`, date: 'Now', amount: 0, points: -r.cost, emoji: '🎁' },
        ...a,
      ])
      showToast(`${r.name} redeemed!`, r.emoji)
      return true
    },
    [points, showToast]
  )

  const value = {
    tab, setTab,
    cart, cartCount, cartTotal,
    cartOpen, setCartOpen,
    selected, setSelected,
    addLine, removeLine, changeQty, checkout,
    points, activity, redeemed, redeem,
    toast, showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
