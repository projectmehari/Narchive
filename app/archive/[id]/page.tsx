'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { archives } from '@/lib/data'
import Header from '@/components/header'
import { Badge } from '@/components/ui/badge'

export default function ArchivePage() {
  const params = useParams()
  const id = params.id as string
  const archive = archives.find((a) => a.id === id)
  const [copied, setCopied] = useState(false)

  if (!archive) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Archive not found</h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to archives
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(archive.contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to archives
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="relative h-80 w-full rounded-lg overflow-hidden bg-muted sticky top-24">
              <Image
                src={archive.image}
                alt={archive.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="default" className="mb-3">
                    {archive.category}
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight">
                    {archive.name}
                  </h1>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {archive.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground mb-1">NFTs Stored</p>
                <p className="text-2xl font-bold">{archive.nftCount}</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Owner</p>
                <p className="text-lg font-semibold text-balance">{archive.owner}</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-sm text-muted-foreground mb-1">Created</p>
                <p className="text-lg font-semibold">
                  {new Date(archive.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {archive.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contract Address */}
            <div className="p-4 rounded-lg border border-border bg-card/50">
              <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
              <div className="flex items-center gap-2 font-mono text-sm">
                <code className="break-all text-foreground">{archive.contractAddress}</code>
                <button
                  onClick={handleCopyAddress}
                  className="ml-auto p-2 hover:bg-secondary rounded transition-colors flex-shrink-0"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Description Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About This Archive</h2>
              <p className="text-muted-foreground leading-relaxed">
                This archive uses ERC-6551 token-bound accounts to organize and manage NFTs
                in a structured way. Each container can hold multiple NFTs related to{' '}
                {archive.category.toLowerCase()} activities, making it easy for the DAO to
                maintain organized records and historical documentation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Members of {archive.owner} can explore the contents, participate in
                governance decisions, and contribute new materials to the archive through
                DAO proposals and voting mechanisms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
