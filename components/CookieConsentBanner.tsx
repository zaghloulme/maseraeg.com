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
        // Delay consent banner for GDPR best practices (less intrusive)
        const timer = setTimeout(() => {
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
                                    'We use cookies to enhance your experience at Ma Sera. These help us understand how you use our menu, improve our services, and show you relevant offers.',
                                acceptAllBtn: 'Accept All',
                                acceptNecessaryBtn: 'Necessary Only',
                                showPreferencesBtn: 'Customize',
                                footer:
                                    '<a href="/privacy-policy">Privacy Policy</a>',
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
        }, 2500)

        return () => clearTimeout(timer)
    }, [])

    return null
}
