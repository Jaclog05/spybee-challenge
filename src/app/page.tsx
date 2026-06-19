'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import styles from './Login.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const router = useRouter()
  const login = useAuthStore(s => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [credencialError, setCredencialError] = useState('')

  function handleEmailBlur() {
    if (email && !EMAIL_REGEX.test(email)) {
      setEmailError('Correo electrónico inválido')
    } else {
      setEmailError('')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCredencialError('')

    if (!email || !password) {
      setCredencialError('Todos los campos son obligatorios')
      return
    }

    const ok = login(email, password)
    if (ok) {
      router.push('/dashboard')
    } else {
      setCredencialError('Credenciales inválidas')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/spybee-logo-black.svg"
          alt="Spybee"
          width={140}
          height={74}
          priority
          className={styles.logo}
        />
        <h1 className={styles.title}>Iniciar sesión</h1>
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@spybee.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setCredencialError(''); setEmailError('') }}
              onBlur={handleEmailBlur}
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            />
            {emailError && <span className={styles.errorText}>{emailError}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setCredencialError('') }}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {credencialError && <span className={styles.credencialError}>{credencialError}</span>}
          <button type="submit" className={styles.submitBtn}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
