'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

type Props = {
  onLocationSelect?: (lat: number, lng: number) => void
  isSelecting?: boolean
}

export default function MapView({ onLocationSelect, isSelecting }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.getCanvas().style.cursor = isSelecting ? 'crosshair' : ''
  }, [isSelecting])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.0577, 4.6520], // Bogotá por defecto
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

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}