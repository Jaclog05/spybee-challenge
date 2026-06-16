'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type Props = {
  onLocationSelect?: (lat: number, lng: number) => void
}

export default function MapView({ onLocationSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0577, 4.6520], // Bogotá por defecto
      zoom: 14,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl())

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !onLocationSelect) return

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const { lat, lng } = e.lngLat

      // Mover o crear marker en el punto clickeado
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat])
      } else {
        markerRef.current = new mapboxgl.Marker({ color: '#E53935' })
          .setLngLat([lng, lat])
          .addTo(mapRef.current!)
      }

      onLocationSelect(lat, lng)
    }

    mapRef.current.on('click', handleClick)
    return () => { mapRef.current?.off('click', handleClick) }
  }, [onLocationSelect])

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
}