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
                {/* Category Header - Full Width Background Style */}
                <header className="category-header mb-10 relative rounded-xl overflow-hidden min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center text-center p-8 border border-[var(--color-border-subtle)]">
                    {/* Background Image & Overlay */}
                    {image && (
                        <>
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={image.url}
                                    alt={image.alt || title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#16273b] via-[#16273b]/80 to-transparent z-0" />
                            <div className="absolute inset-0 bg-black/40 z-0" />
                        </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 max-w-2xl">
                        <h2
                            id={`heading-${id}`}
                            className="title-category text-3xl md:text-5xl font-display text-[var(--color-gold)] mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] rounded px-4 inline-block drop-shadow-md"
                            tabIndex={0}
                        >
                            {title}
                        </h2>

                        <div className="w-16 h-0.5 bg-[var(--color-gold)] mx-auto mb-4 opacity-80" />

                        {description && (
                            <p className="text-[#f0f0f0] text-sm md:text-base font-medium italic drop-shadow leading-relaxed">
                                {description}
                            </p>
                        )}
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
