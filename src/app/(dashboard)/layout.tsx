'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import AppShell from '@/components/layout/AppShell'
import { useAuthStore } from '@/store/useAuthStore'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore(s => s.user)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) return null

  return (
    <AppShell>
      <Navbar />
      <Sidebar />
      <main style={{ gridArea: 'content', position: 'relative', overflowY: 'scroll' }}>
        {children}
      </main>
    </AppShell>
  )
}
