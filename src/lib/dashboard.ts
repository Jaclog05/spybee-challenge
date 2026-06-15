import type { Incident } from '@/types/incident'

export function getSummary(incidents: Incident[]) {
  const active = incidents.filter(i => !i.deleted)
  const now = new Date()
  return {
    totalActivas: active.length,
    abiertas: active.filter(i => i.status === 'open').length,
    cerradas: active.filter(i => i.status === 'closed').length,
    pausadas: active.filter(i => i.status === 'on_pause').length,
    vencidas: active.filter(i =>
      i.status !== 'closed' && i.dueDate && new Date(i.dueDate) < now
    ).length,
  }
}

function getWeekLabel(date: Date) {
  const d = new Date(date)
  const day = d.getUTCDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setUTCDate(d.getUTCDate() + diff)
  d.setUTCHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

function formatLabel(isoWeekStart: string) {
  const date = new Date(isoWeekStart + 'T00:00:00Z')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function buildChartData(incidents: Incident[]) {
  const creadasMap = new Map<string, number>()
  const cerradasMap = new Map<string, number>()

  for (const incident of incidents) {
    const createdWeek = getWeekLabel(new Date(incident.createdAt))
    creadasMap.set(createdWeek, (creadasMap.get(createdWeek) ?? 0) + 1)
    if (incident.closingDate) {
      const closedWeek = getWeekLabel(new Date(incident.closingDate))
      cerradasMap.set(closedWeek, (cerradasMap.get(closedWeek) ?? 0) + 1)
    }
  }

  const allWeeks = Array.from(
    new Set([...creadasMap.keys(), ...cerradasMap.keys()])
  ).sort()

  let backlog = 0
  return allWeeks.map(week => {
    const creadas = creadasMap.get(week) ?? 0
    const cerradas = cerradasMap.get(week) ?? 0
    backlog += creadas - cerradas
    return { week: formatLabel(week), creadas, cerradas, backlog }
  })
}

export function getResolvedores(incidents: Incident[]) {
  const counts: Record<string, { closed: number; totalDays: number }> = {}
  incidents
    .filter(i => !i.deleted && i.status === 'closed')
    .forEach(i => {
      const days = (new Date(i.closingDate!).getTime() - new Date(i.createdAt).getTime()) / 86400000
      i.assignees.forEach(a => {
        if (!counts[a.name]) counts[a.name] = { closed: 0, totalDays: 0 }
        counts[a.name].closed++
        counts[a.name].totalDays += days
      })
    })
  return Object.entries(counts).sort((a, b) => b[1].closed - a[1].closed)
}

export function getReportadores(incidents: Incident[]) {
  const counts: Record<string, number> = {}
  incidents
    .filter(i => !i.deleted)
    .forEach(i => {
      const name = i.owner?.name ?? 'Usuario eliminado'
      counts[name] = (counts[name] || 0) + 1
    })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

export function getCargaTrabajo(incidents: Incident[]) {
  const counts: Record<string, number> = {}
  incidents
    .filter(i => !i.deleted && i.status === 'open')
    .forEach(i => {
      i.assignees.forEach(a => {
        counts[a.name] = (counts[a.name] || 0) + 1
      })
    })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

export function getCategorias(incidents: Incident[]) {
  const counts: Record<string, number> = {}
  incidents
    .filter(i => !i.deleted)
    .forEach(i => {
      counts[i.type.name] = (counts[i.type.name] || 0) + 1
    })
  return Object.entries(counts).map(([type, amount]) => ({ type, amount }))
}

export function getEtiquetas(incidents: Incident[]) {
  const counts: Record<string, number> = {}
  incidents
    .filter(i => !i.deleted)
    .forEach(i => {
      i.tags.forEach(t => {
        counts[t.name] = (counts[t.name] || 0) + 1
      })
    })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}