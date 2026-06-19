"use client"

import { useState, useMemo } from 'react'
import { useIncidentStore } from '@/store/useIncidentStore'
import type { DateRange } from '@/components/dashboard/DateRangeSelect'
import {
  filterByRange,
  getSummary,
  buildChartData,
  getResolvedores,
  getReportadores,
  getCargaTrabajo,
  getCategorias,
  getEtiquetas,
  buildMarkers,
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
import MapView from '@/components/map/MapView';
import DateRangeSelect from '@/components/dashboard/DateRangeSelect';

import styles from './Dashboard.module.scss'

export default function Dashboard() {
  const data = useIncidentStore(state => state.incidents)
  const [range, setRange] = useState<DateRange>('30d')

  const filtered = useMemo(() => filterByRange(data, range), [data, range])
  const active = filtered.filter(i => !i.deleted)
  const summary = getSummary(filtered);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Incidencias</h1>
        <DateRangeSelect value={range} onChange={setRange} />
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
          <TrendChart data={buildChartData(filtered)} />
        </SubSection>
        <SubSection
          title="Criticas para hoy"
          subtitle="Alta prioridad o con fecha proxima"
        >
          <IncidentsTable incidents={filtered} />
        </SubSection>
      </section>

      <section aria-label="Mapa de Incidencias">
        <SectionHeader title="Mapa de Incidencias" subtitle="Distribución Geográfica" />
        <SubSection
          title="Mapa de calor geográfico"
          subtitle="Zonas con mas incidencias dentro de la obra"
        >
          <div style={{ width: '100%', height: '400px' }}>
            <MapView markers={buildMarkers(filtered)} zoom={17} showHeatmap/>
          </div>
        </SubSection>
      </section>

      <section aria-label="Distribución detallada" className={styles.section}>
        <SectionHeader title="Distribución detallada" subtitle="Por tipo de incidencia y tipo de obra" />
        <div className={styles.wrapperDistribucion}>
          <SubSection
            title="Por categoria de incidencia"
            subtitle=""
          >
            <CategoryRadarChart data={getCategorias(filtered)} />
          </SubSection>
          <SubSection
            title="Por etiqueta"
            subtitle=""
          >
            <ListWithBars tags={getEtiquetas(filtered)} barColor='#22c55e'/>
          </SubSection>
        </div>
      </section>

      <section aria-label="Desempeño del equipo" className={styles.section}>
        <SectionHeader title="Desempeño del equipo" subtitle="Quien resuelve, quién reporta, quién carga el trabajo" />
        <TeamPerformance
          resolvedores={getResolvedores(filtered)}
          reportadores={getReportadores(filtered)}
          cargaTrabajo={getCargaTrabajo(filtered)}
        />
      </section>
    </main>
  )
}
