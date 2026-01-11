import MenuItem from './MenuItem'

interface MenuItemData {
    _id: string
    name: string
    nameAr?: string
    description?: string
    descriptionAr?: string
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
    titleAr?: string
    description?: string
    items: MenuItemData[]
    showPrices: boolean
}

export default function MenuSection({
    id,
    title,
    titleAr,
    description,
    items,
    showPrices,
}: MenuSectionProps) {
    if (items.length === 0) return null

    return (
        <section
            id={`category-${id}`}
            className="py-12 md:py-16"
        >
            <div className="container">
                {/* Section Header */}
                <header className="section-header mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif">
                        {title}
                    </h2>
                    {titleAr && (
                        <p className="text-[var(--masera-light-blue)] mt-2 text-lg" dir="rtl">
                            {titleAr}
                        </p>
                    )}
                    {description && (
                        <p className="text-[var(--muted)] mt-3 max-w-2xl">
                            {description}
                        </p>
                    )}
                </header>

                {/* Items Grid */}
                <div className="menu-grid">
                    {items.map((item, index) => (
                        <div
                            key={item._id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <MenuItem
                                name={item.name}
                                nameAr={item.nameAr}
                                description={item.description}
                                descriptionAr={item.descriptionAr}
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
