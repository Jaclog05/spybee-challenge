'use client'
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts'

type DataPoint = { week: string; creadas: number; cerradas: number; backlog: number }

type Props = { data: DataPoint[] }

export default function TrendChart({ data }: Props) {
  return (
    <section aria-label="Tendencia y Riesgo">
      <h3>Tendencia y Riesgo</h3>
      <ComposedChart
        width={700}
        height={350}
        data={data}
        margin={{ top: 20, left: 0, right: 0, bottom: 0 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="week" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="creadas" barSize={20} fill="#1b14e3" />
        <Bar dataKey="cerradas" barSize={20} fill="#039a47" />
        <Line type="monotone" dataKey="backlog" stroke="#ff7300" />
      </ComposedChart>
    </section>
  )
}