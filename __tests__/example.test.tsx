/**
 * Example Unit Test
 * Tests for utility functions and components
 */

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '@testing-library/react'
import MenuPage from '../app/page'

// Mock sanity env BEFORE imports or use module mock
vi.mock('../sanity/env', () => ({
  apiVersion: '2024-01-01',
  dataset: 'test',
  projectId: 'test',
  useCdn: false,
}))
// Mock the menu queries
vi.mock('../lib/menu', () => ({
  getBranches: vi.fn().mockResolvedValue([]),
  getMenuCategories: vi.fn().mockResolvedValue([]),
  getMenuItems: vi.fn().mockResolvedValue([]),
  transformMenuItemsForDisplay: vi.fn().mockReturnValue([]),
  groupItemsByCategory: vi.fn().mockReturnValue([]),
  getHomepage: vi.fn().mockResolvedValue({ sections: [] }),
  getSiteSettings: vi.fn().mockResolvedValue({}),
}))

describe('Menu Page', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test'
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'test'

    // Mock IntersectionObserver for MenuNavigation
    vi.stubGlobal('IntersectionObserver', class {
      observe = vi.fn()
      disconnect = vi.fn()
      unobserve = vi.fn()
    })

    // Mock window.scrollTo
    window.scrollTo = vi.fn()
    // Mock Element.prototype.scrollTo
    Element.prototype.scrollTo = vi.fn()
  })

  it('renders the hero section with logo', async () => {
    const jsx = await MenuPage()
    const { getByAltText } = render(jsx)
    expect(getByAltText('Ma Sera - Every Hour, a New Memory')).toBeInTheDocument()
  })

  it('renders footer logo', async () => {
    const jsx = await MenuPage()
    const { getByAltText } = render(jsx)
    expect(getByAltText('Ma Sera')).toBeInTheDocument()
  })
})

describe('SEO Metadata Utils', () => {
  it('merges metadata objects correctly', async () => {
    const { mergeMetadata } = await import('../lib/seo/metadata')

    const base = {
      title: 'Base Title',
      description: 'Base Description',
    }

    const override = {
      title: 'Override Title',
    }

    const result = mergeMetadata(base, override)

    expect(result.title).toBe('Override Title')
    expect(result.description).toBe('Base Description')
  })
})
