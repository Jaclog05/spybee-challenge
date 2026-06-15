'use client'
import { PieChart, Pie, Legend } from 'recharts'

type Props = {
  abiertas: number
  cerradas: number
  low: number
  medium: number
  high: number
}

export default function StatusPriorityCharts({ abiertas, cerradas, low, medium, high }: Props) {
  return (
    <section aria-label="Estado y Prioridad">
      <div>
        <h4>Por estado</h4>
        <PieChart width={200} height={200}>
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
          <Legend iconSize={10} iconType="circle" />
        </PieChart>
      </div>
      <div>
        <h4>Por prioridad</h4>
        <PieChart width={200} height={200}>
          <Pie
            data={[
              { name: 'Baja', value: low, fill: '#82ca9d' },
              { name: 'Media', value: medium, fill: '#8884d8' },
              { name: 'Alta', value: high, fill: '#ff7300' },
            ]}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={60}
          />
          <Legend iconSize={10} iconType="circle" />
        </PieChart>
      </div>
    </section>
  )
}