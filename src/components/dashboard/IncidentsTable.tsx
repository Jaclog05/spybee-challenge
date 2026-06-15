import type { Incident } from '@/types/incident'

type Props = { incidents: Incident[] }

export default function IncidentsTable({ incidents }: Props) {
  return (
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
        {incidents.slice(0, 10).map(incident => (
          <tr key={incident.id}>
            <td>{incident.sequenceId}</td>
            <td>{incident.title}</td>
            <td>{incident.priority}</td>
            <td>{incident.status}</td>
            <td>{incident.assignees.map(a => a.name).join(', ')}</td>
            <td>{incident.owner?.name}</td>
            <td>{incident.dueDate ? new Date(incident.dueDate).toLocaleDateString() : '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}