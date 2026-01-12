'use client'

import { useRef, useEffect, useState } from 'react'

interface Category {
    _id: string
    name: string
    slug: { current: string }
}

interface MenuNavigationProps {
    categories: Category[]
}

export default function MenuNavigation({ categories }: MenuNavigationProps) {
    const navRef = useRef<HTMLDivElement>(null)
    const [activeCategory, setActiveCategory] = useState<string>('')

    // Track which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat =>
                document.getElementById(`category-${cat.slug.current}`)
            )

            const scrollPosition = window.scrollY + 200 // Offset for navbar height

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveCategory(categories[i].slug.current)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check

        return () => window.removeEventListener('scroll', handleScroll)
    }, [categories])

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Scroll active category into view
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const activeBtn = scrollContainerRef.current.querySelector<HTMLButtonElement>(`button[data-slug="${activeCategory}"]`)
            if (activeBtn) {
                const container = scrollContainerRef.current
                const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2)

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                })
            }
        }
    }, [activeCategory])

    const handleClick = (slug: string) => {
        const element = document.getElementById(`category-${slug}`)
        if (element) {
            const offset = 120
            const top = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <nav
            ref={navRef}
            id="menu"
            className="sticky top-0 z-40 bg-[#1c3149]/95 backdrop-blur-md border-b border-[var(--color-border)] py-3"
        >
            <div
                ref={scrollContainerRef}
                className="container-wide overflow-x-auto scrollbar-hide"
            >
                <div className="flex justify-start md:justify-center gap-2 min-w-max px-4">
                    {categories.map((category) => {
                        const isActive = activeCategory === category.slug.current
                        return (
                            <button
                                key={category._id}
                                data-slug={category.slug.current}
                                onClick={() => handleClick(category.slug.current)}
                                className={`
                  px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200
                  font-serif tracking-wide whitespace-nowrap min-h-[44px] flex items-center
                  ${isActive
                                        ? 'bg-[var(--color-gold)] text-[#1c3149] shadow-lg'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-cream)] hover:bg-white/10'
                                    }
                `}
                                aria-current={isActive ? 'true' : undefined}
                            >
                                {category.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
