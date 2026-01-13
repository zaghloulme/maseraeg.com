/**
 * Seed Privacy Policy Content
 * Run with: npx tsx scripts/seed-privacy-policy.ts
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
})

const privacyPolicyContent = {
    _type: 'privacyPolicy',
    title: 'Privacy Policy',
    effectiveDate: '2026-01-13',
    lastUpdated: new Date().toISOString(),
    content: [
        {
            _type: 'block',
            _key: 'intro1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'intro1span',
                    text: 'At Ma Sera, we are committed to protecting your privacy and ensuring a transparent relationship with our valued guests. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-1',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-1span',
                    text: 'Information We Collect',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'info1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'info1span',
                    text: 'We collect information to enhance your experience and improve our services. The types of data we collect include:',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h3-1',
            style: 'h3',
            children: [
                {
                    _type: 'span',
                    _key: 'h3-1span',
                    text: 'Visit Tracking',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'visit1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'visit1span',
                    text: 'We track website visits to understand how guests interact with our menu and services. This includes pages viewed, time spent on pages, and navigation patterns. This data helps us improve our website layout and user experience.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h3-2',
            style: 'h3',
            children: [
                {
                    _type: 'span',
                    _key: 'h3-2span',
                    text: 'Analytics Data',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'analytics1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'analytics1span',
                    text: 'We use analytics tools to collect anonymized data about website usage. This includes browser type, device information, geographic location (city/country level), and referral sources. This information helps us optimize our website for different devices and understand where our guests are coming from.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-2',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-2span',
                    text: 'How We Use Cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'cookies1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'cookies1span',
                    text: 'Our website uses cookies to enhance your browsing experience. We use three categories of cookies:',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h3-3',
            style: 'h3',
            children: [
                {
                    _type: 'span',
                    _key: 'h3-3span',
                    text: 'Necessary Cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'necessary1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'necessary1span',
                    text: 'These cookies are essential for the website to function properly. They enable basic features like page navigation, remembering your cookie preferences, and maintaining your session. These cookies cannot be disabled.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h3-4',
            style: 'h3',
            children: [
                {
                    _type: 'span',
                    _key: 'h3-4span',
                    text: 'Analytics Cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'analytics2',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'analytics2span',
                    text: 'These cookies help us understand how visitors interact with our website. We use this data to improve our services, optimize menu presentation, and enhance the overall user experience. Analytics cookies are used for website improvements only.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h3-5',
            style: 'h3',
            children: [
                {
                    _type: 'span',
                    _key: 'h3-5span',
                    text: 'Marketing Cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'marketing1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'marketing1span',
                    text: 'We use marketing cookies to show you relevant advertisements and special offers. These cookies work with platforms like Meta (Facebook and Instagram) to help us reach guests with promotions for new menu items, seasonal specials, and exclusive offers. You can opt out of marketing cookies at any time.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-3',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-3span',
                    text: 'Third-Party Services',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'thirdparty1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'thirdparty1span',
                    text: 'We work with trusted third-party services to improve our website and advertising:',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'thirdparty2',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'thirdparty2span1',
                    marks: ['strong'],
                    text: 'Google Analytics: ',
                },
                {
                    _type: 'span',
                    _key: 'thirdparty2span2',
                    text: 'Used to collect anonymized data about website usage and visitor behavior.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'thirdparty3',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'thirdparty3span1',
                    marks: ['strong'],
                    text: 'Meta Pixel: ',
                },
                {
                    _type: 'span',
                    _key: 'thirdparty3span2',
                    text: 'Used to measure the effectiveness of our advertising on Facebook and Instagram, and to show you relevant offers based on your interests.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-4',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-4span',
                    text: 'Your Choices',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'choices1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'choices1span',
                    text: 'You have full control over your cookie preferences. When you first visit our website, you will see a cookie consent banner where you can:',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'choiceslist',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            children: [
                {
                    _type: 'span',
                    _key: 'choiceslistspan1',
                    text: 'Accept all cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'choiceslist2',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            children: [
                {
                    _type: 'span',
                    _key: 'choiceslistspan2',
                    text: 'Accept only necessary cookies',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'choiceslist3',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            children: [
                {
                    _type: 'span',
                    _key: 'choiceslistspan3',
                    text: 'Customize your preferences for each cookie category',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'choices2',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'choices2span',
                    text: 'You can change your cookie preferences at any time by clicking the "Cookie Preferences" link in the footer of our website.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-5',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-5span',
                    text: 'Data Protection',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'protection1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'protection1span',
                    text: 'We take appropriate security measures to protect your information from unauthorized access, alteration, or disclosure. We do not sell or share your personal information with third parties for their own marketing purposes.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-6',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-6span',
                    text: 'Contact Us',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'contact1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'contact1span',
                    text: 'If you have any questions about this Privacy Policy or our data practices, please contact us through our website or visit one of our locations in Alexandria, Egypt.',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'h2-7',
            style: 'h2',
            children: [
                {
                    _type: 'span',
                    _key: 'h2-7span',
                    text: 'Updates to This Policy',
                },
            ],
        },
        {
            _type: 'block',
            _key: 'updates1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'updates1span',
                    text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a new effective date. We encourage you to review this policy periodically.',
                },
            ],
        },
    ],
}

async function seedPrivacyPolicy() {
    console.log('🔐 Seeding Privacy Policy content...')

    try {
        // Check if privacy policy already exists
        const existing = await client.fetch(`*[_type == "privacyPolicy"][0]._id`)

        if (existing) {
            console.log('⚠️  Privacy Policy already exists. Updating...')
            await client.patch(existing).set(privacyPolicyContent).commit()
            console.log('✅ Privacy Policy updated successfully!')
        } else {
            await client.create(privacyPolicyContent)
            console.log('✅ Privacy Policy created successfully!')
        }
    } catch (error) {
        console.error('❌ Error seeding Privacy Policy:', error)
        process.exit(1)
    }
}

seedPrivacyPolicy()
