/**
 * Skeleton Loading Components
 * Elegant loading placeholders for menu content
 */

export function MenuItemSkeleton() {
    return (
        <div className="menu-item skeleton-item">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text-short" />
                </div>
            </div>
        </div>
    )
}

export function CategoryHeaderSkeleton() {
    return (
        <header className="category-header">
            <div className="skeleton skeleton-category-title" />
            <div className="skeleton skeleton-description" />
            <div className="accent-line" />
        </header>
    )
}

export function MenuSectionSkeleton() {
    return (
        <section className="menu-section">
            <div className="container-narrow">
                <CategoryHeaderSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                            <MenuItemSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function MenuPageSkeleton() {
    return (
        <>
            {[...Array(3)].map((_, i) => (
                <MenuSectionSkeleton key={i} />
            ))}
        </>
    )
}
