/**
 * Root Layout
 * Provides i18n context and global styles
 */

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales, localeDirections } from '@/i18n/config'
import { PageViewTracker } from '@/components/PageViewTracker'
import CookieConsent from '@/components/CookieConsent'
import { VisualEditing } from '@/components/VisualEditing'
import { Metadata } from 'next'
import { cms } from '@/lib/cms'
import '../globals.css'

// Configure Inter font from Google Fonts with fallback
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

  const settings = await cms.getSiteSettings()

  return {
    title: {
      default: settings?.seo?.metaTitle || 'Vista Store',
      template: `%s | ${settings?.seo?.metaTitle || 'Vista Store'}`,
    },
    description: settings?.seo?.metaDescription || settings?.footerDescription,
    keywords: settings?.seo?.keywords,
    icons: {
      icon: settings?.favicon?.url || '/favicon.ico',
    },
    openGraph: settings?.seo?.ogImage ? {
      images: [{ url: settings.seo.ogImage.url }],
    } : undefined,
  }
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure locale is valid
  if (!(locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const direction = localeDirections[locale as keyof typeof localeDirections]
  const messages = await getMessages()

  return (
    <html lang={locale} dir={direction} className={inter.variable}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className={inter.className}>
        {gtmId && (
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <VisualEditing />
        <CookieConsent />
      </body>
    </html>
  )
}
