/**
 * Data Transfer Objects (DTOs) for CMS content
 * These types are CMS-agnostic and represent the standardized data structure
 * used throughout the application, regardless of the underlying CMS.
 */

export interface ImageDTO {
  url: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: ImageDTO
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface PageDTO {
  id: string
  slug: string
  title: string
  description: string
  content: unknown // Flexible content - can be Portable Text, HTML, or custom structure
  seo: SEOMetadata
  publishedAt: Date
  updatedAt: Date
  locale?: string
}

export interface SocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  github?: string
}

export interface SettingsDTO {
  siteName: string
  siteUrl: string
  siteDescription: string
  logo?: ImageDTO
  favicon?: ImageDTO
  social: SocialLinks
  gtmId?: string
  contactEmail?: string
  defaultLocale: string
  supportedLocales: string[]
}

export interface NavItemDTO {
  id: string
  label: string
  href: string
  target?: '_blank' | '_self'
  children?: NavItemDTO[]
}

export interface NavigationDTO {
  items: NavItemDTO[]
}

export interface BlogPostDTO extends PageDTO {
  excerpt: string
  author?: AuthorDTO
  categories?: CategoryDTO[]
  tags?: string[]
  featuredImage?: ImageDTO
  estimatedReadingTime?: number
}

export interface AuthorDTO {
  id: string
  name: string
  bio?: string
  avatar?: ImageDTO
  social?: SocialLinks
}





export interface CategoryDTO {
  id: string
  name: string
  slug: string
  description?: string
}



import { type Homepage, type HeroSection, type FeaturesSection, type FeatureItem, type Section } from './schema'

export type HomepageDTO = Homepage
export type { HeroSection, FeaturesSection, FeatureItem, Section }

export interface SiteSettingsDTO {
  headerLogo?: ImageDTO
  footerLogo?: ImageDTO
  favicon?: ImageDTO
  footerDescription?: string
  address?: string
  businessHours?: string
  googleMapsUrl?: string
  quickLinks?: Array<{ title: string; url: string }>
  socialLinks?: {
    facebook?: string
    instagram?: string
  }
  announcementBar?: {
    enabled?: boolean
    message?: string
    backgroundColor?: string
    textColor?: string
  }
  dealsPageBackground?: ImageDTO
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: ImageDTO
  }
}





/**
 * Generic list response for paginated content
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Policy DTO for store policies (Return, Shipping, Privacy, etc.)
 */
export interface PolicyDTO {
  id: string
  title: string
  slug: string
  icon?: string
  shortDescription?: string
  content: unknown // Portable Text content
  lastUpdated?: string
  isPublished: boolean
}
