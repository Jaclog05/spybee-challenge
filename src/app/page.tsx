import Image from 'next/image'
import styles from './Login.module.scss'

export default function Login() {
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
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@spybee.com"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
