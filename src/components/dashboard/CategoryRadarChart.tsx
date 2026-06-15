'use client'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

type DataPoint = { type: string; amount: number }
type Props = { data: DataPoint[] }

export default function CategoryRadarChart({ data }: Props) {
  return (
    <div>
      <h4>Por categoría de incidencia</h4>
      <RadarChart width={400} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="type" />
        <PolarRadiusAxis />
        <Radar dataKey="amount" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </div>
  )
}