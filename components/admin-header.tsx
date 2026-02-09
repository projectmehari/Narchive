import { Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminHeader() {
  return (
    <div className="mb-8 flex items-center justify-between py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <Link
        href="/"
        className="text-sm font-medium text-primary hover:underline"
      >
        Back to Archives
      </Link>
    </div>
  )
}
