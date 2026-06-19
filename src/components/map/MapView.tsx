'use client'
import { createRoot } from 'react-dom/client'
import { useEffect, useRef } from 'react'
import { TriangleAlert } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export type MapMarker = {
  lat: number
  lng: number
  id?: string
  label?: string
}

type Props = {
  onLocationSelect?: (lat: number, lng: number) => void
  isSelecting?: boolean
  markers?: MapMarker[]
  center?: [number, number]
  showHeatmap?: boolean
  zoom?: number
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

export default function MapView({
  onLocationSelect,
  isSelecting = false,
  markers = [],
  zoom = 14,
  center = [-74.0577, 4.6520],
  showHeatmap = false
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerInstances = useRef<mapboxgl.Marker[]>([])

  // Cursor al seleccionar
  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.getCanvas().style.cursor = isSelecting ? 'crosshair' : ''
  }, [isSelecting])

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom,
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  // Click para seleccionar ubicación
  useEffect(() => {
    if (!mapRef.current || !onLocationSelect) return

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const { lat, lng } = e.lngLat
      onLocationSelect(lat, lng)
    }

    mapRef.current.on('click', handleClick)
    return () => { mapRef.current?.off('click', handleClick) }
  }, [onLocationSelect])

  // Markers + heatmap
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const apply = () => {
      // -- Markers --
      markerInstances.current.forEach(m => m.remove())
      markerInstances.current = markers.map(({ lat, lng, label }) => {
        const marker = new mapboxgl.Marker({ element: createMarkerElement() })
          .setLngLat([lng, lat])
        if (label) marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<p style="color: #000000">${label}</p>`))
        return marker.addTo(map)
      })

      // -- Heatmap --
      if (map.getLayer('incidents-heat')) map.removeLayer('incidents-heat')
      if (map.getSource('incidents')) map.removeSource('incidents')

      if (showHeatmap && markers.length > 0) {
        map.addSource('incidents', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markers.map(({ lat, lng }) => ({
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [lng, lat] },
              properties: {}
            }))
          }
        })

        map.addLayer({
          id: 'incidents-heat',
          type: 'heatmap',
          source: 'incidents',
          paint: {
            'heatmap-weight': 1,
            'heatmap-intensity': 1.5,
            'heatmap-radius': 40,
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0,   'rgba(0,0,0,0)',
              0.2, 'rgba(255,100,0,0.4)',
              0.5, 'rgba(255,60,0,0.7)',
              0.8, 'rgba(180,0,0,0.9)',
              1,   'rgb(100,0,0)'
            ],
            'heatmap-opacity': 0.85,
          }
        })
      }
    }

    // Si el mapa ya cargó, aplica directo; si no, espera el evento load
    if (map.isStyleLoaded()) {
      apply()
    } else {
      map.once('load', apply)
    }
  }, [markers, showHeatmap])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}