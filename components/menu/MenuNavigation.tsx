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

    // Track which section is in view
    useEffect(() => {
        const handleScroll = () => {
            // Find visible section
            let current = ''
            const sections = categories.map(cat => ({
                id: getSlug(cat),
                element: document.getElementById(`category-${getSlug(cat)}`),
                cat
            }))

            const scrollPosition = window.scrollY + 200

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section.element && section.element.offsetTop <= scrollPosition) {
                    current = section.id
                    // Auto-switch tab if scrolling into new type
                    const type = section.cat.type || 'food'
                    if (type !== activeType) {
                        // We use a functional update or just check ref to avoid dependency loops if needed
                        // But here we want the UI to switch.
                        // However, we only want to switch if the USER scrolled, not if we just clicked.
                        // For simplicity, we just sync.
                        setActiveType(type as 'food' | 'drink')
                    }
                    break
                }
            }
            if (current) setActiveCategory(current)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [categories, activeType]) // Added activeType dependency to ensure state is fresh

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Scroll active category pill into view
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const activeBtn = scrollContainerRef.current.querySelector<HTMLButtonElement>(`button[data-slug="${activeCategory}"]`)
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
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
                    <div className="flex justify-start md:justify-center gap-2 min-w-max">
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
