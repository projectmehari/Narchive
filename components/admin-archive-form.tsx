'use client'

import { useState } from 'react'
import { Archive } from '@/lib/data'

interface AdminArchiveFormProps {
  initialArchive?: Archive
  onSubmit: (archive: Omit<Archive, 'id'>) => void
  onCancel: () => void
}

export default function AdminArchiveForm({
  initialArchive,
  onSubmit,
  onCancel,
}: AdminArchiveFormProps) {
  const [formData, setFormData] = useState<Omit<Archive, 'id'>>({
    name: initialArchive?.name || '',
    description: initialArchive?.description || '',
    category: initialArchive?.category || 'Governance',
    nftCount: initialArchive?.nftCount || 0,
    owner: initialArchive?.owner || '',
    createdAt: initialArchive?.createdAt || new Date().toISOString().split('T')[0],
    image: initialArchive?.image || '',
    tags: initialArchive?.tags || [],
    contractAddress: initialArchive?.contractAddress || '',
  })

  const [tagInput, setTagInput] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'nftCount' ? parseInt(value) || 0 : value,
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Archive name"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option>Governance</option>
            <option>Finance</option>
            <option>Community</option>
            <option>Research</option>
            <option>Culture</option>
            <option>Technical</option>
            <option>Marketing</option>
            <option>Education</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="DAO name"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">NFT Count</label>
          <input
            type="number"
            name="nftCount"
            value={formData.nftCount}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Created Date</label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Contract Address</label>
          <input
            type="text"
            name="contractAddress"
            value={formData.contractAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="0x..."
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Archive description"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTag()
              }
            }}
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Add tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <div
              key={index}
              className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm flex items-center gap-2"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-1 hover:opacity-70"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
        >
          {initialArchive ? 'Update Archive' : 'Create Archive'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg border border-border bg-background hover:bg-muted font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
