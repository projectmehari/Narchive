'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { archives, categories } from '@/lib/data'
import Header from '@/components/header'
import ArchiveCard from '@/components/archive-card'
import SearchBar from '@/components/search-bar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredArchives = useMemo(() => {
    return archives.filter((archive) => {
      const matchesSearch =
        archive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesCategory =
        selectedCategory === 'All' || archive.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            DAO Archives Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore blockchain-based containers organizing DAO content, proposals, and cultural artifacts
            through ERC-6551 technology. Search, filter, and discover archives across categories.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArchives.length} of {archives.length} archives
          </p>
        </div>

        {/* Archives Grid */}
        {filteredArchives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchives.map((archive) => (
              <Link
                key={archive.id}
                href={`/archive/${archive.id}`}
                className="h-full"
              >
                <ArchiveCard archive={archive} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-2">No archives found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
