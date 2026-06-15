"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, PieChart, ComposedChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Line, Tooltip } from 'recharts';
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

// funciones para grafico de incidencias creadas vs cerradas y backlog acumulado

function getWeekLabel(date: Date) {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

function formatLabel(isoWeekStart: string) {
  const date = new Date(isoWeekStart + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function buildChartData(incidents: typeof import('@/data/incidents.mock.json')) {
  const creadasMap = new Map<string, number>();
  const cerradasMap = new Map<string, number>();

  for (const incident of incidents) {
    const createdWeek = getWeekLabel(new Date(incident.createdAt));
    creadasMap.set(createdWeek, (creadasMap.get(createdWeek) ?? 0) + 1);

    if (incident.closingDate) {
      const closedWeek = getWeekLabel(new Date(incident.closingDate));
      cerradasMap.set(closedWeek, (cerradasMap.get(closedWeek) ?? 0) + 1);
    }
  }

  const allWeeks = Array.from(
    new Set([...creadasMap.keys(), ...cerradasMap.keys()])
  ).slice(0, 7).sort();

  let backlog = 0;
  return allWeeks.map((week) => {
    const creadas = creadasMap.get(week) ?? 0;
    const cerradas = cerradasMap.get(week) ?? 0;
    backlog += creadas - cerradas;
    return {
      week: formatLabel(week),
      creadas,
      cerradas,
      backlog,
    };
  })
}

function getResolvedores(incidents: typeof import('@/data/incidents.mock.json')) {
  const counts: Record<string, { closed: number; totalDays: number }> = {}
  incidents.filter(i => !i.deleted && i.status === 'closed').forEach(i => {
    const days = (new Date(i.closingDate!).getTime() - new Date(i.createdAt).getTime()) / 86400000
    i.assignees.forEach(a => {
      if (!counts[a.name]) counts[a.name] = { closed: 0, totalDays: 0 }
      counts[a.name].closed++
      counts[a.name].totalDays += days
    })
  })
  return Object.entries(counts).sort((a, b) => b[1].closed - a[1].closed)
}

function getReportadores(incidents: typeof import('@/data/incidents.mock.json')) {
  const counts: Record<string, number> = {}
  incidents.filter(i => !i.deleted).forEach(i => {
    const name = i.owner?.name ?? 'Usuario eliminado'
    counts[name] = (counts[name] || 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

function getCargaTrabajo(incidents: typeof import('@/data/incidents.mock.json')) {
  const counts: Record<string, number> = {}
  incidents.filter(i => !i.deleted && i.status === 'open').forEach(i => {
    i.assignees.forEach(a => {
      counts[a.name] = (counts[a.name] || 0) + 1
    })
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

function getCategorias(incidents: typeof import('@/data/incidents.mock.json')) {
  const counts: Record<string, number> = {}
  incidents.filter(i => !i.deleted).forEach(i => {
    counts[i.type.name] = (counts[i.type.name] || 0) + 1
  })
  return Object.entries(counts).map(([type, amount]) => ({ type, amount }))
}

function getEtiquetas(incidents: typeof import('@/data/incidents.mock.json')) {
  const counts: Record<string, number> = {}
  incidents.filter(i => !i.deleted).forEach(i => {
    i.tags.forEach(t => {
      counts[t.name] = (counts[t.name] || 0) + 1
    })
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
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
        <div>
          <div>
            <h4>Por estado</h4>
            <PieChart responsive style={{ height: '200px', width: '33%', flex: '1 1 100px', aspectRatio: 1 }}>
              <Pie
                data={[
                  { name: 'Abiertas', value: abiertas, fill: '#82ca9d' },
                  { name: 'Cerradas', value: cerradas, fill: '#8884d8' },
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={60}
                isAnimationActive={false}
              />
              <Legend iconSize={10} iconType="circle" layout="vertical" verticalAlign="middle" wrapperStyle={{top: '50%', right: 0, transform: 'translate(0, -50%)', lineHeight: '24px'}}/>
            </PieChart>
          </div>
          <div>
            <h4>Por prioridad</h4>
            <PieChart responsive style={{ height: '200px', width: '33%', flex: '1 1 100px', aspectRatio: 1 }}>
              <Pie
                data={[
                  { name: 'Baja', value: incidents.filter(i => !i.deleted && i.priority === 'low').length, fill: '#82ca9d' },
                  { name: 'Media', value: incidents.filter(i => !i.deleted && i.priority === 'medium').length, fill: '#8884d8' },
                  { name: 'Alta', value: incidents.filter(i => !i.deleted && i.priority === 'high').length, fill: '#ff7300' },
                ]}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={60}
              />
              <Legend iconSize={10} iconType="circle" layout="vertical" verticalAlign="middle" wrapperStyle={{top: '50%', right: 0, transform: 'translate(0, -50%)', lineHeight: '24px'}}/>
            </PieChart>
          </div>
        </div>
      </section>
      <section aria-label="Tendencia y Riesgo">
        <h3>Tendencia y Riesgo</h3>
        <ComposedChart
          style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
          responsive
          data={buildChartData(incidents)}
          margin={{ top: 20, left: 0, right: 0, bottom: 0, }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="week" scale="band" />
          <YAxis width="auto" niceTicks='snap125'/>
          <Tooltip />
          <Legend />
          <Bar dataKey="creadas" barSize={20} fill="#1b14e3" />
          <Bar dataKey="cerradas" barSize={20} fill="#039a47" />
          <Line type="monotone" dataKey="backlog" stroke="#ff7300" />
        </ComposedChart>
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
      <section aria-label="Distribución detallada">
        <h3>Distribución detallada</h3>
        <div>
          <h4>Por categoría de incidencia</h4>
          <RadarChart
            style={{ width: '100%', height: '100%', minWidth: '500px', maxHeight: '80vh', aspectRatio: 1, fontSize: '10px' }}
            responsive
            data={getCategorias(incidents)}
            margin={{ top: 20, left: 20, right: 20, bottom: 20, }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis />
            <Radar dataKey="amount" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </div>
        <div>
          <h4>Por etiqueta</h4>
          <ul>
            {getEtiquetas(incidents).map(([name, count]) => (
              <li key={name}>{name} — {count}</li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-label="Desempeño del equipo">
        <h3>Desempeño del equipo</h3>
        <div>
          <h4>Quien resuelve más</h4>
          <ul>
            {getResolvedores(incidents).map(([name, data]) => (
              <li key={name}>{name} — {data.closed} cerradas (promedio {Math.round(data.totalDays / data.closed)} días)</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Quien reporta más</h4>
          <ul>
            {getReportadores(incidents).map(([name, count]) => (
              <li key={name}>{name} — {count} incidencias</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Carga actual de trabajo</h4>
          <ul>
            {getCargaTrabajo(incidents).map(([name, count]) => (
              <li key={name}>{name} — {count} abiertas</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
