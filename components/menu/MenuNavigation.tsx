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
            const offset = 100
            const top = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <nav
            ref={navRef}
            id="menu"
            className="category-nav sticky top-0 z-40"
        >
            {categories.map((category) => (
                <button
                    key={category._id}
                    onClick={() => handleClick(category.slug.current)}
                    className={`category-nav-item ${activeCategory === category.slug.current ? 'active' : ''
                        }`}
                    aria-current={activeCategory === category.slug.current ? 'true' : undefined}
                >
                    {category.name}
                </button>
            ))}
        </nav>
    )
}
