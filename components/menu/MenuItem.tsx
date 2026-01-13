import Image from 'next/image'

interface MenuItemProps {
    name: string
    description?: string
    image?: {
        url: string
        alt?: string
    }
    price?: number
    showPrice: boolean
    dietaryTags?: string[]
    isNew?: boolean
    isPopular?: boolean
    variant?: 'default' | 'featured'
}

export default function MenuItem({
    name,
    description,
    image,
    price,
    showPrice,
    dietaryTags,
    isNew,
    isPopular,
    variant = 'default',
}: MenuItemProps) {
    const hasImage = image?.url

    const badgeMap: Record<string, { label: string; className: string }> = {
        vegetarian: { label: 'Veg', className: 'badge-vegetarian' },
        vegan: { label: 'Vegan', className: 'badge-vegan' },
        'gluten-free': { label: 'GF', className: 'badge-gluten-free' },
        spicy: { label: 'Spicy', className: 'badge-spicy' },
        nuts: { label: 'Cont. Nuts', className: 'badge-nuts' },
    }

    // Featured popular items - 9:16 Vertical Card Design
    // ONLY show this layout if variant is explicitly 'featured'
    if (variant === 'featured' && hasImage) {
        return (
            <article className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[rgba(201,169,97,0.2)]">
                {/* Background Image */}
                <Image
                    src={image.url}
                    alt={image.alt || name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient Overlay - Strengthened for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 w-full p-6 flex flex-col justify-end h-full">
                    {/* Top Badges (floating) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                        {isPopular && (
                            <span className="backdrop-blur-md bg-black/30 border border-[var(--color-gold)]/30 text-[var(--color-gold)] px-3 py-1 rounded text-xs tracking-widest uppercase font-medium shadow-sm">
                                Popular
                            </span>
                        )}
                        {isNew && (
                            <span className="backdrop-blur-md bg-[var(--color-gold)] text-black px-3 py-1 rounded text-xs tracking-widest uppercase font-bold shadow-sm">
                                New
                            </span>
                        )}
                    </div>

                    {/* Bottom Info */}
                    <div className="relative z-10 space-y-3">
                        {/* Dietary Badges - Row */}
                        {dietaryTags && dietaryTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-1">
                                {dietaryTags.map((tag) => {
                                    const badge = badgeMap[tag]
                                    if (!badge) return null
                                    return (
                                        <span key={tag} className={`backdrop-blur-sm bg-black/40 border border-white/20 text-white/90 px-2 py-0.5 rounded-[2px] text-[0.6rem] uppercase tracking-wider`}>
                                            {badge.label}
                                        </span>
                                    )
                                })}
                            </div>
                        )}

                        <div className="flex justify-between items-end gap-4 border-b border-[var(--color-gold)]/30 pb-3">
                            <h3 className="font-display text-2xl md:text-3xl text-[var(--color-cream)] leading-tight drop-shadow-md">
                                {name}
                            </h3>
                            {showPrice && price !== undefined && (
                                <span className="font-display text-xl text-[var(--color-gold)] shrink-0 drop-shadow-md">
                                    {price} LE
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {description && (
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 drop-shadow-sm">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </article>
        )
    }

    // Standard menu item - classic menu style
    return (
        <article className="menu-item">
            {/* Header Row */}
            <div className="menu-item-header">
                <h3 className="menu-item-name">
                    {name}
                    {/* Inline Badges */}
                    <span className="inline-flex gap-1 ml-3 align-middle">
                        {isNew && <span className="badge badge-new">New</span>}
                        {isPopular && <span className="badge badge-popular">Popular</span>}
                        {dietaryTags?.map((tag) => {
                            const badge = badgeMap[tag]
                            if (!badge) return null
                            return (
                                <span key={tag} className={`badge ${badge.className}`}>
                                    {badge.label}
                                </span>
                            )
                        })}
                    </span>
                </h3>

                {/* Dotted line */}
                {showPrice && price !== undefined && (
                    <>
                        <span className="menu-item-dots" aria-hidden="true" />
                        <span className="menu-item-price">{price} L.E</span>
                    </>
                )}
            </div>

            {/* Description */}
            {description && (
                <p className="menu-item-description">{description}</p>
            )}
        </article>
    )
}
