import { useStore } from '../store'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="toast" key={toast.key}>
      <span className="toast-emoji">{toast.emoji}</span>
      {toast.msg}
    </div>
  )
}
