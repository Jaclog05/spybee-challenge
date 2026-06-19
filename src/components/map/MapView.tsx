'use client'
import { createRoot } from 'react-dom/client'
import { useEffect, useRef } from 'react'
import { TriangleAlert } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type Props = {
  onLocationSelect?: (lat: number, lng: number) => void
  isSelecting?: boolean
  markers?: Array<{ lat: number; lng: number }>
}

const ACCENT_COLOR = '#FEC513'

function createMarkerElement() {
  const el = document.createElement('div')
  el.style.cssText = `width: 25px; height: 25px; background: ${ACCENT_COLOR};
    display: flex; justify-content: center; align-items: center;
    border-radius: 50%; cursor: pointer;
  `
  const root = createRoot(el)
  root.render(<TriangleAlert color="#000000" size={15}/>)
  return el
}

export default function MapView({ onLocationSelect, isSelecting, markers }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerInstances = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.getCanvas().style.cursor = isSelecting ? 'crosshair' : ''
  }, [isSelecting])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0577, 4.6520],
      zoom: 14,
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !onLocationSelect) return

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const { lat, lng } = e.lngLat
      onLocationSelect(lat, lng)
    }

    mapRef.current.on('click', handleClick)
    return () => { mapRef.current?.off('click', handleClick) }
  }, [onLocationSelect])

  useEffect(() => {
    if (!mapRef.current || !markers) return

    markerInstances.current.forEach(m => m.remove())
    markerInstances.current = markers.map(({ lat, lng }) =>
      new mapboxgl.Marker({ element: createMarkerElement()})
        .setLngLat([lng, lat])
        .addTo(mapRef.current!)
    )
  }, [markers])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}