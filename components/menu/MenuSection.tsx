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
                {/* Category Header */}
                <header className="category-header mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        {image && (
                            <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full overflow-hidden border border-[var(--color-border-subtle)] shadow-sm">
                                <img
                                    src={image.url}
                                    alt={image.alt || title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <h2
                            id={`heading-${id}`}
                            className="title-category focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded px-2 -mx-2"
                            tabIndex={0}
                        >
                            {title}
                        </h2>
                    </div>
                    {description && (
                        <p className={`text-[var(--color-text-muted)] text-sm italic ${image ? 'pl-[0.5rem] md:pl-0' : ''}`}>
                            {description}
                        </p>
                    )}
                    <div className="accent-line mt-4" />
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
