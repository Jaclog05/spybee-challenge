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
      <section aria-label="Tendencia y Riesgo">
        <h3>Tendencia y Riesgo</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Asignados</th>
              <th>Creado por</th>
              <th>Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {incidents.filter(i => !i.deleted).slice(0, 10).map(incident => (
              <tr key={incident.id}>
                <td>{incident.sequenceId}</td>
                <td>{incident.title}</td>
                <td>{incident.priority}</td>
                <td>{incident.status}</td>
                <td>{incident.assignees.map(a => a.name).join(', ')}</td>
                <td>{incident?.owner?.name}</td>
                <td>{incident.dueDate ? new Date(incident.dueDate).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section aria-label="Mapa de Incidencias"></section>
      <section aria-label="Distribución detallada"></section>
      <section aria-label="Desempeño del equipo"></section>
    </main>
  )
}
