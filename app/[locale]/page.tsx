/**
 * Home Page
 * Demonstrates i18n and provides a starting point for customization
 */

import { cms } from '@/lib/cms'
import SectionRenderer from '@/components/sections/SectionRenderer'

export default async function HomePage() {
  const homepage = await cms.getHomepageSettings()

  if (!homepage) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold">Please configure homepage in Sanity</h1>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SectionRenderer sections={homepage.sections} />
    </main>
  )
}
