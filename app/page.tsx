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
    const [categories, items, branches, siteSettings] = await Promise.all([
        getMenuCategories(),
        getMenuItems(),
        getBranches(),
        getSiteSettings(),
    ])

    // 2. Transform items
    const transformedItems = transformMenuItemsForDisplay(items)

    // 3. Group by category
    const menuGroups = groupItemsByCategory(transformedItems, categories)

    // 4. Extract data sections from Site Settings
    const heroSection: HeroSectionType | undefined = siteSettings?.hero ? {
        _type: 'hero',
        ...siteSettings.hero
    } : undefined

    // Construct Features Section from the values in siteSettings
    const featureSections: FeaturesSectionType[] = siteSettings?.features ? [{
        _type: 'features',
        title: "",
        items: siteSettings.features
    }] : []

    // 5. Split Categories & Groups
    const foodGroups = menuGroups.filter(g => g.category.type !== 'drink')
    const drinkGroups = menuGroups.filter(g => g.category.type === 'drink')



    return (
        <main className="min-h-screen pb-20">
            {/* Hero Section from Sanity via SiteSettings */}
            <Hero data={heroSection} />

            {/* Content Sections from Sanity via SiteSettings */}
            {featureSections.map((section, idx) => (
                <Features key={idx} data={section} />
            ))}

            {/* Category Navigation - using categories from actual groups to ensure 'Popular' is included */}
            <MenuNavigation categories={menuGroups.map(g => g.category)} />

            {/* CAUTION: Category Logic - Splitting Food and Drink */}
            <div className="py-8 space-y-20">
                {/* 1. FOOD SECTION */}
                <div className="space-y-2">
                    {/* Food Categories (Includes Popular Food) */}
                    {foodGroups.map((group) => (
                        <MenuSection
                            key={group.category._id}
                            id={group.category.slug?.current || group.category.name.toLowerCase().replace(/\s+/g, '-')}
                            title={group.category.name}
                            description={group.category.description}
                            image={group.category.image}
                            items={group.items}
                            showPrices={false}
                            // Popular sections are scrollable/featured by default if they match the ID
                            scrollable={group.category._id === 'popular-food'}
                            variant={group.category._id === 'popular-food' ? 'featured' : 'default'}
                        />
                    ))}
                </div>

                {/* 2. DRINK SECTION */}
                {drinkGroups.length > 0 && (
                    <div className="space-y-2">
                        {/* Drink Categories (Includes Popular Drinks) */}
                        {drinkGroups.map((group) => (
                            <MenuSection
                                key={group.category._id}
                                id={group.category.slug?.current || group.category.name.toLowerCase().replace(/\s+/g, '-')}
                                title={group.category.name}
                                description={group.category.description}
                                image={group.category.image}
                                items={group.items}
                                showPrices={false}
                                scrollable={group.category._id === 'popular-drinks'}
                                variant={group.category._id === 'popular-drinks' ? 'featured' : 'default'}
                            />
                        ))}
                    </div>
                )}
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
