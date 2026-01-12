
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const idsToDelete = [
    'branch-semouha',
    'branch-roushdy'
]

async function cleanup() {
    console.log('🧹 Cleaning up old branches...')

    for (const id of idsToDelete) {
        try {
            await client.delete(id)
            console.log(`✅ Deleted ${id}`)
        } catch (err) {
            console.log(`⚠️ Could not delete ${id}:`, err instanceof Error ? err.message : String(err))
        }
    }

    console.log('✨ Cleanup complete')
}

cleanup()
