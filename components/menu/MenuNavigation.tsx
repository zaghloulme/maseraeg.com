'use client'

import { useRef } from 'react'

interface Category {
    _id: string
    name: string
    slug: { current: string }
}

interface MenuNavigationProps {
    categories: Category[]
    activeCategory?: string
    onCategoryClick?: (slug: string) => void
}

export default function MenuNavigation({
    categories,
    activeCategory,
    onCategoryClick
}: MenuNavigationProps) {
    const navRef = useRef<HTMLDivElement>(null)

    const handleClick = (slug: string) => {
        if (onCategoryClick) {
            onCategoryClick(slug)
        }

        // Scroll to section
        const element = document.getElementById(`category-${slug}`)
        if (element) {
            const offset = 120 // Account for sticky nav
            const top = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-40 bg-[var(--masera-slate)]/95 backdrop-blur-md border-b border-[var(--glass-border)] py-4"
        >
            <div className="container">
                <div className="category-nav">
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => handleClick(category.slug.current)}
                            className={`category-pill ${activeCategory === category.slug.current ? 'active' : ''
                                }`}
                            aria-current={activeCategory === category.slug.current ? 'true' : undefined}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}
