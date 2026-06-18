import styles from './ListWithBars.module.scss'

type Props = { tags: [string, number][], barColor: string }

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export default function TagsList({ tags, barColor }: Props) {
  const max = Math.max(...tags.map(([, count]) => count), 1)

  return (
    <ul className={styles.list}>
      {tags.map(([name, count]) => (
        <li key={name} className={styles.item}>
          {/* Avatar */}
          <div className={styles.avatar}>
            <span>{getInitials(name)}</span>
          </div>
 
          {/* Nombre + barra */}
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${(count / max) * 100}%`, background: `${barColor}` }}
              />
            </div>
          </div>
 
          {/* Conteo */}
          <span
            className={styles.count}
            style={{ color: `${barColor}` }}
          >{count}</span>
        </li>
      ))}
    </ul>
  )
}