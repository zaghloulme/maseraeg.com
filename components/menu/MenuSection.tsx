import Image from 'next/image'
import MenuItem from './MenuItem'

interface MenuItemData {
    _id: string
    name: string
    description?: string
    image?: {
        url: string
        alt?: string
    }
    price?: number
    dietaryTags?: string[]
    isNew?: boolean
    isPopular?: boolean
}

interface MenuSectionProps {
    id: string
    title: string
    description?: string
    image?: {
        url: string
        alt?: string
    }
    items: MenuItemData[]
    showPrices: boolean
    scrollable?: boolean
    variant?: 'default' | 'featured'
}

export default function MenuSection({
    id,
    title,
    description,
    image,
    items,
    showPrices,
    scrollable = false,
    variant = 'default',
}: MenuSectionProps) {
    if (items.length === 0) return null

    return (
        <section
            id={`category-${id}`}
            className="menu-section"
            aria-labelledby={`heading-${id}`}
        >
            <div className={scrollable ? "container-wide" : "container-narrow"}>
                {/* Category Header */}
                <header className="category-header mb-12 flex flex-col items-center text-center">
                    {image && (
                        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 shrink-0 rounded-full overflow-hidden border-2 border-[var(--color-gold)] shadow-lg">
                            <Image
                                src={image.url}
                                alt={image.alt || title}
                                fill
                                sizes="(max-width: 768px) 128px, 160px"
                                className="object-cover transition-transform duration-700"
                            />
                        </div>
                    )}
                    <h2
                        id={`heading-${id}`}
                        className="title-category text-3xl md:text-4xl font-display text-[var(--color-gold)] mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded px-4"
                        tabIndex={0}
                    >
                        {title}
                    </h2>

                    {/* Decorative separator */}
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-60 mb-4" />

                    {description && (
                        <p className="text-[var(--color-text-muted)] text-sm md:text-base italic max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}
                </header>

                {/* Menu Items */}
                {scrollable ? (
                    <div className={`flex overflow-x-auto pb-8 -mx-4 px-4 snap-x gap-4 md:gap-6 scrollbar-hide ${items.length < 4
                        ? "md:justify-center md:flex-wrap md:overflow-visible md:pb-0" // Center, wrap, no scroll needed
                        : "md:justify-start md:flex-nowrap md:overflow-x-auto md:pb-8" // Scroll enabled on desktop
                        }`}>
                        {items.map((item, index) => (
                            <div
                                key={item._id}
                                className={`min-w-[280px] w-[85vw] snap-center shrink-0 md:w-[280px] lg:w-[320px]`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <MenuItem
                                    name={item.name}
                                    description={item.description}
                                    image={item.image}
                                    price={item.price}
                                    showPrice={showPrices}
                                    dietaryTags={item.dietaryTags}
                                    isNew={item.isNew}
                                    isPopular={item.isPopular}
                                    variant={variant}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {items.map((item, index) => (
                            <div key={item._id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <MenuItem
                                    name={item.name}
                                    description={item.description}
                                    image={item.image}
                                    price={item.price}
                                    showPrice={showPrices}
                                    dietaryTags={item.dietaryTags}
                                    isNew={item.isNew}
                                    isPopular={item.isPopular}
                                    variant={variant}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
