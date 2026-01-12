/**
 * Root Layout - Ma Sera Egypt
 * Premium menu website with elegant typography
 */

import { Suspense } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter, Playfair_Display, Great_Vibes } from 'next/font/google'
import { PageViewTracker } from '@/components/PageViewTracker'
import CookieConsent from '@/components/CookieConsent'
import { VisualEditing } from '@/components/VisualEditing'
import { Metadata } from 'next'
import './globals.css'

// Configure fonts from Google Fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
    weight: ['400', '500', '600', '700'],
})

const greatVibes = Great_Vibes({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-script',
    weight: '400',
})

export const metadata: Metadata = {
    title: {
        default: 'Ma Sera | Every Hour, a New Memory',
        template: '%s | Ma Sera Egypt',
    },
    description: 'Premium breakfast, brunch, and café cuisine in Alexandria, Egypt. Fresh ingredients, artisan recipes, unforgettable moments.',
    keywords: ['Ma Sera', 'Alexandria restaurant', 'Egypt cafe', 'breakfast', 'brunch', 'focaccia', 'coffee'],
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Ma Sera | Every Hour, a New Memory',
        description: 'Premium breakfast, brunch, and café cuisine in Alexandria, Egypt.',
        type: 'website',
        locale: 'en_EG',
        siteName: 'Ma Sera Egypt',
    },
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" dir="ltr" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
            {gtmId && <GoogleTagManager gtmId={gtmId} />}
            <body className={inter.className}>
                {gtmId && (
                    <Suspense fallback={null}>
                        <PageViewTracker />
                    </Suspense>
                )}
                {children}
                <VisualEditing />
                <CookieConsent />
            </body>
        </html>
    )
}
