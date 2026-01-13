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
}

export default function MenuSection({
    id,
    title,
    description,
    image,
    items,
    showPrices,
}: MenuSectionProps) {
    if (items.length === 0) return null

    return (
        <section
            id={`category-${id}`}
            className="menu-section"
            aria-labelledby={`heading-${id}`}
        >
            <div className="container-narrow">
                {/* Category Header - Split Layout */}
                <header className="category-header mb-12 relative">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                        {/* Image Container - Rectangular for full visibility */}
                        {image && (
                            <div className="relative shrink-0 w-full md:w-auto flex justify-center md:block">
                                <div className="relative w-48 h-48 md:w-56 md:h-40 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] shadow-2xl group">
                                    {/* Gold overlay effect on hover (subtle) */}
                                    <div className="absolute inset-0 bg-[var(--color-gold)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10" />
                                    <img
                                        src={image.url}
                                        alt={image.alt || title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                {/* Decorative offset border */}
                                <div className="absolute top-3 -right-3 w-full h-full border border-[var(--color-gold)] rounded-2xl -z-10 hidden md:block opacity-30" style={{ right: '-12px', top: '12px', width: '224px', height: '160px' }} />
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left pt-2">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                                <h2
                                    id={`heading-${id}`}
                                    className="title-category text-3xl md:text-5xl font-display text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded"
                                    tabIndex={0}
                                >
                                    {title}
                                </h2>
                                <div className="h-px bg-[var(--color-gold)] opacity-30 flex-1 hidden md:block" />
                            </div>

                            {description && (
                                <p className="text-[var(--color-text-muted)] text-sm md:text-lg italic leading-relaxed max-w-2xl">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </header>

                {/* Menu Items - Two column on desktop */}
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
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
