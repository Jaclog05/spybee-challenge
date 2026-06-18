import { Plus } from 'lucide-react'
import styles from './MapToolbar.module.scss'

type Props = {
  isSelecting: boolean
  onToggle: () => void
}

export default function MapToolbar({ isSelecting, onToggle }: Props) {
  return (
    <div className={styles.toolbar}>
      <button
        className={`${styles.btn} ${isSelecting ? styles.active : ''}`}
        onClick={onToggle}
        title="Crear incidencia"
      >
        <Plus size={20} />
      </button>
    </div>
  )
}