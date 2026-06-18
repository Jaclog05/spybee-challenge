import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import AppShell from '@/components/layout/AppShell'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Spybee Challenge',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppShell>
          <Navbar />
          <Sidebar />
          <main style={{ gridArea: 'content', position: 'relative', overflowY: 'scroll' }}>
            {children}
          </main>
        </AppShell>
      </body>
    </html>
  )
}