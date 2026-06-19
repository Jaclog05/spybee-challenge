import { create } from 'zustand'

interface User {
  email: string
  userName: string
  role: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const VALID_EMAIL = 'superadmin@spybee.com'
const VALID_PASSWORD = '123456'

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  login: (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      set({ user: { email, userName: 'Julian', role: 'Superadmin' } })
      return true
    }
    return false
  },

  logout: () => {
    set({ user: null })
  },
}))
