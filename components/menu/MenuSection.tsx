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
        >
            <div className="container-narrow">
                {/* Category Header */}
                <header className="category-header">
                    <h2 className="title-category">{title}</h2>
                    {description && (
                        <p className="text-[var(--color-text-muted)] mt-2 text-sm italic">
                            {description}
                        </p>
                    )}
                    <div className="accent-line" />
                </header>

                {/* Menu Items */}
                <div>
                    {items.map((item) => (
                        <MenuItem
                            key={item._id}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                            showPrice={showPrices}
                            dietaryTags={item.dietaryTags}
                            isNew={item.isNew}
                            isPopular={item.isPopular}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
