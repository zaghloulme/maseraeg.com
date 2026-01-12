/**
 * Example Unit Test
 * Tests for utility functions and components
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import MenuPage from '../app/page'

// Mock the menu queries
vi.mock('../lib/menu', () => ({
  getBranches: vi.fn().mockResolvedValue([]),
  getMenuCategories: vi.fn().mockResolvedValue([]),
  getMenuItems: vi.fn().mockResolvedValue([]),
  transformMenuItemsForDisplay: vi.fn().mockReturnValue([]),
  groupItemsByCategory: vi.fn().mockReturnValue([]),
}))

describe('Menu Page', () => {
  it('renders the hero section', async () => {
    const jsx = await MenuPage()
    const { getByText } = render(jsx)
    expect(getByText('Ma Sera')).toBeInTheDocument()
  })

  it('displays tagline', async () => {
    const jsx = await MenuPage()
    const { getByText } = render(jsx)
    expect(getByText(/Every Hour, a New Memory/i)).toBeInTheDocument()
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
