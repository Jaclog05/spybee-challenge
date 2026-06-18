"use client"

import { useIncidentStore } from '@/store/useIncidentStore'
import {
  getSummary,
  buildChartData,
  getResolvedores,
  getReportadores,
  getCargaTrabajo,
  getCategorias,
  getEtiquetas,
} from '@/lib/dashboard'

import SummaryCards from '@/components/dashboard/SummaryCards';
import StatusPriorityCharts from '@/components/dashboard/StatusPriorityCharts';
import TrendChart from '@/components/dashboard/TrendChart';
import IncidentsTable from '@/components/dashboard/IncidentsTable';
import CategoryRadarChart from '@/components/dashboard/CategoryRadarChart';
import ListWithBars from '@/components/dashboard/ListWithBars';
import TeamPerformance from '@/components/dashboard/TeamPerformance';
import SectionHeader from '@/components/dashboard/SectionHeader';
import SubSection from '@/components/dashboard/SubSection';

import styles from './Dashboard.module.scss'

export default function Dashboard() {
  const data = useIncidentStore(state => state.incidents)
  const active = data.filter(i => !i.deleted)
  const summary = getSummary(data);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Incidencias</h1>
      </header>

      <section aria-label="Resumen General" className={styles.section}>
        <SectionHeader title="Resumen general" subtitle="Indicadores clave del período" />
        <SummaryCards {...summary} />
        <StatusPriorityCharts
          abiertas={summary.abiertas}
          cerradas={summary.cerradas}
          low={active.filter(i => i.priority === 'low').length}
          medium={active.filter(i => i.priority === 'medium').length}
          high={active.filter(i => i.priority === 'high').length}
        />
      </section>

      <section aria-label="Tendencia y Riesgo" className={styles.section}>
        <SectionHeader title="Tendencia y riesgo" subtitle="Evolución temporal y alertas accionables" />
        <SubSection
          title="Tendencia: creadas vs cerradas"
          subtitle="Comparativa temporal con backlog acumulado"
        >
          <TrendChart data={buildChartData(data)} />
        </SubSection>
        <SubSection
          title="Criticas para hoy"
          subtitle="Alta prioridad o con fecha proxima"
        >
          <IncidentsTable incidents={data} />
        </SubSection>
      </section>

      <section aria-label="Mapa de Incidencias"></section>
      <section aria-label="Distribución detallada" className={styles.section}>
        <SectionHeader title="Distribución detallada" subtitle="Por tipo de incidencia y tipo de obra" />
        <div className={styles.doubleColumn}>
          <SubSection
            title="Por categoria de incidencia"
            subtitle=""
          >
            <CategoryRadarChart data={getCategorias(data)} />
          </SubSection>
          <SubSection
            title="Por etiqueta"
            subtitle=""
          >
            <ListWithBars tags={getEtiquetas(data)} barColor='#22c55e'/>
          </SubSection>
        </div>
      </section>

      <section aria-label="Desempeño del equipo" className={styles.section}>
        <SectionHeader title="Desempeño del equipo" subtitle="Quien resuelve, quién reporta, quién carga el trabajo" />
        <TeamPerformance
          resolvedores={getResolvedores(data)}
          reportadores={getReportadores(data)}
          cargaTrabajo={getCargaTrabajo(data)}
        />
      </section>
    </main>
  )
}
