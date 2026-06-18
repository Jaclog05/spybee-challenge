export function priorityClass(priority: string, styles: Record<string, string>) {
  switch (priority.toLowerCase()) {
    case 'high':   return styles.priorityAlta
    case 'medium':  return styles.priorityMedia
    case 'low':   return styles.priorityBaja
    default:       return styles.priorityBaja
  }
}

export function statusClass(status: string, styles: Record<string, string>) {
  switch (status.toLowerCase()) {
    case 'open':  return styles.statusAbierta
    case 'on_pause':  return styles.statusPausada
    case 'closed':  return styles.statusCerrada
    default:         return styles.statusAbierta
  }
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function formatDueDate(dueDate: string | null | undefined) {
  if (!dueDate) return null
  const date = new Date(dueDate)
  const now  = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays > 0) {
    return { label: `Vencida hace ${diffDays}d`, overdue: true }
  }
  return { label: date.toLocaleDateString('es-CO'), overdue: false }
}
