type Props = {
  resolvedores: [string, { closed: number; totalDays: number }][]
  reportadores: [string, number][]
  cargaTrabajo: [string, number][]
}

export default function TeamPerformance({ resolvedores, reportadores, cargaTrabajo }: Props) {
  return (
    <section aria-label="Desempeño del equipo">
      <h3>Desempeño del equipo</h3>
      <div>
        <h4>Quien resuelve más</h4>
        <ul>
          {resolvedores.map(([name, data]) => (
            <li key={name}>{name} — {data.closed} cerradas (promedio {Math.round(data.totalDays / data.closed)} días)</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Quien reporta más</h4>
        <ul>
          {reportadores.map(([name, count]) => (
            <li key={name}>{name} — {count} incidencias</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Carga actual de trabajo</h4>
        <ul>
          {cargaTrabajo.map(([name, count]) => (
            <li key={name}>{name} — {count} abiertas</li>
          ))}
        </ul>
      </div>
    </section>
  )
}