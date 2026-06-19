'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/store/useAuthStore'
import { ChevronDown } from 'lucide-react';
import styles from './Navbar.module.scss'

export default function Navbar() {
  const router = useRouter()
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <header className={styles.navbar}>
      <Image
        src="/spybee-logo.svg"
        alt="Spybee"
        width={100}
        height={53}
        priority
      />
      <div className={styles.project}>
        <span>Proyecto Onboarding</span>
      </div>
      <div className={styles.avatar} onClick={() => setMenuOpen(s => !s)} ref={menuRef}>
        <div className={styles.avatarCircle}>J</div>
        {user && (
          <div className={styles.avatarInfo}>
            <span className={styles.avatarName}>{user.userName}</span>
            <span className={styles.avatarRole}>{user.role}</span>
          </div>
        )}
        <ChevronDown color="#FFFFFF" />
        {menuOpen && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}