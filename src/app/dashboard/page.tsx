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
import TagsList from '@/components/dashboard/TagsList';
import TeamPerformance from '@/components/dashboard/TeamPerformance';

export default function Dashboard() {
  const data = useIncidentStore(state => state.incidents)
  const active = data.filter(i => !i.deleted)
  const summary = getSummary(data);

  return (
    <main>
      <header>
        <h1>Dashboard</h1>
      </header>
      
      <SummaryCards {...summary} />

      <StatusPriorityCharts
        abiertas={summary.abiertas}
        cerradas={summary.cerradas}
        low={active.filter(i => i.priority === 'low').length}
        medium={active.filter(i => i.priority === 'medium').length}
        high={active.filter(i => i.priority === 'high').length}
      />

      <TrendChart data={buildChartData(data)} />

      <IncidentsTable incidents={data} />

      <section aria-label="Mapa de Incidencias"></section>
      <section aria-label="Distribución detallada">
        <h3>Distribución detallada</h3>
        <CategoryRadarChart data={getCategorias(data)} />
        <TagsList tags={getEtiquetas(data)} />
      </section>

      <TeamPerformance
        resolvedores={getResolvedores(data)}
        reportadores={getReportadores(data)}
        cargaTrabajo={getCargaTrabajo(data)}
      />
    </main>
  )
}
