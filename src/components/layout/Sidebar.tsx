'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, ChartPie } from 'lucide-react';
import styles from './Sidebar.module.scss'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: <ChartPie size={20}/> },
  { href: '/crear-incidencia', label: 'Mapa', icon: <MapPin size={20} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            title={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}