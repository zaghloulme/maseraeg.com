/**
 * Sanity CMS Service Implementation
 * Implements the CMSService interface using Sanity as the backend
 */

import type {
  CMSService,
  PageDTO,
  SettingsDTO,
  NavigationDTO,
  BlogPostDTO,
  PaginatedResponse,
  HomepageDTO,
  SiteSettingsDTO,
} from '../types'
import { sanityClient } from './client'
import { SanityTransformer } from './transformer'

export class SanityService implements CMSService {
  async getPage(slug: string, locale: string): Promise<PageDTO | null> {
    const query = `*[_type == "page" && slug.current == $slug && locale == $locale][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      content,
      seo,
      publishedAt,
      locale
    }`

    const page = await sanityClient.fetch(query, { slug, locale })
    return page ? SanityTransformer.transformPage(page) : null
  }

  async getPages(locale: string): Promise<PageDTO[]> {
    const query = `*[_type == "page" && locale == $locale] | order(publishedAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      content,
      seo,
      publishedAt,
      locale
    }`

    const pages = await sanityClient.fetch(query, { locale })
    return pages.map(SanityTransformer.transformPage)
  }

  async getSettings(locale: string): Promise<SettingsDTO> {
    const query = `*[_type == "siteSettings"][0] {
      siteName,
      siteUrl,
      siteDescription,
      logo,
      favicon,
      social,
      gtmId,
      contactEmail,
      defaultLocale,
      supportedLocales
    }`

    const settings = await sanityClient.fetch(query, { locale })

    // Return default settings if none found
    if (!settings) {
      return {
        siteName: 'My Site',
        siteUrl: '',
        siteDescription: '',
        social: {},
        defaultLocale: locale,
        supportedLocales: [locale],
      }
    }

    return SanityTransformer.transformSettings(settings)
  }

  async getNavigation(locale: string): Promise<NavigationDTO> {
    const query = `*[_type == "navigation" && locale == $locale][0] {
      items[] {
        _key,
        label,
        href,
        target,
        children[] {
          _key,
          label,
          href,
          target
        }
      }
    }`

    const nav = await sanityClient.fetch(query, { locale })

    // Return empty navigation if none found
    if (!nav) {
      return { items: [] }
    }

    return SanityTransformer.transformNavigation(nav)
  }

  async getPost(slug: string, locale: string): Promise<BlogPostDTO | null> {
    const query = `*[_type == "post" && slug.current == $slug && locale == $locale][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      excerpt,
      content,
      seo,
      publishedAt,
      locale,
      featuredImage,
      author->{
        _id,
        name,
        bio,
        avatar,
        social
      },
      categories[]->{
        _id,
        name,
        slug,
        description
      },
      tags,
      estimatedReadingTime
    }`

    const post = await sanityClient.fetch(query, { slug, locale })
    return post ? SanityTransformer.transformPost(post) : null
  }

  async getPosts(
    locale: string,
    options?: {
      page?: number
      pageSize?: number
      category?: string
      tag?: string
    }
  ): Promise<PaginatedResponse<BlogPostDTO>> {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    // Build filter conditions
    let filters = `_type == "post" && locale == $locale`
    const params: Record<string, unknown> = { locale }

    if (options?.category) {
      filters += ` && $category in categories[]->slug.current`
      params.category = options.category
    }

    if (options?.tag) {
      filters += ` && $tag in tags`
      params.tag = options.tag
    }

    // Get total count
    const countQuery = `count(*[${filters}])`
    const total = await sanityClient.fetch(countQuery, params)

    // Get paginated posts
    const query = `*[${filters}] | order(publishedAt desc) [${start}...${end}] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      excerpt,
      content,
      seo,
      publishedAt,
      locale,
      featuredImage,
      author->{
        _id,
        name,
        bio,
        avatar,
        social
      },
      categories[]->{
        _id,
        name,
        slug,
        description
      },
      tags,
      estimatedReadingTime
    }`

    const posts = await sanityClient.fetch(query, params)

    return {
      items: posts.map(SanityTransformer.transformPost),
      total,
      page,
      pageSize,
      hasMore: end < total,
    }
  }

