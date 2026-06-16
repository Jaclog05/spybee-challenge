"use client"
import dynamic from 'next/dynamic'
import IncidentForm from '@/components/crear-incidencia/IncidentForm'
import { useRef } from 'react'

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })

export default function CrearIncidencia() {
  const setCoordinatesRef = useRef<((lat: number, lng: number) => void) | null>(null)

  return (
    <main>
      <h1>Crear Incidencia</h1>
      <MapView onLocationSelect={(lat, lng) => {
        setCoordinatesRef.current?.(lat, lng)
      }} />
      <IncidentForm onReady={(setCoords) => { setCoordinatesRef.current = setCoords }} />
    </main>
  )
}