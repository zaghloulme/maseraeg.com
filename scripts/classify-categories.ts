
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const DRINK_CATEGORIES = [
    'Frappe',
    'Hot Drinks',
    'Hot Matcha Ma sera',
    'Iced Matcha Ma sera',
    'Iced Coffee',
    'Fresh Juice',
    'Smoothies',
    'Specialty Coffee',
    'Fizzy Frizzy',
    'Soft Drinks',
    'Extra'
]

async function classify() {
    console.log('🔄 Classifying Menu Categories (Food vs Drink)...')

    const categories = await client.fetch('*[_type == "menuCategory"]')

    for (const cat of categories) {
        const isDrink = DRINK_CATEGORIES.some(d => cat.name.includes(d) || d === cat.name)
        const type = isDrink ? 'drink' : 'food'

        if (cat.type !== type) {
            await client.patch(cat._id).set({ type }).commit()
            console.log(`   ✓ ${cat.name} -> ${type}`)
        } else {
            console.log(`   - ${cat.name} (already ${type})`)
        }
    }

    console.log('✅ Classification complete.')
}

classify()
