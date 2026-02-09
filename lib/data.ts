export interface Archive {
  id: string
  name: string
  description: string
  category: string
  nftCount: number
  owner: string
  createdAt: string
  image: string
  tags: string[]
  contractAddress: string
}

export const archives: Archive[] = [
  {
    id: '1',
    name: 'Protocol Governance',
    description: 'Historical governance proposals and voting records for the protocol',
    category: 'Governance',
    nftCount: 42,
    owner: 'MainDAO',
    createdAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
    tags: ['governance', 'voting', 'proposals'],
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f123',
  },
  {
    id: '2',
    name: 'Treasury Records',
    description: 'Complete treasury management and allocation history',
    category: 'Finance',
    nftCount: 156,
    owner: 'FinanceDAO',
    createdAt: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1579621970563-430f63602702?w=400&h=300&fit=crop',
    tags: ['treasury', 'finance', 'budget'],
    contractAddress: '0x8934Cc6634C0532925a3b844Bc9e7595f456',
  },
  {
    id: '3',
    name: 'Community Events',
    description: 'Documentation of community events, meetups, and activations',
    category: 'Community',
    nftCount: 89,
    owner: 'CommunityDAO',
    createdAt: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    tags: ['events', 'community', 'meetups'],
    contractAddress: '0x5607Cc6634C0532925a3b844Bc9e7595f789',
  },
  {
    id: '4',
    name: 'Research Papers',
    description: 'Published research and whitepapers from the research team',
    category: 'Research',
    nftCount: 34,
    owner: 'ResearchDAO',
    createdAt: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop',
    tags: ['research', 'papers', 'academic'],
    contractAddress: '0x2345Cc6634C0532925a3b844Bc9e7595f012',
  },
  {
    id: '5',
    name: 'Art & Culture',
    description: 'Curated collection of artistic works and cultural artifacts',
    category: 'Culture',
    nftCount: 127,
    owner: 'CultureDAO',
    createdAt: '2024-02-28',
    image: 'https://images.unsplash.com/photo-1551913921-b66c1f3065c8?w=400&h=300&fit=crop',
    tags: ['art', 'culture', 'creative'],
    contractAddress: '0x6789Cc6634C0532925a3b844Bc9e7595f345',
  },
  {
    id: '6',
    name: 'Technical Documentation',
    description: 'Smart contract code, audit reports, and technical specifications',
    category: 'Technical',
    nftCount: 76,
    owner: 'DevDAO',
    createdAt: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    tags: ['technical', 'development', 'contracts'],
    contractAddress: '0x4321Cc6634C0532925a3b844Bc9e7595f678',
  },
  {
    id: '7',
    name: 'Marketing Materials',
    description: 'Brand guidelines, campaigns, and promotional content archive',
    category: 'Marketing',
    nftCount: 203,
    owner: 'MarketingDAO',
    createdAt: '2024-02-14',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e6904d4e?w=400&h=300&fit=crop',
    tags: ['marketing', 'brand', 'campaigns'],
    contractAddress: '0x9876Cc6634C0532925a3b844Bc9e7595f901',
  },
  {
    id: '8',
    name: 'Education Hub',
    description: 'Educational materials, tutorials, and learning resources',
    category: 'Education',
    nftCount: 95,
    owner: 'EduDAO',
    createdAt: '2024-03-01',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    tags: ['education', 'learning', 'tutorials'],
    contractAddress: '0x1122Cc6634C0532925a3b844Bc9e7595f234',
  },
]

export const categories = [
  'All',
  'Governance',
  'Finance',
  'Community',
  'Research',
  'Culture',
  'Technical',
  'Marketing',
  'Education',
]
