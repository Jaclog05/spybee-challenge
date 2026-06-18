'use client'
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Area, ResponsiveContainer } from 'recharts'

type DataPoint = { week: string; creadas: number; cerradas: number; backlog: number }

type Props = { data: DataPoint[] }

export default function TrendChart({ data }: Props) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, left: 0, right: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="backlogGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="week" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            formatter={(value) => {
              const labels: Record<string, string> = {
                backlog: 'Backlog acumulado',
                creadas: 'Creadas',
                cerradas: 'Cerradas',
              }
              return labels[value] ?? value
            }}
          />
          <Bar dataKey="creadas" barSize={12} fill="#3b82f6" radius={[2, 2, 0, 0]} />
          <Bar dataKey="cerradas" barSize={12} fill="#22c55e" radius={[2, 2, 0, 0]} />
          <Area
            type="monotone"
            dataKey="backlog"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#backlogGradient)"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}