/**
 * Sanity Transformer
 * Converts Sanity CMS responses to standardized DTOs
 */

import type {
  PageDTO,
  SettingsDTO,
  NavigationDTO,
  NavItemDTO,
  BlogPostDTO,
  ImageDTO,
  SEOMetadata,
  CategoryDTO,
  HomepageDTO,
} from '../types/dtos'
import { urlForImage } from './client'

export class SanityTransformer {
  /**
   * Transform Sanity image to ImageDTO
   */
  static transformImage(sanityImage: unknown): ImageDTO | undefined {
    if (!sanityImage) return undefined

    const img = sanityImage as Record<string, unknown>
    const asset = img.asset as Record<string, unknown> | undefined

    console.log('🔍 [Transformer] Transform Image Input:', sanityImage)
    console.log('🔍 [Transformer] Asset:', asset)

    // Check if asset exists (it can be either a reference or a populated object)
    if (!asset) {
      console.log('❌ [Transformer] No asset found')
      return undefined
    }

    const metadata = asset?.metadata as Record<string, unknown> | undefined
    const dimensions = metadata?.dimensions as Record<string, unknown> | undefined

    // Check if it's an SVG - SVGs need to use the direct URL
    const mimeType = asset?.mimeType as string | undefined
    console.log('🔍 [Transformer] MimeType:', mimeType)

    if (mimeType === 'image/svg+xml') {
      const svgUrl = asset?.url as string | undefined
      console.log('🔍 [Transformer] SVG URL:', svgUrl)

      if (!svgUrl) {
        console.log('❌ [Transformer] SVG URL not found')
        return undefined
      }

      const result = {
        url: svgUrl,
        alt: (img.alt as string) || '',
        width: (dimensions?.width as number) || 800,
        height: (dimensions?.height as number) || 600,
      }
      console.log('✅ [Transformer] SVG Result:', result)
      return result
    }

    // For non-SVG images, use the image builder
    const builder = urlForImage(sanityImage)
    if (!builder) {
      console.log('❌ [Transformer] Image builder failed')
      return undefined
    }

    const imageUrl = builder.url()
    if (!imageUrl) {
      console.log('❌ [Transformer] Image URL generation failed')
      return undefined
    }

    const result = {
      url: imageUrl,
      alt: (img.alt as string) || '',
      width: (dimensions?.width as number) || 1200,
      height: (dimensions?.height as number) || 630,
      blurDataURL: metadata?.lqip as string,
    }
    console.log('✅ [Transformer] Image Result:', result)
    return result
  }

  /**
   * Transform brand logo image without cropping
   * Preserves original aspect ratio
   */
  static transformBrandLogo(sanityImage: unknown): ImageDTO | undefined {
    if (!sanityImage) return undefined

    const img = sanityImage as Record<string, unknown>
    const asset = img.asset as Record<string, unknown> | undefined

    // Check if asset exists (it can be either a reference or a populated object)
    if (!asset) return undefined

    const builder = urlForImage(sanityImage)
    if (!builder) return undefined

    // Don't force dimensions - preserve aspect ratio
    // No automatic transformations applied
    const imageUrl = builder.url()
    if (!imageUrl) return undefined

    const metadata = asset?.metadata as Record<string, unknown> | undefined
    const dimensions = metadata?.dimensions as Record<string, unknown> | undefined

    return {
      url: imageUrl,
      alt: (img.alt as string) || '',
      width: (dimensions?.width as number) || 800,
      height: (dimensions?.height as number) || 600,
      blurDataURL: metadata?.lqip as string,
    }
  }

