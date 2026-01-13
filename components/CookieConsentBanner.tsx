'use client'

/**
 * Ma Sera Cookie Consent Banner
 * Using vanilla-cookieconsent library with custom Ma Sera theme
 */

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

export default function CookieConsentBanner() {
    useEffect(() => {
        const runConsent = () => {
            CookieConsent.run({
                guiOptions: {
                    consentModal: {
                        layout: 'bar inline',
                        position: 'bottom',
                        equalWeightButtons: true,
                        flipButtons: false,
                    },
                    preferencesModal: {
                        layout: 'bar',
                        position: 'right',
                        equalWeightButtons: false,
                        flipButtons: false,
                    },
                },
                categories: {
                    necessary: {
                        readOnly: true,
                    },
                    analytics: {},
                    marketing: {},
                },
                language: {
                    default: 'en',
                    autoDetect: 'browser',
                    translations: {
                        en: {
                            consentModal: {
                                title: 'We Value Your Privacy',
                                description:
                                    'We use cookies to enhance your experience at Ma Sera. These help us understand how you use our menu, improve our services, and show you relevant offers. <a href="/privacy-policy" class="cc__link--inline">Privacy Policy</a>',
                                acceptAllBtn: 'Accept All',
                                acceptNecessaryBtn: 'Necessary Only',
                                showPreferencesBtn: 'Customize',
                            },
                            preferencesModal: {
                                title: 'Cookie Preferences',
                                acceptAllBtn: 'Accept All',
                                acceptNecessaryBtn: 'Reject All',
                                savePreferencesBtn: 'Save Preferences',
                                closeIconLabel: 'Close',
                                serviceCounterLabel: 'Service|Services',
                                sections: [
                                    {
                                        title: 'Cookie Usage',
                                        description:
                                            'We use cookies to provide you with the best possible experience on our website. Cookies help us remember your preferences, understand how you interact with our menu, and improve our services.',
                                    },
                                    {
                                        title:
                                            'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                                        description:
                                            'These cookies are essential for the website to function properly. They enable basic features like page navigation, access to secure areas, and remembering your cookie preferences. The website cannot function properly without these cookies.',
                                        linkedCategory: 'necessary',
                                    },
                                    {
                                        title: 'Analytics Cookies',
                                        description:
                                            'We use these cookies to understand how visitors interact with our menu and website. This helps us analyze visitor behavior, measure website performance, and improve our services to provide you with a better dining experience.',
                                        linkedCategory: 'analytics',
                                    },
                                    {
                                        title: 'Marketing Cookies',
                                        description:
                                            'These cookies help us show you relevant offers and promotions. We use platforms like Meta (Facebook/Instagram) to reach our guests with special deals, new menu items, and exclusive offers tailored to your interests.',
                                        linkedCategory: 'marketing',
                                    },
                                    {
                                        title: 'More Information',
                                        description:
                                            'For any questions about our cookie policy and your choices, please visit our <a class="cc__link" href="/privacy-policy">Privacy Policy</a> or contact us directly.',
                                    },
                                ],
                            },
                        },
                    },
                },
            })
        }

        // Check if user has already consented
        // vanilla-cookieconsent uses 'cc_cookie' by default
        const hasConsented = document.cookie.includes('cc_cookie')

        if (hasConsented) {
            runConsent()
        } else {
            const handleScroll = () => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

                // If page is not scrollable or very short, show immediately
                if (scrollHeight <= 0) {
                    runConsent()
                    return
                }

                const scrollPercentage = (window.scrollY / scrollHeight) * 100

                if (scrollPercentage > 15) {
                    runConsent()
                    window.removeEventListener('scroll', handleScroll)
                }
            }

            // Check immediately in case page is short
            handleScroll()

            window.addEventListener('scroll', handleScroll)

            // Clean up listener if component unmounts
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return null
}
