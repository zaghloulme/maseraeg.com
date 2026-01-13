/**
 * Ma Sera Egypt - Branch Menu Page (QR Menu - With Prices)
 * This page is accessed via QR codes at each branch and shows prices
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero, MenuNavigation, MenuSection, ContactSection } from '@/components/menu'
import {
    getBranches,
    getBranchBySlug,
    getMenuCategories,
    getMenuItems,
    getSiteSettings,
    transformMenuItemsForDisplay,
    groupItemsByCategory,
} from '@/lib/menu'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const branch = await getBranchBySlug(slug)

    if (!branch) return { title: 'Branch Not Found' }

    return {
        title: `Ma Sera ${branch.name} - Menu | Every Hour, a New Memory`,
        description: `View our menu with prices at Ma Sera ${branch.name}. ${branch.address || 'Alexandria, Egypt'}`,
        openGraph: {
            title: `Ma Sera ${branch.name} - Menu`,
            description: `View our menu with prices at Ma Sera ${branch.name}`,
            type: 'website',
            locale: 'en_EG',
            siteName: 'Ma Sera Egypt',
        },
    }
}

export async function generateStaticParams() {
    const branches = await getBranches()

    return branches.map((branch) => ({
        slug: branch.slug.current,
    }))
}

export default async function BranchMenuPage({ params }: PageProps) {
    const { slug } = await params

    // Fetch branch
    const branch = await getBranchBySlug(slug)

    if (!branch) {
        notFound()
    }

    // Fetch menu data
    const [branches, categories, menuItems, siteSettings] = await Promise.all([
        getBranches(),
        getMenuCategories(),
        getMenuItems(),
        getSiteSettings(),
    ])

    // Transform items for this branch (includes prices)
    const displayItems = transformMenuItemsForDisplay(menuItems, slug)

    // Group by category
    const groupedMenu = groupItemsByCategory(displayItems, categories)

    return (
        <main className="min-h-screen">
            {/* Hero with branch name */}
            <Hero showPrices={true} branchName={branch.name} />

            {/* Category Navigation - synced with displayed sections */}
            {groupedMenu.length > 0 && (
                <MenuNavigation categories={groupedMenu.map(g => g.category)} />
            )}

            {/* Menu Sections */}
            {groupedMenu.map(({ category, items }) => (
                <MenuSection
                    key={category._id}
                    id={category.slug?.current || category.name.toLowerCase().replace(/\s+/g, '-')}
                    title={category.name}
                    description={category.description}
                    items={items}
                    showPrices={true}
                />
            ))}

            {/* Empty State */}
            {groupedMenu.length === 0 && (
                <section className="py-20 text-center">
                    <div className="container-narrow">
                        <p className="text-xl text-[var(--color-text-muted)]">
                            Menu items not configured for this branch yet.
                        </p>
                    </div>
                </section>
            )}

            {/* Contact Footer */}
            <ContactSection branches={branches} siteSettings={siteSettings} />
        </main>
    )
}
