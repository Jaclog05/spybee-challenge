"use client"
import dynamic from 'next/dynamic'
import IncidentForm from '@/components/crear-incidencia/IncidentForm'
import { useState } from 'react'

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })

export default function CrearIncidencia() {
  const [isSelecting, setIsSelecting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [coordinates, setCoordinates] = useState<{ lat: number, lng: number } | null>(null)

  function handleLocationSelect(lat: number, lng: number) {
    if(!isSelecting) return
    setCoordinates({ lat, lng })
    setIsSelecting(false)
    setModalOpen(true)
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

      <MapView
        onLocationSelect={handleLocationSelect}
        isSelecting={isSelecting}
      />

      {!modalOpen && (
        <button
          onClick={() => setIsSelecting(s => !s)}
          style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10 }}
        >
          {isSelecting ? '✕ Cancelar' : '+ Crear incidencia'}
        </button>
      )}

      {modalOpen && coordinates && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 }}>
          <div>
            <button onClick={() => setModalOpen(false)}>✕</button>
            <IncidentForm
              initialCoordinates={coordinates}
              onSubmitSuccess={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}