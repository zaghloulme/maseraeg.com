/**
 * Ma Sera Egypt - Menu Homepage (Social Menu - No Prices)
 * This is the main menu page accessible from social media and Google searches
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { Hero, MenuNavigation, MenuSection, ContactSection } from '@/components/menu'
import {
  getBranches,
  getMenuCategories,
  getMenuItems,
  transformMenuItemsForDisplay,
  groupItemsByCategory,
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
  const [branches, categories, menuItems] = await Promise.all([
    getBranches(),
    getMenuCategories(),
    getMenuItems(),
  ])

  // Transform items for display (no branch slug = no prices)
  const displayItems = transformMenuItemsForDisplay(menuItems)

  // Group by category
  const groupedMenu = groupItemsByCategory(displayItems, categories)

  return (
    <main className="min-h-screen">
      {/* Hero with branding */}
      <Hero showPrices={false} />

      {/* Category Navigation */}
      {categories.length > 0 && (
        <MenuNavigation categories={categories} />
      )}

      {/* Menu Sections */}
      {groupedMenu.map(({ category, items }) => (
        <MenuSection
          key={category._id}
          id={category.slug.current}
          title={category.name}
          titleAr={category.nameAr}
          description={category.description}
          items={items}
          showPrices={false}
        />
      ))}

      {/* Empty State */}
      {groupedMenu.length === 0 && (
        <section className="py-20 text-center">
          <div className="container">
            <p className="text-xl text-[var(--muted)]">
              Menu coming soon. Please add items in Sanity Studio.
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