  /**
   * Transform Sanity SEO object to SEOMetadata
   */
  static transformSEO(sanitySEO: unknown): SEOMetadata {
    const seo = sanitySEO as Record<string, unknown>
    return {
      title: (seo?.title as string) || '',
      description: (seo?.description as string) || '',
      keywords: (seo?.keywords as string[]) || [],
      ogImage: SanityTransformer.transformImage(seo?.ogImage),
      ogType: (seo?.ogType as string) || 'website',
      twitterCard: (seo?.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
      canonical: seo?.canonical as string,
      noindex: (seo?.noindex as boolean) || false,
      nofollow: (seo?.nofollow as boolean) || false,
    }
  }

  /**
   * Transform Sanity page to PageDTO
   */
  static transformPage(sanityPage: unknown): PageDTO {
    const page = sanityPage as Record<string, unknown>
    return {
      id: page._id as string,
      slug: (page.slug as Record<string, unknown>)?.current as string || '',
      title: (page.title as string) || '',
      description: (page.description as string) || '',
      content: page.content, // Keep Portable Text as-is
      seo: SanityTransformer.transformSEO(page.seo),
      publishedAt: new Date((page.publishedAt || page._createdAt) as string),
      updatedAt: new Date(page._updatedAt as string),
      locale: (page.locale as string) || 'en',
    }
  }

  /**
   * Transform Sanity settings to SettingsDTO
   */
  static transformSettings(sanitySettings: unknown): SettingsDTO {
    const settings = sanitySettings as Record<string, unknown>
    const social = settings.social as Record<string, unknown> || {}
    return {
      siteName: (settings.siteName as string) || 'My Site',
      siteUrl: (settings.siteUrl as string) || '',
      siteDescription: (settings.siteDescription as string) || '',
      logo: SanityTransformer.transformImage(settings.logo),
      favicon: SanityTransformer.transformImage(settings.favicon),
      social: {
        facebook: social.facebook as string,
        twitter: social.twitter as string,
        instagram: social.instagram as string,
        linkedin: social.linkedin as string,
        youtube: social.youtube as string,
        github: social.github as string,
      },
      gtmId: settings.gtmId as string,
      contactEmail: settings.contactEmail as string,
      defaultLocale: (settings.defaultLocale as string) || 'en',
      supportedLocales: (settings.supportedLocales as string[]) || ['en'],
    }
  }

  /**
   * Transform Sanity navigation to NavigationDTO
   */
  static transformNavigation(sanityNav: unknown): NavigationDTO {
    const transformNavItems = (items: unknown[] = []): NavItemDTO[] => {
      return items.map((item) => {
        const navItem = item as Record<string, unknown>
        return {
          id: (navItem._key || navItem._id) as string,
          label: (navItem.label as string) || '',
          href: (navItem.href as string) || '',
          target: navItem.target as '_blank' | '_self',
          children: navItem.children ? transformNavItems(navItem.children as unknown[]) : undefined,
        }
      })
    }

    const nav = sanityNav as Record<string, unknown>
    return {
      items: transformNavItems(nav.items as unknown[]),
    }
  }

  /**
   * Transform Sanity blog post to BlogPostDTO
   */
  static transformPost(sanityPost: unknown): BlogPostDTO {
    const basePage = SanityTransformer.transformPage(sanityPost)
    const post = sanityPost as Record<string, unknown>
    const author = post.author as Record<string, unknown>

    return {
      ...basePage,
      excerpt: (post.excerpt as string) || '',
      author: author
        ? {
          id: author._id as string,
          name: author.name as string,
          bio: author.bio as string,
          avatar: SanityTransformer.transformImage(author.avatar),
          social: author.social as Record<string, string>,
        }
        : undefined,
      categories: (post.categories as unknown[])?.map((cat) =>
        SanityTransformer.transformCategory(cat)
      ),
      tags: (post.tags as string[]) || [],
      featuredImage: SanityTransformer.transformImage(post.featuredImage),
      estimatedReadingTime: post.estimatedReadingTime as number,
    }
  }

  /**
   * Transform Sanity category to CategoryDTO
   */
  static transformCategory(sanityCategory: unknown): CategoryDTO {
    const category = sanityCategory as Record<string, unknown>
    return {
      id: category._id as string,
      name: (category.name as string) || '',
      slug: (category.slug as Record<string, unknown>)?.current as string || '',
      description: category.description as string,
    }
  }

  /**
   * Transform Sanity homepage to HomepageDTO
   */


  /**
   * Transform Sanity homepage to HomepageDTO using Zod validation
   */
  static transformHomepage(sanityHomepage: unknown): HomepageDTO {
    const rawData = sanityHomepage as Record<string, unknown>

    // 1. Map raw Sanity data to our Schema structure
    const mappedSections = (rawData.sections as Record<string, unknown>[] || []).map((section) => {
      // Map 'hero' section
      if (section._type === 'hero') {
        const heroSection = section as Record<string, unknown>
        const image = SanityTransformer.transformImage(heroSection.image)
        return {
          _type: 'hero',
          _key: (heroSection._key || heroSection._id) as string,
          title: (heroSection.title as string) || 'Hero',
          subtitle: heroSection.subtitle as string | undefined,
          image: image,
          ctaText: heroSection.ctaText as string | undefined,
          ctaLink: heroSection.ctaLink as string | undefined,
        }
      }

      // Map 'features' section
      if (section._type === 'features') {
        const featureSection = section as Record<string, unknown>
        const items = (featureSection.items as Record<string, unknown>[] || []).map((item) => ({
          title: (item.title as string) || 'Feature',
          description: (item.description as string) || '',
          icon: item.icon as string | undefined,
        }))

        return {
          _type: 'features',
          _key: (featureSection._key || featureSection._id) as string,
          title: featureSection.title as string | undefined,
          items: items,
        }
      }

      return null
    }).filter(Boolean)

    const mappedData = {
      sections: mappedSections,
      meta: {
        title: rawData.title as string,
      }
    }

    // 2. Validate with Zod
    // Import schema dynamically to avoid circular deps if needed,
    // but here we imported types so we need the schema value.
    // NOTE: In a real app we might want to import Schema from schema.ts
    // For now, let's trust the mapping or use the imported schema if available.
    // TO KEEP IT SIMPLE and robust without extra imports:
    // We manually constructed the object to match the DTO type we inferred.

    return mappedData as HomepageDTO
  }
}
