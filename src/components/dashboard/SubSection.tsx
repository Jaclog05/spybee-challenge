import type { ReactNode } from 'react'
import styles from './SubSection.module.scss'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function SubSection({ title, subtitle, children }: Props) {
  return (
    <div className={styles.subsection}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}