'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './DateRangeSelect.module.scss'

export type DateRange = '7d' | '15d' | '30d' | '90d' | '6m'

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: '7d',  label: 'Últimos 7 días'  },
  { value: '15d', label: 'Últimos 15 días' },
  { value: '30d', label: 'Últimos 30 días' },
  { value: '90d', label: 'Últimos 90 días' },
  { value: '6m',  label: 'Últimos 6 meses' },
]

type Props = {
  value?: DateRange
  onChange?: (value: DateRange) => void
}

export default function DateRangeSelect({ value = '30d', onChange }: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selected = OPTIONS.find(o => o.value === value) ?? OPTIONS[2]

  // Cierra al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={`${styles.trigger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {selected.label}
        <ChevronDown className={styles.chevron} />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.active : ''}`}
              onClick={() => {
                onChange?.(opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}