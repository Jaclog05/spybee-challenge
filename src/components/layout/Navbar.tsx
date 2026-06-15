'use client'
import Link from 'next/link'

export default function Navbar() {

  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/crear-incidencia">Crear Incidencia</Link>
    </nav>
  )
}