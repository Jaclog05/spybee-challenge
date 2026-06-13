import incidents from '@/data/incidents.mock.json'

function getSummary(incidents: typeof import('@/data/incidents.mock.json')) {
  const active = incidents.filter(i => !i.deleted)
  const totalActivas = active.length
  const abiertas = active.filter(i => i.status === 'open').length
  const cerradas = active.filter(i => i.status === 'closed').length
  const pausadas = active.filter(i => i.status === 'on_pause').length
  const now = new Date()
  const vencidas = active.filter(i =>
    i.status !== 'closed' && i.dueDate && new Date(i.dueDate) < now
  ).length
  return { totalActivas, abiertas, cerradas, pausadas, vencidas }
}

export default function Dashboard() {
  const { totalActivas, abiertas, cerradas, pausadas, vencidas } = getSummary(incidents)

  return (
    <main>
      <header>
        <h1>Dashboard</h1>
      </header>
      <section aria-label="Resumen General">
        <h3>Resumen General</h3>
        <p>Activas: {totalActivas}</p>
        <p>Abiertas: {abiertas}</p>
        <p>Cerradas: {cerradas}</p>
        <p>Pausadas: {pausadas}</p>
        <p>Vencidas: {vencidas}</p>
      </section>
      <section aria-label="Tendencia y Riesgo"></section>
      <section aria-label="Mapa de Incidencias"></section>
      <section aria-label="Distribución detallada"></section>
      <section aria-label="Desempeño del equipo"></section>
    </main>
  )
}
