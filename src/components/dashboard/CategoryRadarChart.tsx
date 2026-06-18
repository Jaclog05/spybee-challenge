'use client'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import styles from './CategoryRadarChart.module.scss'

type DataPoint = { type: string; amount: number }
type Props = { data: DataPoint[] }

export default function CategoryRadarChart({ data }: Props) {
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="type" tick={{ fontSize: 10, fontWeight: 'bold', fill: "#000000" }}/>
          <PolarRadiusAxis tick={{fontSize: 10, fill: "#000000" }} />
          <Radar dataKey="amount" fill="#FEC513" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}