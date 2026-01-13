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

export interface FeaturesSection {
  _type: 'features'
  title: string
  items: FeatureItem[]
}

export interface HeroSection {
  _type: 'hero'
  title: string
  subtitle: string
  image: unknown
  ctaText: string
  ctaLink: string
}

export type HomepageSection = FeaturesSection | HeroSection

export interface HomepageData {
  title: string
  sections?: HomepageSection[]
}

// Site Settings Types
export interface SiteSettings {
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
    socialLinks,
    contactInfo
  }`)
}
export async function getHomepage(): Promise<HomepageData> {
  return client.fetch(`
    *[_type == "homepage"][0] {
      title,
      sections[]{
        _type,
        _type == 'hero' => {
          title,
          subtitle,
          image,
          ctaText,
          ctaLink
        },
        _type == 'features' => {
          title,
          items[]{
            title,
            description,
            icon
          }
        }
      }
    }
  `)
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
  return categories
    .map((category) => {
      const catSlug = category.slug?.current || category.name.toLowerCase().replace(/\s+/g, '-')
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
}
