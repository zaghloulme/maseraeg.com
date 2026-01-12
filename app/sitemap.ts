/**
 * Dynamic sitemap.xml for Ma Sera Egypt
 */

import { MetadataRoute } from 'next'
import { getBranches } from '@/lib/menu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maseraeg.com'

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Branch pages
  try {
    const branches = await getBranches()
    const branchEntries: MetadataRoute.Sitemap = branches.map((branch) => ({
      url: `${baseUrl}/branch/${branch.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticEntries, ...branchEntries]
  } catch {
    return staticEntries
  }
}
