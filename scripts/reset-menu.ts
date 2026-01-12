
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

async function reset() {
    console.log('🗑️ Deleting all Menu Items and Categories...')

    // Delete all items first
    await client.delete({ query: '*[_type == "menuItem"]' })
    console.log('   ✓ Deleted Menu Items')

    // Delete all categories
    await client.delete({ query: '*[_type == "menuCategory"]' })
    console.log('   ✓ Deleted Menu Categories')

    console.log('✅ Menu reset complete.')
}

reset()
