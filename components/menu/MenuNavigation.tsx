'use client'

import { useRef, useEffect, useState } from 'react'

interface Category {
    _id: string
    name: string
    slug?: { current: string }
    type?: 'food' | 'drink'
}

interface MenuNavigationProps {
    categories: Category[]
}

export default function MenuNavigation({ categories }: MenuNavigationProps) {
    const navRef = useRef<HTMLDivElement>(null)
    const [activeCategory, setActiveCategory] = useState<string>('')
    const [activeType, setActiveType] = useState<'food' | 'drink'>('food')

    const getSlug = (cat: Category) => cat.slug?.current || cat.name.toLowerCase().replace(/\s+/g, '-')

    // Track which section is in view using IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the visible section with highest intersection ratio or simply the first one
                const visibleSection = entries.find((entry) => entry.isIntersecting)

                if (visibleSection) {
                    const slug = visibleSection.target.id.replace('category-', '')
                    setActiveCategory(slug)

                    // Sync active type purely based on the active category
                    // We find the category object to check its type
                    const currentCat = categories.find(c => getSlug(c) === slug)
                    if (currentCat) {
                        const type = currentCat.type || 'food'
                        setActiveType(prev => {
                            // Only update if different to avoid excess re-renders
                            if (prev !== type) return type as 'food' | 'drink'
                            return prev
                        })
                    }
                }
            },
            {
                // Offset to match the sticky header height (roughly 80px)
                // rootMargin top negative value makes the 'active' area start below the header
                rootMargin: '-100px 0px -60% 0px',
                threshold: 0
            }
        )

        categories.forEach((cat) => {
            const el = document.getElementById(`category-${getSlug(cat)}`)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [categories])

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Scroll active category pill into view
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const activeBtn = container.querySelector<HTMLButtonElement>(`button[data-slug="${activeCategory}"]`)

            if (activeBtn) {
                // Manual calculation to center the button in the container
                // This avoids using .scrollIntoView() which can interfere with the main page scroll
                const left = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2)

                container.scrollTo({
                    left,
                    behavior: 'smooth'
                })
            }
        }
    }, [activeCategory])

    const handleClick = (slug: string) => {
        const element = document.getElementById(`category-${slug}`)
        if (element) {
            // Dynamic offset based on navbar height + buffer
            const navHeight = navRef.current?.offsetHeight || 80
            const offset = navHeight + 20

            const top = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    const handleTypeSwitch = (type: 'food' | 'drink') => {
        setActiveType(type)
        // Find first category of this type and scroll to it
        const first = categories.find(c => (c.type || 'food') === type)
        if (first) {
            handleClick(getSlug(first))
        }
    }

    const filteredCategories = categories.filter(c => (c.type || 'food') === activeType)

    return (
        <nav
            ref={navRef}
            id="menu"
            className="sticky top-0 z-40 bg-[#1c3149]/95 backdrop-blur-md border-b border-[var(--color-border)] py-2 transition-all"
        >
            <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                {/* Type Toggle */}
                <div className="flex bg-white/5 p-1 rounded-full border border-white/10 shrink-0">
                    <button
                        onClick={() => handleTypeSwitch('food')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeType === 'food'
                            ? 'bg-[var(--color-gold)] text-[#1c3149] shadow-sm'
                            : 'text-[var(--color-text-secondary)] hover:text-white'
                            }`}
                    >
                        Food
                    </button>
                    <button
                        onClick={() => handleTypeSwitch('drink')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeType === 'drink'
                            ? 'bg-[var(--color-gold)] text-[#1c3149] shadow-sm'
                            : 'text-[var(--color-text-secondary)] hover:text-white'
                            }`}
                    >
                        Drinks
                    </button>
                </div>

                {/* Categories Scroll */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 w-full overflow-x-auto scrollbar-hide"
                >
                    <div className="flex justify-start gap-2 min-w-max px-1">
                        {filteredCategories.map((category) => {
                            const slug = getSlug(category)
                            const isActive = activeCategory === slug
                            return (
                                <button
                                    key={category._id}
                                    data-slug={slug}
                                    onClick={() => handleClick(slug)}
                                    className={`
                                      px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                                      font-serif tracking-wide whitespace-nowrap border
                                      ${isActive
                                            ? 'bg-white/10 border-[var(--color-gold)] text-[var(--color-gold)]'
                                            : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-cream)] hover:bg-white/5'
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
            </div>
        </nav>
    )
}
