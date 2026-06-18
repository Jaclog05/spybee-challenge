import SubSection from "./SubSection"
import ListWithBars from './ListWithBars'
import styles from './TeamPerformance.module.scss'

type Props = {
  resolvedores: [string, { closed: number; totalDays: number }][]
  reportadores: [string, number][]
  cargaTrabajo: [string, number][]
}

export default function TeamPerformance({ resolvedores, reportadores, cargaTrabajo }: Props) {
  const resolvedoresAsTags: [string, number][] = resolvedores.map(
    ([name, data]) => [
      `${name} (=${data.closed > 0 ? Math.round(data.totalDays / data.closed) : 0}d)`,
      data.closed
    ]
  )
  return (
    <div className={styles.tripleColumn}>
      <SubSection
        title="Quién resuelve más"
        subtitle="Cerradas en el periodo + tiempo promedio"
      >
        <ListWithBars tags={resolvedoresAsTags} barColor="#22c55e"/>
      </SubSection>
 
      <SubSection
        title="Quién reporta más"
        subtitle="Creadores con más incidencias registradas"
      >
        <ListWithBars tags={reportadores} barColor="#FeC513"/>
      </SubSection>
 
      <SubSection
        title="Carga actual de trabajo"
        subtitle="Responsables con más incidencias abiertas"
      >
        <ListWithBars tags={cargaTrabajo} barColor="#3b82f6"/>
      </SubSection>
    </div>
  )
}