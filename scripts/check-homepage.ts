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

async function check() {
    const homepage = await client.fetch('*[_type == "homepage"][0]')
    console.log('Homepage exists:', !!homepage)

    if (!homepage) {
        console.log('Creating default homepage...')
        await client.create({
            _type: 'homepage',
            title: 'Ma Sera - Every Hour, a New Memory',
            sections: []
        })
        console.log('✅ Homepage created')
    } else {
        console.log('✅ Homepage already exists')
    }
}

check()
