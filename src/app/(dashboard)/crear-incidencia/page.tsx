"use client"
import dynamic from 'next/dynamic'
import IncidentForm from '@/components/crear-incidencia/IncidentForm'
import MapToolbar from '@/components/map/MapToolbar'
import { useState } from 'react'
import { X } from 'lucide-react'
import styles from './CrearIncidencia.module.scss'

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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      <MapView
        onLocationSelect={handleLocationSelect}
        isSelecting={isSelecting}
      />

      {!modalOpen && (
        <MapToolbar
          isSelecting={isSelecting}
          onToggle={() => setIsSelecting(s => !s)}
        />
      )}

      {modalOpen && coordinates && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <span className={styles.title}>Crear Incidencia</span>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
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