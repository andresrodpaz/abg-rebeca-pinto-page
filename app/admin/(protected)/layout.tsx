import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLayoutShell from '@/components/admin-layout-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null
  try {
    session = await auth.api.getSession({ headers: await headers() })
  } catch {
    // Auth not yet configured
  }
  if (!session?.user) redirect('/admin/login')

  return (
    <AdminLayoutShell userEmail={session.user.email ?? 'admin@rebecapinto.com'}>
      {children}
    </AdminLayoutShell>
  )
}

