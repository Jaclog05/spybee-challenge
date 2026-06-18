'use client'
import { PieChart, Pie } from 'recharts'
import styles from './StatusPriorityCharts.module.scss'

type Props = {
  abiertas: number
  cerradas: number
  low: number
  medium: number
  high: number
}

export default function StatusPriorityCharts({ abiertas, cerradas, low, medium, high }: Props) {
  const totalEstado = abiertas + cerradas
  const totalPrioridad = low + medium + high

  const estadoData = [
    { name: 'Abiertas', value: abiertas, fill: '#82ca9d' },
    { name: 'Cerradas', value: cerradas, fill: '#8884d8' },
  ]

  const prioridadData = [
    { name: 'Baja', value: low, fill: '#82ca9d' },
    { name: 'Media', value: medium, fill: '#8884d8' },
    { name: 'Alta', value: high, fill: '#ff7300' },
  ]
  return (
    <section aria-label="Estado y Prioridad">
      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Por estado</span>
            <span className={styles.cardTotal}>{totalEstado}</span>
          </div>
          <div className={styles.chartRow}>
            <PieChart width={100} height={100}>
              <Pie data={estadoData} dataKey="value" outerRadius={48}
                innerRadius={32} isAnimationActive={false} />
            </PieChart>
            <div className={styles.legend}>
              {estadoData.map(item => (
                <div key={item.name} className={styles.legendItem}>
                  <div className={styles.legendLeft}>
                    <span className={styles.legendDot} style={{ background: item.fill }} />
                    <span>{item.name}</span>
                  </div>
                  <span className={styles.legendCount}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Por prioridad</span>
            <span className={styles.cardTotal}>{totalPrioridad}</span>
          </div>
          <div className={styles.chartRow}>
            <PieChart width={100} height={100}>
              <Pie data={prioridadData} dataKey="value" outerRadius={48}
                innerRadius={32} isAnimationActive={false} />
            </PieChart>
            <div className={styles.legend}>
              {prioridadData.map(item => (
                <div key={item.name} className={styles.legendItem}>
                  <div className={styles.legendLeft}>
                    <span className={styles.legendDot} style={{ background: item.fill }} />
                    <span>{item.name}</span>
                  </div>
                  <span className={styles.legendCount}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}