/**
 * Analytics Helper Functions
 * Check cookie consent status and initialize analytics accordingly
 */

import * as CookieConsent from 'vanilla-cookieconsent'

/**
 * Check if user has consented to analytics cookies
 */
export function hasAnalyticsConsent(): boolean {
    if (typeof window === 'undefined') return false

    const cookie = CookieConsent.getCookie()
    return cookie?.categories?.includes('analytics') || false
}

/**
 * Check if user has consented to marketing cookies
 */
export function hasMarketingConsent(): boolean {
    if (typeof window === 'undefined') return false

    const cookie = CookieConsent.getCookie()
    return cookie?.categories?.includes('marketing') || false
}

/**
 * Initialize Google Analytics if consent is given
 */
export function initializeGoogleAnalytics(measurementId: string) {
    if (!hasAnalyticsConsent()) return

    // Load gtag.js
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
    }

    if (window.gtag) {
        window.gtag('js', new Date())
        window.gtag('config', measurementId, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
        })
    }
}

/**
 * Initialize Meta Pixel if consent is given
 */
export function initializeMetaPixel(pixelId: string) {
    if (!hasMarketingConsent()) return

    // Meta Pixel initialization
    const script = document.createElement('script')
    script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `
    document.head.appendChild(script)
}

/**
 * Track custom event (only if consent given)
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
    if (!hasAnalyticsConsent()) return

    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params)
    }
}

// Type declarations
declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
        fbq?: (...args: unknown[]) => void
        _fbq?: unknown
    }
}
