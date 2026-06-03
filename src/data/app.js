// App data: user, loyalty/tiers, rewards, activity, locations

export const USER = {
  name: 'Anas Essanoussi',
  firstName: 'Anas',
  memberSince: '2024',
  points: 2680,
  cardNumber: '•••• 7821',
}

// Loyalty tiers (Apple Card-style progression)
export const TIERS = [
  { id: 'bronze', name: 'Bronze', min: 0, color: '#b87333', perk: '1 point per €1' },
  { id: 'silver', name: 'Silver', min: 1000, color: '#8c97a1', perk: '+ free sauce with every order' },
  { id: 'gold', name: 'Gold', min: 2500, color: '#e0a32c', perk: '+ 1.5× points & free upgrade to medium fries' },
  { id: 'black', name: 'Black', min: 5000, color: '#1c1e15', perk: '+ 2× points, free delivery & priority' },
]

export function tierFor(points) {
  let current = TIERS[0]
  for (const t of TIERS) if (points >= t.min) current = t
  const idx = TIERS.indexOf(current)
  const next = TIERS[idx + 1] || null
  const progress = next ? (points - current.min) / (next.min - current.min) : 1
  return { current, next, progress: Math.min(1, Math.max(0, progress)) }
}

// Redeemable rewards
export const REWARDS = [
  { id: 'r-sauce', name: 'Free sauce', cost: 100, emoji: '🥫' },
  { id: 'r-fries', name: 'Free small fries', cost: 200, emoji: '🍟' },
  { id: 'r-bites', name: 'Free chicken bites', cost: 300, emoji: '🍗' },
  { id: 'r-shake', name: 'Free milkshake', cost: 350, emoji: '🥤' },
  { id: 'r-hotdog', name: 'Free hot dog', cost: 450, emoji: '🌭' },
  { id: 'r-menu50', name: '50% off a menu', cost: 500, emoji: '🍱' },
  { id: 'r-loaded', name: 'Free loaded fries', cost: 600, emoji: '🧀' },
  { id: 'r-burger', name: 'Free burger of choice', cost: 700, emoji: '🍔' },
]

// Activity / transactions (Apple Card-style)
export const ACTIVITY = [
  { id: 'a1', title: "Beef 'n Brooklyn Menu", date: 'Jun 3', amount: 15.85, points: 16, emoji: '🍔' },
  { id: 'a2', title: '2× Milkshake', date: 'May 28', amount: 11.5, points: 12, emoji: '🥤' },
  { id: 'a3', title: "Crispy Chicken 'n Spicy + fries", date: 'May 24', amount: 13.4, points: 13, emoji: '🍗' },
  { id: 'a4', title: 'Reward redeemed · Free fries', date: 'May 20', amount: 0, points: -200, emoji: '🎁' },
  { id: 'a5', title: "Fries 'n Pulled Beef", date: 'May 18', amount: 9.95, points: 10, emoji: '🍟' },
  { id: 'a6', title: 'Veggie Menu', date: 'May 12', amount: 15.85, points: 16, emoji: '🥬' },
]

export const LOCATIONS = [
  {
    id: 'noord',
    name: 'Amsterdam Noord',
    address: 'Land van Cocagneplein 1D, 1093 NB',
    hours: 'Daily 11:30 – 22:45',
    distance: '1.2 km',
    open: true,
    featured: true,
  },
  {
    id: 'oostpoort',
    name: 'Amsterdam Oostpoort',
    address: 'Oostpoort 1, 1093 GR',
    hours: 'Daily 11:30 – 22:00',
    distance: '2.8 km',
    open: true,
  },
  {
    id: 'westerpark',
    name: 'Amsterdam Westerpark',
    address: 'Haarlemmerweg 8A, 1014 BE',
    hours: 'Daily 12:00 – 22:00',
    distance: '4.1 km',
    open: true,
  },
  {
    id: 'denhaag',
    name: 'The Hague Centre',
    address: 'Spui 12, 2511 BT',
    hours: 'Daily 11:30 – 22:30',
    distance: '58 km',
    open: true,
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    address: 'Coolsingel 40, 3011 AD',
    hours: 'Daily 11:30 – 23:00',
    distance: '64 km',
    open: false,
  },
  {
    id: 'almere',
    name: 'Almere Centre',
    address: 'Stadhuisplein 2, 1315 HR',
    hours: 'Daily 11:30 – 22:00',
    distance: '28 km',
    open: true,
  },
]

export const PAST_ORDERS = [
  { id: 'o1', items: "Beef 'n Brooklyn Menu", date: 'Jun 3, 2026', total: 15.85, status: 'Delivered' },
  { id: 'o2', items: '2× Milkshake, Medium fries', date: 'May 28, 2026', total: 16.0, status: 'Delivered' },
  { id: 'o3', items: "Crispy Chicken 'n Spicy + fries", date: 'May 24, 2026', total: 13.4, status: 'Delivered' },
]
