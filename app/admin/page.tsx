'use client'

import { useState } from 'react'
import Link from 'next/link'
import { archives } from '@/lib/data'
import Header from '@/components/header'
import { Archive as ArchiveIcon, Edit2, Trash2, Plus } from 'lucide-react'
import AdminHeader from '@/components/admin-header'
import AdminArchiveForm from '@/components/admin-archive-form'

export default function AdminPage() {
  const [archivesList, setArchivesList] = useState(archives)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingArchive, setEditingArchive] = useState<typeof archives[0] | null>(null)

  const handleAddArchive = (newArchive: Omit<typeof archives[0], 'id'>) => {
    const id = (Math.max(...archivesList.map(a => parseInt(a.id))) + 1).toString()
    setArchivesList([...archivesList, { ...newArchive, id }])
    setIsFormOpen(false)
  }

  const handleEditArchive = (archive: typeof archives[0]) => {
    setEditingArchive(archive)
    setEditingId(archive.id)
    setIsFormOpen(true)
  }

  const handleUpdateArchive = (updated: Omit<typeof archives[0], 'id'>) => {
    setArchivesList(
      archivesList.map((a) =>
        a.id === editingId ? { ...updated, id: editingId } : a
      )
    )
    setIsFormOpen(false)
    setEditingId(null)
    setEditingArchive(null)
  }

  const handleDeleteArchive = (id: string) => {
    if (window.confirm('Are you sure you want to delete this archive?')) {
      setArchivesList(archivesList.filter((a) => a.id !== id))
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setEditingArchive(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage Narchive containers and archives
            </p>
          </div>
          <button
            onClick={() => {
              setEditingArchive(null)
              setEditingId(null)
              setIsFormOpen(!isFormOpen)
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Archive
          </button>
        </div>

        {/* Form Section */}
        {isFormOpen && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Archive' : 'Create New Archive'}
            </h2>
            <AdminArchiveForm
              initialArchive={editingArchive || undefined}
              onSubmit={editingId ? handleUpdateArchive : handleAddArchive}
              onCancel={handleCloseForm}
            />
          </div>
        )}

        {/* Archives Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    NFTs
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {archivesList.map((archive) => (
                  <tr
                    key={archive.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/archive/${archive.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {archive.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {archive.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {archive.owner}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {archive.nftCount}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(archive.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditArchive(archive)}
                          className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArchive(archive.id)}
                          className="p-2 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {archivesList.length === 0 && (
            <div className="p-8 text-center">
              <ArchiveIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">No archives yet</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total Archives</p>
            <p className="text-2xl font-bold">{archivesList.length}</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Total NFTs</p>
            <p className="text-2xl font-bold">
              {archivesList.reduce((sum, a) => sum + a.nftCount, 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Categories</p>
            <p className="text-2xl font-bold">
              {new Set(archivesList.map((a) => a.category)).size}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
