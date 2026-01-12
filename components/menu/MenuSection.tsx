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
    items: MenuItemData[]
    showPrices: boolean
}

export default function MenuSection({
    id,
    title,
    description,
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
                <header className="category-header">
                    <h2
                        id={`heading-${id}`}
                        className="title-category focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] rounded px-2 -mx-2"
                        tabIndex={0}
                    >
                        {title}
                    </h2>
                    {description && (
                        <p className="text-[var(--color-text-muted)] mt-2 text-sm italic">
                            {description}
                        </p>
                    )}
                    <div className="accent-line" />
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
