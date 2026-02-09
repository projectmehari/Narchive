import Image from 'next/image'
import { Archive } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

interface ArchiveCardProps {
  archive: Archive
}

export default function ArchiveCard({ archive }: ArchiveCardProps) {
  return (
    <div className="group rounded-lg border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={archive.image}
          alt={archive.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          priority={false}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Header */}
        <div className="mb-3">
          <Badge variant="secondary" className="mb-2">
            {archive.category}
          </Badge>
          <h3 className="text-lg font-semibold leading-tight text-balance">
            {archive.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {archive.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {archive.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
          {archive.tags.length > 2 && (
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{archive.tags.length - 2}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-muted-foreground">By {archive.owner}</p>
              <p className="font-medium">{archive.nftCount} NFTs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
