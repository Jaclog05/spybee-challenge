import Image from 'next/image'
import type { Incident } from '@/types/incident'
import { priorityClass, statusClass, getInitials, formatDueDate } from '@/lib/dashboard-helpers'
import styles from './IncidentsTable.module.scss'

type Props = { incidents: Incident[] }

export default function IncidentsTable({ incidents }: Props) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Título</th>
          <th className={styles.th}>Prioridad</th>
          <th className={styles.th}>Estado</th>
          <th className={styles.th}>Asignados</th>
          <th className={styles.th}>Creado por</th>
          <th className={styles.th}>Vencimiento</th>
        </tr>
      </thead>
      <tbody>
        {incidents.slice(0, 10).map(incident => {
          const due = formatDueDate(incident.dueDate)

          return (
            <tr key={incident.id} className={styles.tr}>
              {/* ID */}
              <td className={`${styles.td} ${styles.cellId}`}>
                #{incident.sequenceId}
              </td>

              {/* Título */}
              <td className={`${styles.td} ${styles.cellTitle}`}>
                {incident.title}
              </td>

              {/* Prioridad */}
              <td className={styles.td}>
                <span className={`${styles.badge} ${priorityClass(incident.priority, styles)}`}>
                  {incident.priority}
                </span>
              </td>

              {/* Estado */}
              <td className={styles.td}>
                <span className={`${styles.badge} ${statusClass(incident.status, styles)}`}>
                  {incident.status}
                </span>
              </td>

              {/* Asignados */}
              <td className={styles.td}>
                {incident.assignees.length > 0 ? (
                  <div className={styles.avatarGroup}>
                    {incident.assignees.slice(0, 4).map(a => (
                      a.avatarUrl ? (
                        <Image
                          key={a.id}
                          src={a.avatarUrl}
                          alt={a.name}
                          title={a.name}
                          className={styles.avatar}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <span
                          key={a.id}
                          className={styles.avatarInitials}
                          title={a.name}
                        >
                          {getInitials(a.name)}
                        </span>
                      )
                    ))}
                  </div>
                ) : (
                  <span className={styles.noAssignee}>—</span>
                )}
              </td>

              {/* Creado por */}
              <td className={styles.td}>
                {incident.owner ? (
                  <div className={styles.avatarGroup}>
                    {incident.owner.avatarUrl ? (
                      <Image
                        src={incident.owner.avatarUrl}
                        alt={incident.owner.name}
                        title={incident.owner.name}
                        className={styles.avatar}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span
                        className={styles.avatarInitials}
                        title={incident.owner.name}
                      >
                        {getInitials(incident.owner.name)}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className={styles.noAssignee}>—</span>
                )}
              </td>

              {/* Vencimiento */}
              <td className={styles.td}>
                {due ? (
                  <span className={due.overdue ? styles.dueDateOverdue : styles.dueDateOk}>
                    {due.label}
                  </span>
                ) : (
                  <span className={styles.dueDateEmpty}>Sin fecha</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}