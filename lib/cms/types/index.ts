/**
 * CMS Service Interface
 * All CMS implementations (Sanity, Payload, etc.) must implement this interface
 * to ensure consistency across the application.
 */

import type {
  PageDTO,
  SettingsDTO,
  NavigationDTO,
  BlogPostDTO,
  PaginatedResponse,
  HomepageDTO,
  SiteSettingsDTO,
  PolicyDTO,
} from './dtos'

export * from './dtos'

export interface CMSService {
  /**
   * Get a single page by slug and locale
   */
  getPage(slug: string, locale: string): Promise<PageDTO | null>

  /**
   * Get all pages for a specific locale
   */
  getPages(locale: string): Promise<PageDTO[]>

  /**
   * Get global site settings for a specific locale
   */
  getSettings(locale: string): Promise<SettingsDTO>

  /**
   * Get navigation items for a specific locale
   */
  getNavigation(locale: string): Promise<NavigationDTO>

  /**
   * Get a single blog post by slug and locale
   */
  getPost(slug: string, locale: string): Promise<BlogPostDTO | null>

  /**
   * Get paginated blog posts for a specific locale
   */
  getPosts(
    locale: string,
    options?: {
      page?: number
      pageSize?: number
      category?: string
      tag?: string
    }
  ): Promise<PaginatedResponse<BlogPostDTO>>

  /**
   * Get all page slugs for a specific locale (used for static generation)
   */
  getAllPageSlugs(locale: string): Promise<string[]>

  /**
   * Get all blog post slugs for a specific locale (used for static generation)
   */
  getAllPostSlugs(locale: string): Promise<string[]>

  /**
   * Get products with optional filtering
   */
  /**
   * Get homepage settings
   */
  getHomepageSettings(): Promise<HomepageDTO | null>

  /**
   * Get site settings (footer, business hours, etc.)
   */
  getSiteSettings(): Promise<SiteSettingsDTO | null>

  /**
   * Get all published policies
   */
  getPolicies(): Promise<PolicyDTO[]>

  /**
   * Get a single policy by slug
   */
  getPolicyBySlug(slug: string): Promise<PolicyDTO | null>
}
