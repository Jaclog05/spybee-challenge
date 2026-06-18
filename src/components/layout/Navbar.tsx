'use client'
import Image from 'next/image'
import styles from './Navbar.module.scss'

export default function Navbar() {
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
      <div className={styles.avatar}>
        <div className={styles.avatarCircle}>J</div>
      </div>
    </header>
  )
}