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
}: MenuItemProps) {
    const hasImage = image?.url

    // Featured items (popular or with images) get special treatment
    if (hasImage && isPopular) {
        return (
            <article className="menu-item-featured">
                {/* Image */}
                <div className="relative">
                    <Image
                        src={image.url}
                        alt={image.alt || name}
                        width={200}
                        height={200}
                        className="menu-item-image w-full"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                    {/* Badges */}
                    <div className="flex gap-2 mb-2">
                        {isNew && <span className="badge badge-new">New</span>}
                        {isPopular && <span className="badge badge-popular">Popular</span>}
                        {dietaryTags && dietaryTags.includes('spicy') && (
                            <span className="badge badge-spicy">Spicy</span>
                        )}
                    </div>

                    {/* Name & Price */}
                    <div className="menu-item-header">
                        <h3 className="menu-item-name">{name}</h3>
                        {showPrice && price !== undefined && (
                            <span className="menu-item-price">{price} L.E</span>
                        )}
                    </div>

                    {/* Description */}
                    {description && (
                        <p className="menu-item-description mt-2">{description}</p>
                    )}
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
                    {isNew && <span className="badge badge-new ml-2">New</span>}
                    {dietaryTags && dietaryTags.includes('spicy') && (
                        <span className="badge badge-spicy ml-2">Spicy</span>
                    )}
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
