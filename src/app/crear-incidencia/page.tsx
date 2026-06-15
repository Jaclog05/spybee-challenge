"use client"

import { useIncidentStore } from '@/store/useIncidentStore'

export default function CrearIncidencia() {
  const addIncident = useIncidentStore(state => state.addIncident)
  const total = useIncidentStore(state => state.incidents.length)

  return (
    <main>
      <h1>Crear Incidencia</h1>
      <p>Total en store: {total}</p>
      <button onClick={() => addIncident({
        title: 'Nueva Incidencia',
        description: 'Descripción de la nueva incidencia',
        priority: 'medium',
        locationDescription: 'Ubicación de la incidencia',
        dueDate: new Date().toISOString(),
        coordinates: { lat: 0, lng: 0 },
        type: { id: '1', key: 'default', name: 'Hidrosanitario', name_en: 'Default Type' },
      })}>
        Crear
      </button>
    </main>
  )
}