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
    getSiteSettings,
    transformMenuItemsForDisplay,
    groupItemsByCategory,
    type HeroSection as HeroSectionType,
    type FeaturesSection as FeaturesSectionType,
} from '@/lib/menu'

export const metadata: Metadata = {
    title: 'Ma Sera | Menu',
    description: 'Explore our latest menu and offers',
}

export default async function MenuPage() {
    // 1. Fetch all data in parallel
    const [categories, items, branches, homepage, siteSettings] = await Promise.all([
        getMenuCategories(),
        getMenuItems(),
        getBranches(),
        getHomepage(),
        getSiteSettings(),
    ])

    // 2. Transform items
    const transformedItems = transformMenuItemsForDisplay(items)

    // 3. Group by category
    const menuGroups = groupItemsByCategory(transformedItems, categories)

    // 4. Extract data sections
    const heroSection = homepage?.sections?.find(s => s._type === 'hero')
    const featureSections = homepage?.sections?.filter(s => s._type === 'features') || []

    return (
        <main className="min-h-screen pb-20">
            {/* Hero Section from Sanity */}
            <Hero data={heroSection as HeroSectionType} />

            {/* Content Sections from Sanity */}
            {featureSections.map((section, idx) => (
                <Features key={idx} data={section as FeaturesSectionType} />
            ))}

            {/* Category Navigation */}
            <MenuNavigation categories={categories} />

            {/* Menu Sections */}
            <div className="py-8 space-y-2">
                {menuGroups.map((group) => (
                    <MenuSection
                        key={group.category._id}
                        id={group.category.slug?.current || group.category.name.toLowerCase().replace(/\s+/g, '-')}
                        title={group.category.name}
                        description={group.category.description}
                        items={group.items}
                        showPrices={false}
                    />
                ))}
            </div>

            {/* Empty State */}
            {menuGroups.length === 0 && (
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
            <ContactSection branches={branches} siteSettings={siteSettings} />
        </main>
    )
}
