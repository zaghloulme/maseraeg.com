/**
 * Ma Sera Egypt - Menu Homepage (Social Menu - No Prices)
 * This is the main menu page accessible from social media and Google searches
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { Hero, MenuNavigation, MenuSection, ContactSection, Features } from '@/components/menu'
import {
    getBranches,
    getMenuCategories,
    getMenuItems,
    getHomepage,
    transformMenuItemsForDisplay,
    groupItemsByCategory,
    type HeroSection as HeroSectionType,
    type FeaturesSection as FeaturesSectionType,
} from '@/lib/menu'

export const metadata: Metadata = {
    title: 'Ma Sera - Menu | Every Hour, a New Memory',
    description: 'Explore our delicious menu at Ma Sera Egypt. Premium breakfast, brunch, and café cuisine in Alexandria. Fresh ingredients, artisan recipes.',
    openGraph: {
        title: 'Ma Sera - Menu | Every Hour, a New Memory',
        description: 'Explore our delicious menu at Ma Sera Egypt. Premium breakfast, brunch, and café cuisine in Alexandria.',
        type: 'website',
        locale: 'en_EG',
        siteName: 'Ma Sera Egypt',
    },
}

export default async function MenuPage() {
    // Fetch data from Sanity
    const [branches, categories, menuItems, homepage] = await Promise.all([
        getBranches(),
        getMenuCategories(),
        getMenuItems(),
        getHomepage(),
    ])

    // Extract sections
    const heroSection = homepage?.sections?.find((s) => s._type === 'hero') as HeroSectionType | undefined
    const featureSections = homepage?.sections?.filter((s) => s._type === 'features') || []

    // Transform items for display (no branch slug = no prices)
    const displayItems = transformMenuItemsForDisplay(menuItems)

    // Group by category
    const groupedMenu = groupItemsByCategory(displayItems, categories)

    return (
        <main className="min-h-screen">
            {/* Hero with Sanity data */}
            <Hero showPrices={false} data={heroSection} />

            {/* Content Sections from Sanity */}
            {featureSections.map((section, idx) => (
                <Features key={idx} data={section as FeaturesSectionType} />
            ))}

            {/* Category Navigation */}
            {categories.length > 0 && (
                <MenuNavigation categories={categories} />
            )}

            {/* Menu Sections */}
            {groupedMenu.map(({ category, items }) => (
                <MenuSection
                    key={category._id}
                    id={category.slug?.current || category.name.toLowerCase().replace(/\s+/g, '-')}
                    title={category.name}
                    description={category.description}
                    items={items}
                    showPrices={false}
                />
            ))}

            {/* Empty State */}
            {groupedMenu.length === 0 && (
                <section className="py-20 text-center">
                    <div className="container-narrow">
                        <p className="text-xl text-[var(--color-text-muted)]">
                            Menu items not configured. Please add items in Sanity Studio.
                        </p>
                        <Link
                            href="/studio"
                            className="btn-primary inline-block mt-6"
                        >
                            Open Sanity Studio
                        </Link>
                    </div>
                </section>
            )}

            {/* Contact Footer */}
            <ContactSection branches={branches} />
        </main>
    )
}
