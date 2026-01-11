/**
 * Example Unit Test
 * Tests for utility functions and components
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import HomePage from '../app/[locale]/page'

// Mock the CMS service to return predictable data for tests
vi.mock('../lib/cms', () => ({
  cms: {
    getHomepageSettings: vi.fn().mockResolvedValue({
      sections: [
        {
          _type: 'hero',
          _key: 'hero-1',
          title: 'Slate Template',
        },
        {
          _type: 'features',
          _key: 'features-1',
          items: [
            { title: 'Swappable CMS Architecture' },
            { title: 'Full Internationalization' },
          ],
        },
      ],
    }),
    getSiteSettings: vi.fn().mockResolvedValue({}),
  },
}))

describe('Home Page', () => {
  it('renders the heading', async () => {
    const jsx = await HomePage()
    const { getByText } = render(jsx)
    expect(getByText('Slate Template')).toBeInTheDocument()
  })

  it('displays features list', async () => {
    const jsx = await HomePage()
    const { getByText } = render(jsx)
    expect(getByText(/Swappable CMS Architecture/i)).toBeInTheDocument()
    expect(getByText(/Full Internationalization/i)).toBeInTheDocument()
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
