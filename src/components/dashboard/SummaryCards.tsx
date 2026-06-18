import { Folder, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import styles from './SummaryCards.module.scss'

type Props = {
  totalActivas: number
  abiertas: number
  cerradas: number
  pausadas: number
  vencidas: number
}

export default function SummaryCards({ totalActivas, abiertas, cerradas, pausadas, vencidas }: Props) {
  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.cardAbiertas}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Abiertas</span>
          <Folder size={16} className={styles.cardIcon} />
        </div>
        <span className={`${styles.cardValue} ${styles.valueAbiertas}`}>{abiertas}</span>
        <span className={styles.cardSub}>actualmente</span>
      </div>

      <div className={`${styles.card} ${styles.cardTotal}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Creadas</span>
          <Plus size={16} className={styles.cardIcon} />
        </div>
        <span className={`${styles.cardValue} ${styles.valueTotal}`}>{totalActivas}</span>
        <span className={styles.cardSub}>en el período</span>
      </div>

      <div className={`${styles.card} ${styles.cardCerradas}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Cerradas</span>
          <CheckCircle size={16} className={styles.cardIcon} />
        </div>
        <span className={`${styles.cardValue} ${styles.valueCerradas}`}>{cerradas}</span>
        <span className={styles.cardSub}>en el período</span>
      </div>

      <div className={`${styles.card} ${styles.cardPausadas}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Pausadas</span>
          <Clock size={16} className={styles.cardIcon} />
        </div>
        <span className={`${styles.cardValue} ${styles.valuePausadas}`}>{pausadas}</span>
        <span className={styles.cardSub}>estado actual</span>
      </div>

      <div className={`${styles.card} ${styles.cardVencidas}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardLabel}>Vencidas</span>
          <AlertTriangle size={16} className={styles.cardIcon} />
        </div>
        <span className={`${styles.cardValue} ${styles.valueVencidas}`}>{vencidas}</span>
        <span className={styles.cardSub}>estado actual</span>
      </div>
    </div>
  )
}