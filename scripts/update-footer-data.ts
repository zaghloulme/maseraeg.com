
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function migrate() {
    console.log('🔄 Updating Footer Data...')

    try {
        // 1. Update Site Settings
        const siteSettings = {
            _id: 'siteSettings',
            _type: 'siteSettings',
            socialLinks: {
                instagram: 'https://www.instagram.com/masera.eg/',
                facebook: 'https://www.facebook.com/p/Ma-Sera-61571401528468/',
                tiktok: 'https://www.tiktok.com/@ma_sera_eg',
                talabat: 'https://www.talabat.com/egypt/ma-sera'
            },
            contactInfo: {
                phoneNumbers: ['0155 380 3579', '033956710'],
                workingHours: '7 am to 2 am'
            }
        }
        await client.createOrReplace(siteSettings)
        console.log('✅ Site Settings Updated')

        // 2. Update Branches
        // Fouad Street
        await client.patch('branch-fouad-street')
            .set({
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=67+El+Horeya+Road+Fouad+Street+Alexandria'
            })
            .commit()
        console.log('✅ Fouad Street Map URL Updated')

        // Smouha
        await client.patch('branch-smouha')
            .set({
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Smouha+Alexandria'
            })
            .commit()
        console.log('✅ Smouha Map URL Updated')

    } catch (err) {
        console.error('❌ Failed:', err)
        process.exit(1)
    }
}

migrate()
