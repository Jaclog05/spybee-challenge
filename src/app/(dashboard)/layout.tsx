import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import AppShell from '@/components/layout/AppShell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
