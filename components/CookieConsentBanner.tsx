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
                                            'We use cookies to ensure optimal website performance and user experience.',
                                    },
                                    {
                                        title:
                                            'Strictly Necessary <span class="pm__badge">Required</span>',
                                        description:
                                            'Essential for basic site functionality and security. Cannot be disabled.',
                                        linkedCategory: 'necessary',
                                    },
                                    {
                                        title: 'Analytics',
                                        description:
                                            'Help us improve our menu and services by understanding how you use our site.',
                                        linkedCategory: 'analytics',
                                    },
                                    {
                                        title: 'Marketing',
                                        description:
                                            'Used to show you relevant offers and special promotions based on your interests.',
                                        linkedCategory: 'marketing',
                                    },
                                    {
                                        title: 'More Information',
                                        description:
                                            'Questions? Contact us or view our <a class="cc__link" href="/privacy-policy">Privacy Policy</a>.',
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

                if (scrollPercentage > 5) {
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
