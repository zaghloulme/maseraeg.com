
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import MenuNavigation from '../components/menu/MenuNavigation'

// Mock IntersectionObserver
const observeMock = vi.fn();
const disconnectMock = vi.fn();

beforeEach(() => {
    // Basic IntersectionObserver mock
    vi.stubGlobal('IntersectionObserver', class {
        observe = observeMock
        disconnect = disconnectMock
        unobserve = vi.fn()
    });

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    // Mock Element.prototype.scrollTo
    Element.prototype.scrollTo = vi.fn();
});

const mockCategories = [
    { _id: '1', name: 'Appetizers', slug: { current: 'appetizers' }, type: 'food' as const },
    { _id: '2', name: 'Dessert', slug: { current: 'dessert' }, type: 'food' as const },
    { _id: '3', name: 'Drinks', slug: { current: 'drinks' }, type: 'drink' as const },
    { _id: '4', name: 'Coffee', slug: { current: 'coffee' }, type: 'drink' as const },
]

describe('MenuNavigation', () => {
    it('renders food categories by default', () => {
        render(<MenuNavigation categories={mockCategories} />)

        expect(screen.getByText('Appetizers')).toBeInTheDocument()
        expect(screen.getByText('Dessert')).toBeInTheDocument()
        expect(screen.queryByText('Coffee')).not.toBeInTheDocument()
    })

    it('switches to drinks when toggle is clicked', () => {
        render(<MenuNavigation categories={mockCategories} />)

        const drinksButton = screen.getByText('Drinks')
        fireEvent.click(drinksButton)

        expect(screen.getByText('Coffee')).toBeInTheDocument()
        expect(screen.queryByText('Appetizers')).not.toBeInTheDocument()
    })

    it('observes category elements on mount', () => {
        // Mock document.getElementById to return true for existence check
        vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'))

        render(<MenuNavigation categories={mockCategories} />)
        expect(observeMock).toHaveBeenCalled()
    })
})
