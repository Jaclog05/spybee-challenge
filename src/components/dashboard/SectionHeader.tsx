import styles from './SectionHeader.module.scss'

type Props = {
  title: string
  subtitle: string
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className={styles.header}>
      <h3>{title}</h3>
      <span className={styles.subtitle}>· {subtitle}</span>
      <span className={styles.line} />
    </div>
  )
}
