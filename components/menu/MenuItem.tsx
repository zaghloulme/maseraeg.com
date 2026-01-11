import Image from 'next/image'

interface MenuItemProps {
    name: string
    nameAr?: string
    description?: string
    descriptionAr?: string
    image?: {
        url: string
        alt?: string
    }
    price?: number
    showPrice: boolean
    dietaryTags?: string[]
    isNew?: boolean
    isPopular?: boolean
}

const tagIcons: Record<string, string> = {
    vegetarian: '🥬',
    vegan: '🌱',
    'gluten-free': '🌾',
    spicy: '🌶️',
    nuts: '🥜',
}

export default function MenuItem({
    name,
    nameAr,
    description,
    descriptionAr,
    image,
    price,
    showPrice,
    dietaryTags = [],
    isNew,
    isPopular,
}: MenuItemProps) {
    return (
        <article className="menu-card group">
            {/* Image */}
            {image?.url && (
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={image.url}
                        alt={image.alt || name}
                        fill
                        className="menu-card-image object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {isNew && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                NEW
                            </span>
                        )}
                        {isPopular && (
                            <span className="bg-[var(--masera-gold)] text-[var(--masera-black)] text-xs font-bold px-2 py-1 rounded-full">
                                ⭐ Popular
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {/* Header with name and price */}
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--masera-cream)] leading-tight">
                            {name}
                        </h3>
                        {nameAr && (
                            <p className="text-sm text-[var(--masera-light-blue)] mt-1" dir="rtl">
                                {nameAr}
                            </p>
                        )}
                    </div>

                    {showPrice && price !== undefined && (
                        <span className="price-badge flex-shrink-0">
                            {price} <span className="text-xs">L.E</span>
                        </span>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                        {description}
                    </p>
                )}

                {descriptionAr && (
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-3 opacity-70" dir="rtl">
                        {descriptionAr}
                    </p>
                )}

                {/* Dietary Tags */}
                {dietaryTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {dietaryTags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-[var(--glass-bg-light)] px-2 py-1 rounded-full border border-[var(--glass-border)]"
                                title={tag.charAt(0).toUpperCase() + tag.slice(1)}
                            >
                                {tagIcons[tag] || '•'} {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    )
}
