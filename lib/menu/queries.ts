import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

// Types
export interface Branch {
  _id: string
  name: string
  slug: { current: string }
  address?: string
  phone?: string
  whatsapp?: string
  operatingHours?: string
  googleMapsUrl?: string
  isActive: boolean
}

export interface MenuCategory {
  _id: string
  name: string
  slug?: { current: string }
  description?: string
  image?: unknown
  displayOrder: number
  isActive: boolean
  type?: 'food' | 'drink'
}

export interface MenuItem {
  _id: string
  name: string
  description?: string
  image?: unknown
  category: {
    _id: string
    name?: string
    slug?: { current: string }
  }
  branchPricing?: Array<{
    branch: { _id: string; slug: { current: string } }
    price: number
    isAvailable: boolean
    isHighlighted?: boolean
  }>
  dietaryTags?: string[]
  displayOrder: number
  isActive: boolean
  isNew?: boolean
  isPopular?: boolean
  popularAt?: 'all' | 'smouha' | 'fouad-street'
}

// Homepage Types
export interface FeatureItem {
  title: string
  description: string
  icon: string
}
// Homepage Types (Kept for Component Compatibility)
export interface HeroSection {
  _type: 'hero'
  title: string
  subtitle: string
  image: unknown
  ctaText: string
  ctaLink: string
}

export interface FeaturesSection {
  _type: 'features'
  title: string
  items: FeatureItem[]
}


// Site Settings Types
// Site Settings Types
export interface SiteSettings {
  hero?: {
    title: string
    subtitle: string
    image: unknown
    ctaText: string
    ctaLink: string
  }
  features?: FeatureItem[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    canonicalUrl?: string
    ogImage?: unknown
    robots?: {
      noIndex: boolean
      noFollow: boolean
    }
    openGraph?: {
      title?: string
      description?: string
      image?: unknown
    }
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    tiktok?: string
    talabat?: string
  }
  contactInfo?: {
    phoneNumbers?: string[]
    workingHours?: string
  }
}

// Queries
export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings"][0]{
    hero,
    features,
    seo,
    socialLinks,
    contactInfo
  }`)
}

export async function getBranches(): Promise<Branch[]> {
  return client.fetch(`
    *[_type == "branch" && isActive == true] | order(name asc) {
      _id,
      name,
      slug,
      address,
      phone,
      whatsapp,
      operatingHours,
      googleMapsUrl,
      isActive
    }
  `)
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  return client.fetch(`
    *[_type == "branch" && slug.current == $slug && isActive == true][0] {
      _id,
      name,
      slug,
      address,
      phone,
      whatsapp,
      operatingHours,
      isActive
    }
  `, { slug })
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  return client.fetch(`
    *[_type == "menuCategory" && isActive == true] | order(displayOrder asc) {
      _id,
      name,
      slug,
      description,
      image,
      displayOrder,
      isActive,
      type
    }
  `)
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return client.fetch(`
    *[_type == "menuItem" && isActive == true] | order(displayOrder asc) {
      _id,
      _type,
      name,
      description,
      image,
      category->{
        _id,
        name,
        slug
      },
      branchPricing[]{
        branch->{
          _id,
          slug
        },
        price,
        isAvailable,
        isHighlighted
      },
      dietaryTags,
      displayOrder,
      isActive,
      isNew,
      isPopular,
      popularAt
    }
  `)
}

// Transform menu items for display
export function transformMenuItemsForDisplay(
  items: MenuItem[],
  branchSlug?: string
): Array<{
  _id: string
  name: string
  description?: string
  image?: { url: string; alt?: string }
  categorySlug: string
  price?: number
  dietaryTags?: string[]
  isNew?: boolean
  isPopular?: boolean
  isAvailable: boolean
}> {
  return items.map((item) => {
    let price: number | undefined
    let isAvailable = true

    // Popularity Logic
    let isPopular = false
    if (item.isPopular) {
      const scope = item.popularAt || 'all'
      if (scope === 'all') {
        isPopular = true
      } else if (branchSlug && scope === branchSlug) {
        isPopular = true
      }
    }

    if (branchSlug && item.branchPricing) {
      const branchPrice = item.branchPricing.find(
        (bp) => bp.branch?.slug?.current === branchSlug
      )
      if (branchPrice) {
        price = branchPrice.price
        isAvailable = branchPrice.isAvailable !== false
        if (branchPrice.isHighlighted) isPopular = true
      }
    }

    return {
      _id: item._id,
      name: item.name,
      description: item.description,
      image: item.image
        ? {
          url: urlFor(item.image).width(450).height(800).url(),
          alt: item.name,
        }
        : undefined,
      categorySlug: item.category?.slug?.current || item.category?.name?.toLowerCase().replace(/\s+/g, '-') || '',
      price,
      dietaryTags: item.dietaryTags,
      isNew: item.isNew,
      isPopular,
      isAvailable,
    }
  })
}

// Group items by category
export function groupItemsByCategory(
  items: ReturnType<typeof transformMenuItemsForDisplay>,
  categories: MenuCategory[]
): Array<{
  category: Omit<MenuCategory, 'image'> & { image?: { url: string; alt?: string } }
  items: typeof items
}> {
  // Helper to safely get category slug
  const getCatSlug = (c: MenuCategory) => c.slug?.current || c.name.toLowerCase().replace(/\s+/g, '-')

  // 1. Map existing categories
  const standardGroups = categories
    .map((category) => {
      const catSlug = getCatSlug(category)
      return {
        category: {
          ...category,
          image: category.image ? {
            url: urlFor(category.image).width(400).height(400).url(),
            alt: category.name
          } : undefined
        },
        items: items.filter(
          (item) => item.categorySlug === catSlug && item.isAvailable
        ),
      }
    })
    .filter((group) => group.items.length > 0)

  // 2. Identify Drink Category Slugs for type separation
  const drinkSlugs = new Set(
    categories
      .filter((c) => c.type === 'drink')
      .map(getCatSlug)
  )

  // 3. Create Popular Groups
  const popularGroups: Array<{
    category: Omit<MenuCategory, 'image'> & { image?: { url: string; alt?: string } }
    items: typeof items
  }> = []

  // Popular Food
  const popularFood = items.filter(
    (i) => i.isPopular && i.isAvailable && !drinkSlugs.has(i.categorySlug)
  )

  if (popularFood.length > 0) {
    popularGroups.push({
      category: {
        _id: 'popular-food',
        name: 'Popular',
        slug: { current: 'popular-food' },
        displayOrder: -1,
        isActive: true,
        type: 'food',
        description: "Our guests' favorite dishes"
      },
      items: popularFood
    })
  }

  // Popular Drinks
  const popularDrink = items.filter(
    (i) => i.isPopular && i.isAvailable && drinkSlugs.has(i.categorySlug)
  )

  if (popularDrink.length > 0) {
    popularGroups.push({
      category: {
        _id: 'popular-drinks',
        name: 'Popular',
        slug: { current: 'popular-drinks' },
        displayOrder: -1,
        isActive: true,
        type: 'drink',
        description: "Most loved refreshments"
      },
      items: popularDrink
    })
  }

  return [...popularGroups, ...standardGroups]
}
