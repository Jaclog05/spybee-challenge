'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Incident } from '@/types/incident'
import { priorityClass, statusClass, getInitials, formatDueDate } from '@/lib/dashboard-helpers'
import styles from './IncidentsTable.module.scss'

const PAGE_SIZE = 10

type Props = { incidents: Incident[] }

export default function IncidentsTable({ incidents }: Props) {
  const [page, setPage] = useState(0)

  const sorted = incidents
    .slice()
    .sort((a, b) => Number(b.sequenceId) - Number(a.sequenceId))

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div>
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
        {paginated.map(incident => {
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
      {/* Paginación */}
    <div className={styles.pagination}>
      <span className={styles.pageInfo}>
        {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} de {sorted.length}
      </span>

      {/* Anterior */}
      <button
        className={styles.pageBtn}
        disabled={page === 0}
        onClick={() => setPage(p => p - 1)}
      >
        ‹
      </button>

      {/* Números */}
      {(() => {
        const pages: (number | 'dots')[] = []

        if (totalPages <= 7) {
          for (let i = 0; i < totalPages; i++) pages.push(i)
        } else {
          pages.push(0)
          if (page > 2) pages.push('dots')
          for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
            pages.push(i)
          }
          if (page < totalPages - 3) pages.push('dots')
          pages.push(totalPages - 1)
        }

        return pages.map((p, i) =>
          p === 'dots' ? (
            <span key={`dots-${i}`} className={styles.pageDots}>···</span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </button>
          )
        )
      })()}

      {/* Siguiente */}
      <button
        className={styles.pageBtn}
        disabled={page >= totalPages - 1}
        onClick={() => setPage(p => p + 1)}
      >
        ›
      </button>
    </div>
    </div>
  )
}