  async getAllPageSlugs(locale: string): Promise<string[]> {
    const query = `*[_type == "page" && locale == $locale].slug.current`
    return sanityClient.fetch(query, { locale })
  }

  async getAllPostSlugs(locale: string): Promise<string[]> {
    const query = `*[_type == "post" && locale == $locale].slug.current`
    return sanityClient.fetch(query, { locale })
  }

  async getHomepageSettings(): Promise<HomepageDTO | null> {
    const query = `*[_id == "homepage"][0] {
      title,
      sections[] {
        ...,
        _type == 'hero' => {
          image {
            asset->,
            alt
          }
        },
        _type == 'features' => {
          items[]
        }
      }
    }`

    const homepage = await sanityClient.fetch(query)
    return homepage ? SanityTransformer.transformHomepage(homepage) : null
  }

  async getSiteSettings(): Promise<SiteSettingsDTO | null> {
    const query = `*[_type == "siteSettings"][0] {
      headerLogo {
        asset-> {
          _id,
          url,
          mimeType,
          metadata {
            dimensions {
              width,
              height
            },
            lqip
          }
        },
        alt
      },
      footerLogo {
        asset-> {
          _id,
          url,
          mimeType,
          metadata {
            dimensions {
              width,
              height
            },
            lqip
          }
        },
        alt
      },
      favicon {
        asset->,
        alt
      },
      footerDescription,
      address,
      businessHours,
      googleMapsUrl,
      googleMapsUrl,
      quickLinks,
      socialLinks,
      announcementBar,
      seo {
        metaTitle,
        metaDescription,
        keywords,
        ogImage {
          asset->,
          alt
        }
      }
    }`

    const settings = await sanityClient.fetch(query)
    if (!settings) return null

    const transformedHeaderLogo = settings.headerLogo ? SanityTransformer.transformImage(settings.headerLogo) : undefined
    const transformedFooterLogo = settings.footerLogo ? SanityTransformer.transformImage(settings.footerLogo) : undefined
    const transformedFavicon = settings.favicon ? SanityTransformer.transformImage(settings.favicon) : undefined
    const transformedOgImage = settings.seo?.ogImage ? SanityTransformer.transformImage(settings.seo.ogImage) : undefined

    return {
      headerLogo: transformedHeaderLogo,
      footerLogo: transformedFooterLogo,
      favicon: transformedFavicon,
      footerDescription: settings.footerDescription,
      address: settings.address,
      businessHours: settings.businessHours,
      googleMapsUrl: settings.googleMapsUrl,
      quickLinks: settings.quickLinks,
      socialLinks: settings.socialLinks,
      announcementBar: settings.announcementBar,
      seo: settings.seo ? {
        ...settings.seo,
        ogImage: transformedOgImage
      } : undefined,
    }
  }



  async getPolicies(): Promise<import('../types').PolicyDTO[]> {
    const query = `* [_type == "policy" && isPublished == true] | order(order asc) {
      _id,
        title,
        slug,
        icon,
        shortDescription,
        content,
        lastUpdated,
        isPublished,
        order
    } `

    const policies = await sanityClient.fetch<Array<{
      _id: string
      title: string
      slug: { current: string }
      icon?: string
      shortDescription?: string
      content: unknown
      lastUpdated?: string
      isPublished?: boolean
    }>>(query)
    return policies.map((policy) => ({
      id: policy._id,
      title: policy.title,
      slug: policy.slug.current,
      icon: policy.icon,
      shortDescription: policy.shortDescription,
      content: policy.content,
      lastUpdated: policy.lastUpdated,
      isPublished: policy.isPublished ?? true,
    }))
  }

  async getPolicyBySlug(slug: string): Promise<import('../types').PolicyDTO | null> {
    const query = `* [_type == "policy" && slug.current == $slug][0] {
      _id,
        title,
        slug,
        icon,
        shortDescription,
        content,
        lastUpdated,
        isPublished,
        order
    } `

    const policy = await sanityClient.fetch(query, { slug })
    if (!policy) return null

    return {
      id: policy._id,
      title: policy.title,
      slug: policy.slug.current,
      icon: policy.icon,
      shortDescription: policy.shortDescription,
      content: policy.content,
      lastUpdated: policy.lastUpdated,
      isPublished: policy.isPublished ?? true,
    }
  }
}
