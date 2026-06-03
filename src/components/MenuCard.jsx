import { useStore, euro } from '../store'

const CUSTOMIZABLE = ['beef', 'chicken', 'veggie']
const emojiFor = (cat) =>
  ({ beef: '🍔', chicken: '🍗', veggie: '🥬', menus: '🍱', hotdogs: '🌭', loaded: '🍟', sides: '🍟', shakes: '🥤', drinks: '🧊' }[cat] || '🍴')

export default function MenuCard({ item }) {
  const { setSelected, addLine } = useStore()
  const customizable = CUSTOMIZABLE.includes(item.cat)

  const onAdd = (e) => {
    e.stopPropagation()
    if (customizable) setSelected(item)
    else addLine({ name: item.name, qty: 1, unit: item.price, lineTotal: item.price, options: [], emoji: emojiFor(item.cat) })
  }

  return (
    <article className="card" onClick={() => (customizable ? setSelected(item) : onAdd({ stopPropagation() {} }))}>
      <div className="card-art" style={{ '--accent': item.accent }}>
        <span>{emojiFor(item.cat)}</span>
        {item.tag && <span className="card-tag">{item.tag}</span>}
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <div className="card-foot">
          <span className="price">{euro(item.price)}</span>
          <button className="add-btn" onClick={onAdd}>{customizable ? 'Choose' : '+ Add'}</button>
        </div>
      </div>
    </article>
  )
}
